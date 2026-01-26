
// src/app/site/[slug]/page.tsx
import LeaderWebsiteClient from "@/components/LeaderWebsiteClient";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function MasterTemplate({ params }: any) {
    const { slug } = await params;

    try {
        const client = await clientPromise;
        const db = client.db("rajgram_db");
        const panchayatData = await db.collection("panchayats").findOne({ slug });

        if (!panchayatData) return notFound();

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