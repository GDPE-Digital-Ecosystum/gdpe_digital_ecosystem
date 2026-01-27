
// src/app/site/[slug]/page.tsx
import LeaderWebsiteClient from "@/components/LeaderWebsiteClient";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function MasterTemplate({ params }: any) {
    const { slug } = await params;
   // ✅ HINDI FIX: Hamesha decoded slug use karein database ke liye
    const decodedSlug = decodeURIComponent(slug).normalize('NFC');


    try {
        const client = await clientPromise;
        const db = client.db("rajgram_db");

await db.collection("analytics").updateOne(
            { slug: decodedSlug  }, 
            { 
                $inc: { views: 1 }, // Views ko 1 se badhao
                $set: { last_visited: new Date() } // Last visit time record karo
            },
            { upsert: true } // Agar ye slug pehli baar aaya hai, toh naya document bana do
        );

        const panchayatData = await db.collection("panchayats_test").findOne({ slug:decodedSlug});

        if (!panchayatData) return notFound();

        // 2. ✅ STATUS CHECK LOGIC (Yahan add kiya hai)
        if (panchayatData.status === "idle") {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
                    <div className="max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-red-200">
                        <div className="text-red-500 mb-4 flex justify-center">
                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">Deleted Site</h1>
                        <p className="text-gray-600 text-lg mb-8 font-medium">
                            This site has been deactivated. <br />
                            <span className="text-red-600 font-bold underline">Please contact admin</span> for more information.
                        </p>
                        <a href="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300">
                            Back to Home
                        </a>
                    </div>
                </div>
            );
        }

        const settings = await db.collection("admin_settings").findOne({});

        let newsData = [];
        try {
            // ✅ NEWS LIMIT UPDATED: per_page=12
            const newsRes = await fetch(
                "https://channel009.news/wp-json/wp/v2/posts?_embed&per_page=12",
                { cache: 'no-store' } 
            );
            
            if (newsRes.ok) {
                const rawNews = await newsRes.json();
                newsData = rawNews.map((post: any) => {
                    let imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                    if (!imageUrl) {
                        const imgRegex = /<img[^>]+src="([^">]+)"/;
                        const match = post.content.rendered.match(imgRegex);
                        imageUrl = match ? match[1] : null; 
                    }
                    if (!imageUrl) {
                        imageUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800";
                    }
                    return {
                        id: post.id,
                        title: post.title.rendered,
                        link: post.link,
                        date: post.date,
                        image: imageUrl
                    };
                });
            }
        } catch (e) { console.log("News fetch failed"); }

        const combinedData = {
            ...JSON.parse(JSON.stringify(panchayatData)),
            global_alert: settings?.global_alert || ""
        };

        return <LeaderWebsiteClient panchayat={combinedData} news={newsData} />;
    } catch (error) {
        return <div className="p-20 text-center font-black text-red-600">DATABASE ERROR</div>;
    }
}