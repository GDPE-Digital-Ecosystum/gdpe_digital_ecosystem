// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const slug = searchParams.get("slug");

//     if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

//     try {
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");
        
//         // Supporters ko fetch karo (Latest first)
//         const voters = await db.collection("supports").find({ slug: slug }).sort({ date: -1 }).toArray();

//         return NextResponse.json(voters);
//     } catch (e) {
//         return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//     }
// }

// // POST wala method (jo pehle banaya tha) wahi rahega niche
// export async function POST(req: Request) {
//     const { slug, name, phone, message } = await req.json();
//     const client = await clientPromise;
//     const db = client.db("rajgram_db");
//     await db.collection("supports").insertOne({ slug, name, phone, message, date: new Date() });
//     return NextResponse.json({ success: true });
// }
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { slug, name, phone, message } = await req.json();
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        await db.collection("supports").insertOne({
            slug, name, phone, message,
            date: new Date()
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Database Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const client = await clientPromise;
    const db = client.db("rajgram_db");
    const voters = await db.collection("supports").find({ slug }).sort({ date: -1 }).toArray();
    return NextResponse.json(voters);
}