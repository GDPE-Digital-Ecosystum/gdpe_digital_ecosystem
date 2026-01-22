
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export const dynamic = 'force-dynamic';

// export async function GET(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const search = searchParams.get("search") || "";
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         let query: any = {};
//         if (search) query.name = { $regex: search, $options: "i" };

//         const [totalGPs, activeLeaders, totalSupports, districtStats, globalLeads, settings, panchayatList] = await Promise.all([
//             db.collection("panchayats").countDocuments(),
//             db.collection("panchayats").countDocuments({ status: "active" }),
//             db.collection("supports").countDocuments(),
//             db.collection("panchayats").aggregate([
//                 { $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } },
//                 { $sort: { active: -1 } }
//             ]).toArray(),
//             db.collection("supports").find().limit(20).sort({ date: -1 }).toArray(),
//             db.collection("admin_settings").findOne({}),
//             db.collection("panchayats").find(query).limit(50).toArray()
//         ]);

//         return NextResponse.json({
//             totalGPs, activeLeadersCount: activeLeaders, totalVotersCount: totalSupports,
//             districtStats: JSON.parse(JSON.stringify(districtStats)),
//             globalLeads: JSON.parse(JSON.stringify(globalLeads)),
//             settings: JSON.parse(JSON.stringify(settings)),
//             panchayatList: JSON.parse(JSON.stringify(panchayatList))
//         });
//     } catch (error: any) { return NextResponse.json({ error: error.message }, { status: 500 }); }
// }

// export async function POST(req: Request) {
//     try {
//         const { action, data } = await req.json();
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         // 1. Alert Update
//         if (action === "update_alert") {
//             await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });
//         }
        
//         // 2. Full Suspend (Reset everything)
//         if (action === "suspend_leader") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "idle", bio: "", leader_name: "", history: "", geography: "", economy: "", "config.themeColor": "#0055a4", "config.banner": "", "config.avatar": "", "config.gallery": [], "config.videos": [] } });
//         }

//         // 3. ✅ CLEAR ALL IMAGES & VIDEOS (FIXED LOGIC)
//         if (action === "clear_images") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { 
//                 $set: { 
//                     "config.leader_name":"",
//                     "config.banner": "", 
//                     "config.avatar": "", 
//                     "config.manifestoImg": "", 
//                     "config.historyImg": "",   // 👈 Fixed: Added history image reset
//                     "config.geographyImg": "", // 👈 Fixed: Added geography image reset
//                     "config.economyImg": "",   // 👈 Fixed: Added economy image reset
//                     "config.gallery": [],      // 👈 Fixed: Clears Gallery array
//                     "config.videos": []        // 👈 Fixed: Clears YouTube Videos array
//                 } 
//             });
//         }

//         // 4. Clear Text Content only
//         if (action === "clear_text") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { 
//                 $set: { bio: "", history: "", geography: "", economy: "" } 
//             });
//         }

//         return NextResponse.json({ success: true });
//     } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
// }

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const client = await clientPromise;
        const db = client.db("rajgram_db");
        let query: any = {};
        if (search) query.name = { $regex: search, $options: "i" };

        const [totalGPs, activeLeaders, totalSupports, districtStats, globalLeads, settings, panchayatList] = await Promise.all([
            db.collection("panchayats").countDocuments(),
            db.collection("panchayats").countDocuments({ status: "active" }),
            db.collection("supports").countDocuments(),
            db.collection("panchayats").aggregate([{ $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } }, { $sort: { active: -1 } }]).toArray(),
            db.collection("supports").find().limit(20).sort({ date: -1 }).toArray(),
            db.collection("admin_settings").findOne({}),
            db.collection("panchayats").find(query).sort({ status: 1, name: 1 }).limit(50).toArray()
        ]);

        return NextResponse.json({
            totalGPs, activeLeadersCount: activeLeaders, totalVotersCount: totalSupports,
            districtStats: JSON.parse(JSON.stringify(districtStats)),
            globalLeads: JSON.parse(JSON.stringify(globalLeads)),
            settings: JSON.parse(JSON.stringify(settings)),
            panchayatList: JSON.parse(JSON.stringify(panchayatList))
        });
    } catch (error: any) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}

export async function POST(req: Request) {
    try {
        const { action, data } = await req.json();
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        if (action === "update_alert") {
            await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });
        }

        // 1. Suspend (Sirf Lock lagana)
        if (action === "suspend_leader") {
            await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "suspended" } });
        }

        // 2. Reactivate (Wapas chalu karna)
        if (action === "reactivate_leader") {
            await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "active" } });
        }

        // 3. Reset to Idle (Naya neta aane par pura saaf karna)
        if (action === "reset_to_idle") {
            await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "idle", bio: "", leader_name: "", history: "", geography: "", economy: "", "config.themeColor": "#2d5a27", "config.banner": "", "config.avatar": "", "config.gallery": [], "config.videos": [] } });
        }

        // 4. Clear Only Images
        if (action === "clear_images") {
            await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { "config.banner": "", "config.avatar": "", "config.gallery": [], "config.manifestoImg": "", "config.historyImg": "", "config.geographyImg": "", "config.economyImg": "" } });
        }

        // 5. Clear Only Text (Yellow Button)
        if (action === "clear_text") {
            await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { bio: "", history: "", geography: "", economy: "" } });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}