import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const jsonData = await req.json(); // Himanshu dashboard se ye data bhejega

        if (!Array.isArray(jsonData)) {
            return NextResponse.json({ error: "Invalid Data Format: Array expected" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("rajgram_db");
        const collection = db.collection("panchayats");

        console.log(`Processing ${jsonData.length} records...`);

        // Performance ke liye hum 'BulkWrite' use karenge
        const bulkOps = jsonData.map(item => ({
            updateOne: {
                filter: { gp_id: item.gp_id }, // ID match karo
                update: { $set: item },         // Naya data dalo
                upsert: true                   // Agar nahi hai toh naya banao
            }
        }));

        const result = await collection.bulkWrite(bulkOps);

        return NextResponse.json({ 
            success: true, 
            message: `${result.upsertedCount + result.modifiedCount} Records Processed!` 
        });
    } catch (error: any) {
        console.error("Bulk Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}