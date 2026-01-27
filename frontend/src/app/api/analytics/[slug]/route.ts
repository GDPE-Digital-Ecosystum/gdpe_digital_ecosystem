import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request, { params }: any) {
    try {
        // Next.js 15 fix: params ko await karna zaroori hai
        const { slug } = await params; 
        
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        const data = await db.collection("analytics").findOne({ slug });

        // Cache-Control header taaki browser hamesha fresh data mangwaye
        return NextResponse.json(
            { views: data?.views || 0 }, 
            { headers: { 'Cache-Control': 'no-store, max-age=0' } }
        );
    } catch (error) {
        return NextResponse.json({ views: 0 });
    }
}