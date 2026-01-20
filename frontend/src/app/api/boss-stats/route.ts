import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        const totalGPs = 11283;
        const activeLeadersCount = await db.collection("panchayats").countDocuments({ status: "active" });
        const totalVotersCount = await db.collection("supports").countDocuments();
        
        const latestOnboarding = await db.collection("panchayats")
            .find({ status: "active" })
            .limit(5)
            .sort({ _id: -1 })
            .toArray();

        return NextResponse.json({
            totalGPs,
            activeLeadersCount,
            totalVotersCount,
            latestOnboarding: JSON.parse(JSON.stringify(latestOnboarding))
        });
    } catch (error) {
        return NextResponse.json({ error: "DB Error" }, { status: 500 });
    }
}