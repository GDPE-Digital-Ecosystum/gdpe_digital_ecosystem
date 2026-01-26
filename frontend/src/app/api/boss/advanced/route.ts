
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcryptjs';

// export const dynamic = 'force-dynamic';

// export async function GET(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const search = searchParams.get("search") || "";
//         const page = parseInt(searchParams.get("page") || "0");
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         // Search Query Logic
//         let query: any = {};
//         if (search) {
//             query.$or = [
//                 { name: { $regex: search, $options: "i" } },
//                 { leader_name: { $regex: search, $options: "i" } }
//             ];
//         }

//         // Parallel Data Fetching
//         const [totalGPs, active, supports, dists, leads, list, settings, idleList] = await Promise.all([
//             db.collection("panchayats").countDocuments(),
//             db.collection("panchayats").countDocuments({ status: "active" }),
//             db.collection("supports").countDocuments(),
//             db.collection("panchayats").aggregate([{ $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } }]).toArray(),
//             db.collection("supports").find().limit(20).sort({ date: -1 }).toArray(),
//             db.collection("panchayats").find(query).sort({ status: 1, name: 1 }).skip(page * 20).limit(20).toArray(),
//             db.collection("admin_settings").findOne({}),
//             db.collection("panchayats").find({ status: "idle" }).project({ name: 1, slug: 1, district: 1 }).sort({ name: 1 }).toArray()
//         ]);

//         console.log(`✅ Boss API: Found ${list.length} panchayats for list`);

//         return NextResponse.json({
//             totalGPs: totalGPs || 11283,
//             activeLeadersCount: active || 0,
//             totalVotersCount: supports || 0,
//             districtStats: JSON.parse(JSON.stringify(dists || [])),
//             globalLeads: JSON.parse(JSON.stringify(leads || [])),
//             settings: JSON.parse(JSON.stringify(settings || {})),
//             panchayatList: JSON.parse(JSON.stringify(list || [])), // 👈 Yeh list hai
//             idleList: JSON.parse(JSON.stringify(idleList || []))
//         });
//     } catch (error: any) { 
//         console.error("❌ API ERROR:", error.message);
//         return NextResponse.json({ error: error.message, panchayatList: [] }, { status: 500 }); 
//     }
// }

// export async function POST(req: Request) {
//     try {
//         const { action, data } = await req.json();
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         // 1. Create & Onboard
//         if (action === "create_leader") {
//             const hashedPassword = await bcrypt.hash(data.password, 10);
//             await db.collection("users").insertOne({ email: data.email, password: hashedPassword, role: "LEADER", slug: data.slug, name: data.leaderName });
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "active", leader_name: data.leaderName, password: data.password } });
//         }
//         // 2. Suspend Logic (Lock)
//         if (action === "suspend_leader") await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "suspended" } });
//         // 3. Reactivate
//         if (action === "reactivate_leader") await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "active" } });
//         // 4. Clear Images (Inside config)
//         if (action === "clear_images") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { "config.banner": "", "config.avatar": "", "config.gallery": [], "config.manifestoImg": "", "config.historyImg": "", "config.geographyImg": "", "config.economyImg": "" } });
//         }
//         // 5. Clear Text (Root & Config)
//         if (action === "clear_text") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { bio: "", history: "", geography: "", economy: "" } });
//         }
//         // 6. Reset & Delete
//         if (action === "reset_to_idle") {
//             await db.collection("users").deleteOne({ slug: data.slug });
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "idle", leader_name: "", bio: "", history: "", geography: "", economy: "", "config.themeColor": "#2d5a27" } });
//         }
//         // 7. Global Alert
//         if (action === "update_alert") await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });

//         return NextResponse.json({ success: true });
//     } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
// }

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
            db.collection("panchayats").countDocuments(),
            db.collection("panchayats").countDocuments({ status: "active" }),
            db.collection("supports").countDocuments(),
            db.collection("panchayats").aggregate([{ $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } }, { $sort: { active: -1 } }]).toArray(),
            db.collection("supports").find().limit(50).sort({ date: -1 }).toArray(),
            db.collection("panchayats").aggregate([
                { $match: query }, 
                { $addFields: { priority: { $switch: { branches: [{ case: { $eq: ["$status", "active"] }, then: 3 }, { case: { $eq: ["$status", "suspended"] }, then: 2 }], default: 1 } } } },
                { $sort: { priority: -1, name: 1 } },
                { $limit: 50 }
            ]).toArray(),
            db.collection("admin_settings").findOne({}),
            db.collection("panchayats").find({ status: "idle" }).project({ name: 1, slug: 1, district: 1 }).sort({ name: 1 }).toArray()
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

        if (act === "suspend_leader") await db.collection("panchayats").updateOne({ slug }, { $set: { status: "suspended" } });
        if (act === "reactivate_leader") await db.collection("panchayats").updateOne({ slug }, { $set: { status: "active" } });
        if (act === "clear_images") {
            await db.collection("panchayats").updateOne({ slug }, { $set: { 
                "config.avatar": "", "config.logo": "", "config.banner": "", "config.manifestoImg": "", 
                "config.economyImg": "", "config.geographyImg": "", "config.historyImg": "", 
                "config.gallery": [], "config.videos": [] 
            } });
        }
        if (act === "clear_text") {
            await db.collection("panchayats").updateOne({ slug }, { $set: { bio: "", history: "", geography: "", economy: "", leader_name: "" } });
        }
        if (act === "reset_to_idle") {
            await db.collection("users").deleteOne({ slug });
            await db.collection("panchayats").updateOne({ slug }, { $set: { status: "idle", leader_name: "", bio: "", history: "", geography: "", economy: "", "config": { themeColor: "#2d5a27", banner: "", avatar: "", gallery: [], videos: [] } } });
        }
        if (act === "create_leader") {
            const exists = await db.collection("users").findOne({ $or: [{ slug: data.slug }, { email: data.email }] });
            if (exists) return NextResponse.json({ error: "Slug/Email already registered" }, { status: 400 });
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await db.collection("users").insertOne({ email: data.email, password: hashedPassword, role: "LEADER", slug: data.slug, name: data.leaderName });
            await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "active", leader_name: data.leaderName } });
        }
        if (act === "update_alert") await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });

        return NextResponse.json({ success: true });
    } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}