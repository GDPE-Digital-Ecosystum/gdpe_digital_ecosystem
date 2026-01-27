
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        let query: any = {};
        if (search) query.name = { $regex: search, $options: "i" };

        const [totalGPs, active, supports, dists, leads, list, settings, idleList] = await Promise.all([
            db.collection("panchayats_test").countDocuments(),
            db.collection("panchayats_test").countDocuments({ status: "active" }),
            db.collection("supports").countDocuments(),
            db.collection("panchayats_test").aggregate([{ $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } }, { $sort: { active: -1 } }]).toArray(),
            db.collection("supports").find().limit(50).sort({ date: -1 }).toArray(),
            db.collection("panchayats_test").aggregate([
                { $match: query }, 
                { $addFields: { priority: { $switch: { branches: [{ case: { $eq: ["$status", "active"] }, then: 3 }, { case: { $eq: ["$status", "suspended"] }, then: 2 }], default: 1 } } } },
                { $sort: { priority: -1, name: 1 } },
                { $limit: 50 }
            ]).toArray(),
            db.collection("admin_settings").findOne({}),
            db.collection("panchayats_test").find({ status: "idle" }).project({ name: 1, slug: 1, district: 1 }).sort({ name: 1 }).toArray()
        ]);

        return NextResponse.json({ 
            totalGPs, activeLeadersCount: active, totalVotersCount: supports, 
            districtStats: dists, globalLeads: leads, 
            panchayatList: JSON.parse(JSON.stringify(list)), 
            settings, idleList 
        });
    } catch (error: any) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, data } = body;
        const client = await clientPromise;
        const db = client.db("rajgram_db");
        const slug = data.slug;
        const act = action.toLowerCase();

        if (act !== "update_alert" && !slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

        if (act === "suspend_leader") await db.collection("panchayats_test").updateOne({ slug }, { $set: { status: "suspended" } });
        if (act === "reactivate_leader") await db.collection("panchayats_test").updateOne({ slug }, { $set: { status: "active" } });
        if (act === "clear_images") {
            await db.collection("panchayats_test").updateOne({ slug }, { $set: { 
                "config.avatar": "", "config.logo": "", "config.banner": "", "config.manifestoImg": "", 
                "config.economyImg": "", "config.geographyImg": "", "config.historyImg": "", 
                "config.gallery": [], "config.videos": [] 
            } });
        }
        if (act === "clear_text") {
            await db.collection("panchayats_test").updateOne({ slug }, { $set: { bio: "", history: "", geography: "", economy: "", leader_name: "" } });
        }
        if (act === "reset_to_idle") {
            await db.collection("users").deleteOne({ slug });
            await db.collection("panchayats_test").updateOne({ slug }, { $set: { status: "idle", leader_name: "", bio: "", history: "", geography: "", economy: "", "config": { themeColor: "#2d5a27", banner: "", avatar: "", gallery: [], videos: [] } } });
        }
        if (act === "create_leader") {
            const exists = await db.collection("users").findOne({ $or: [{ slug: data.slug }, { email: data.email }] });
            if (exists) return NextResponse.json({ error: "Slug/Email already registered" }, { status: 400 });
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await db.collection("users").insertOne({ email: data.email, password: hashedPassword, role: "LEADER", slug: data.slug, name: data.leaderName });
            await db.collection("panchayats_test").updateOne({ slug: data.slug }, { $set: { status: "active", leader_name: data.leaderName } });
        }
        if (act === "update_alert") await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });

        return NextResponse.json({ success: true });
    } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}