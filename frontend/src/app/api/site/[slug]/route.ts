// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
//     try {
//         const { slug } = await params;
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");
        
//         const data = await db.collection("panchayats_test").findOne({ slug: slug }); // panchayats

//         if (!data) {
//             return NextResponse.json({ error: "Panchayat Not Found" }, { status: 404 });
//         }

//         return NextResponse.json(data);
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request, { params }: any) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug).normalize('NFC');

    try {
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        // 1. Panchayat Data fetch karo
        let data = await db.collection("panchayats").findOne({ slug: decodedSlug });
        if(!data) {
            data = await db.collection("panchayats_test").findOne({ slug: decodedSlug });
        }

        if (!data) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        // 2. ✅ Analytics fetch karo aur merge karo
        const stats = await db.collection("analytics").findOne({ slug: decodedSlug });
        
        const finalData = {
            ...data,
            views: stats?.views || 0 // Frontend ko views bhej rahe hain
        };

        return NextResponse.json(finalData);
    } catch (e) {
        return NextResponse.json({ error: "DB Error" }, { status: 500 });
    }
}