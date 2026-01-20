// // src/app/site/[slug]/page.tsx
// import LeaderWebsiteClient from "@/components/LeaderWebsiteClient";
// import clientPromise from "@/lib/mongodb";
// import { notFound } from "next/navigation";

// export default async function MasterTemplate(props: any) {
//     const resolvedParams = await props.params;
//     const slug = resolvedParams?.slug;

//     try {
//         // 1. Direct MongoDB Connection
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");
//         const panchayatData = await db.collection("panchayats").findOne({ slug: slug });

//         if (!panchayatData) return notFound();

//         const plainData = JSON.parse(JSON.stringify(panchayatData));

//         // 2. channel009.news se Live News fetch karo
//         let newsData = [];
//         try {
//             const newsRes = await fetch(
//                 "https://channel009.news/wp-json/wp/v2/posts?_embed&per_page=6",
//                 { next: { revalidate: 60 } } // 1 minute cache
//             );
//             if (newsRes.ok) {
//                 newsData = await newsRes.json();
//             }
//         } catch (e) {
//             console.error("News Fetch Error:", e);
//         }

//         // 3. Sanjay ke UI ko dono data bhej do
//         return <LeaderWebsiteClient panchayat={plainData} news={newsData} />;

//     } catch (error) {
//         console.error("Critical Error:", error);
//         return <div className="p-20 text-center font-bold text-red-600">Database Connection Error!</div>;
//     }
// }

// src/app/site/[slug]/page.tsx
import LeaderWebsiteClient from "@/components/LeaderWebsiteClient";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function MasterTemplate(props: any) {
    const resolvedParams = await props.params;
    const slug = resolvedParams?.slug;

    try {
        const client = await clientPromise;
        const db = client.db("rajgram_db");
        // cache: 'no-store' ki jagah direct DB query hamesha fresh data degi
        const panchayatData = await db.collection("panchayats").findOne({ slug: slug });

        if (!panchayatData) return notFound();

        const plainData = JSON.parse(JSON.stringify(panchayatData));

        // News fetch
        let newsData = [];
        try {
            const newsRes = await fetch("https://channel009.news/wp-json/wp/v2/posts?_embed&per_page=6", { cache: 'no-store' });
            newsData = await newsRes.json();
        } catch (e) {}

        return <LeaderWebsiteClient panchayat={plainData} news={newsData} />;
    } catch (error) {
        return <div className="p-20 text-center">Database Error</div>;
    }
}