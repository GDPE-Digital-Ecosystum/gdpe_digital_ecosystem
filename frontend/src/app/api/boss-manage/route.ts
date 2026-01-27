import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "all";

        const client = await clientPromise;
        const db = client.db("rajgram_db");

        // 1. Filter Logic
        let query: any = {};
        if (search) query.name = { $regex: search, $options: "i" };
        if (status !== "all") query.status = status;

        // 2. Fetch List (Limit 50 taaki speed bani rahe)
        const list = await db.collection("panchayats_test").find(query).limit(50).toArray();

        // 3. Global Stats for the top boxes
        const stats = {
            total: 11075,
            active: await db.collection("panchayats_test").countDocuments({ status: "active" }),
            idle: await db.collection("panchayats_test").countDocuments({ status: "idle" })
        };

        return NextResponse.json({ 
            list: JSON.parse(JSON.stringify(list)), 
            stats 
        });
    } catch (error) {
        return NextResponse.json({ error: "API Error" }, { status: 500 });
    }
}

// Boss Action: Leader ko Remove karne ke liye
export async function POST(req: Request) {
    try {
        const { slug, action } = await req.json();
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        if (action === "remove") {
            await db.collection("panchayats_test").updateOne(
                { slug: slug },
                { $set: { 
                    status: "idle", 
                    candidate_id: null, 
                    bio: "", 
                    "config.themeColor": "#2d5a27",
                    "config.banner": "" 
                } }
            );
        }
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Action Failed" }, { status: 500 });
    }
}