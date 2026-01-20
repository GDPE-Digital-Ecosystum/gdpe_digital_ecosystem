import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const client = await clientPromise;
        const db = client.db("rajgram_db");
        
        const data = await db.collection("panchayats").findOne({ slug: slug });

        if (!data) {
            return NextResponse.json({ error: "Panchayat Not Found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}