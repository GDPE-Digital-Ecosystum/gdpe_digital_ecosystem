

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
//             db.collection("panchayats").aggregate([{ $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } }, { $sort: { active: -1 } }]).toArray(),
//             db.collection("supports").find().limit(20).sort({ date: -1 }).toArray(),
//             db.collection("admin_settings").findOne({}),
//             db.collection("panchayats").find(query).sort({ status: 1, name: 1 }).limit(50).toArray()
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

//         if (action === "update_alert") {
//             await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });
//         }

//         // 1. Suspend (Sirf Lock lagana)
//         if (action === "suspend_leader") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "suspended" } });
//         }

//         // 2. Reactivate (Wapas chalu karna)
//         if (action === "reactivate_leader") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "active" } });
//         }

//         // 3. Reset to Idle (Naya neta aane par pura saaf karna)
//         if (action === "reset_to_idle") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "idle", bio: "", leader_name: "", history: "", geography: "", economy: "", "config.themeColor": "#2d5a27", "config.banner": "", "config.avatar": "", "config.gallery": [], "config.videos": [] } });
//         }

//         // 4. Clear Only Images
//         if (action === "clear_images") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { "config.banner": "", "config.avatar": "", "config.gallery": [], "config.manifestoImg": "", "config.historyImg": "", "config.geographyImg": "", "config.economyImg": "" } });
//         }

//         // 5. Clear Only Text (Yellow Button)
//         if (action === "clear_text") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { bio: "", history: "", geography: "", economy: "" } });
//         }

//         return NextResponse.json({ success: true });
//     } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
// }


//2

// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcryptjs';

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//     try {
//         const { action, data } = await req.json();
//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         // 1. CREATE LEADER: Save to 'users' and activate 'panchayats'
//         if (action === "create_leader") {
//             const hashedPassword = await bcrypt.hash(data.password, 10);
//             await db.collection("users").insertOne({ email: data.email, password: hashedPassword, role: "LEADER", slug: data.slug, name: data.leaderName });
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { $set: { status: "active", leader_name: data.leaderName } });
//         }

//         // 2. 🚫 SUSPEND SITE (LOCK SYSTEM) - Sirf Status badlega
//         if (action === "suspend_leader") {
//             const res = await db.collection("panchayats").updateOne(
//                 { slug: data.slug },
//                 { $set: { status: "suspended" } }
//             );
//             console.log("Suspended Result:", res);
//         }

//         // 3. ✅ UNLOCK / REACTIVATE
//         if (action === "reactivate_leader") {
//             await db.collection("panchayats").updateOne(
//                 { slug: data.slug },
//                 { $set: { status: "active" } }
//             );
//         }

//         // 4. 🖼️ CLEAR ALL IMAGES IN DB (Removing from panchayats collection)
//         if (action === "clear_images") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { 
//                 $set: { 
//                     "config.banner": "", 
//                     "config.avatar": "", 
//                     "config.manifestoImg": "", 
//                     "config.historyImg": "", 
//                     "config.geographyImg": "", 
//                     "config.economyImg": "", 
//                     "config.gallery": [] 
//                 } 
//             });
//         }

//         // 5. 📝 CLEAR ALL TEXT CONTENT
//         if (action === "clear_text") {
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { 
//                 $set: { bio: "", history: "", geography: "", economy: "" } 
//             });
//         }

//         // 6. 🗑️ DELETE & RESET TO IDLE (Full Wipe)
//         if (action === "reset_to_idle") {
//             await db.collection("users").deleteOne({ slug: data.slug });
//             await db.collection("panchayats").updateOne({ slug: data.slug }, { 
//                 $set: { 
//                     status: "idle", leader_name: "", bio: "", history: "", geography: "", economy: "",
//                     "config.themeColor": "#2d5a27", "config.banner": "", "config.avatar": "", "config.gallery": [], "config.videos": [] 
//                 } 
//             });
//         }

//         if (action === "update_alert") {
//             await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });
//         }

//         return NextResponse.json({ success: true });
//     } catch (e: any) { 
//         console.error("Boss Action Error:", e.message);
//         return NextResponse.json({ error: e.message }, { status: 500 }); 
//     }
// }
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, data } = body;
        const client = await clientPromise;
        const db = client.db("rajgram_db");

        console.log(`🚀 BOSS ACTION: ${action} | TARGET: ${data.slug}`);

        // --- 1. SUSPEND SITE (LOCK SYSTEM) ---
        if (action === "suspend_leader") {
            await db.collection("panchayats").updateOne(
                { slug: data.slug },
                { $set: { status: "suspended" } } 
            );
        }

        // --- 2. REACTIVATE SITE ---
        if (action === "reactivate_leader") {
            await db.collection("panchayats").updateOne(
                { slug: data.slug },
                { $set: { status: "active" } }
            );
        }

        // --- 3. CLEAR ALL IMAGES & VIDEOS (Config Object) ---
        if (action === "clear_images") {
            await db.collection("panchayats").updateOne(
                { slug: data.slug },
                { 
                    $set: { 
                        "config.banner": "", 
                        "config.avatar": "", 
                        "config.manifestoImg": "", 
                        "config.historyImg": "", 
                        "config.geographyImg": "", 
                        "config.economyImg": "", 
                        "config.gallery": [], 
                        "config.videos": [] 
                    } 
                }
            );
        }

        // --- 4. CLEAR ALL TEXT CONTENT (Root Level Fields) ---
        if (action === "clear_text") {
            await db.collection("panchayats").updateOne(
                { slug: data.slug },
                { 
                    $set: { 
                        bio: "", 
                        history: "", 
                        geography: "", 
                        economy: "",
                        leader_name: "" 
                    } 
                }
            );
        }

        // --- 5. FULL DELETE (IDLE RESET) ---
        if (action === "reset_to_idle") {
            // Users collection se udaao
            await db.collection("users").deleteOne({ slug: data.slug });
            // Panchayat ko default green state mein lao
            await db.collection("panchayats").updateOne(
                { slug: data.slug },
                { 
                    $set: { 
                        status: "idle", 
                        leader_name: "", 
                        bio: "", 
                        history: "", 
                        geography: "", 
                        economy: "",
                        "config.themeColor": "#2d5a27",
                        "config.banner": "",
                        "config.avatar": "",
                        "config.gallery": [],
                        "config.videos": [],
                        "config.manifestoImg": "",
                        "config.historyImg": "",
                        "config.geographyImg": "",
                        "config.economyImg": ""
                    } 
                }
            );
        }

        // --- 6. CREATE LEADER ---
        if (action === "create_leader") {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await db.collection("users").insertOne({ 
                email: data.email, 
                password: hashedPassword, 
                role: "LEADER", 
                slug: data.slug, 
                name: data.leaderName 
            });
            await db.collection("panchayats").updateOne(
                { slug: data.slug }, 
                { $set: { status: "active", leader_name: data.leaderName } }
            );
        }

        // --- 7. UPDATE GLOBAL ALERT ---
        if (action === "update_alert") {
            await db.collection("admin_settings").updateOne({}, { $set: { global_alert: data.alert } }, { upsert: true });
        }

        return NextResponse.json({ success: true });

    } catch (e: any) { 
        console.error("API Error:", e.message);
        return NextResponse.json({ error: e.message }, { status: 500 }); 
    }
}

// GET method same rahega (Purana wala use karlo)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const client = await clientPromise;
    const db = client.db("rajgram_db");
    let query: any = {};
    if (search) query.name = { $regex: search, $options: "i" };

    const [totalGPs, active, supports, dists, leads, list, settings] = await Promise.all([
        db.collection("panchayats").countDocuments(),
        db.collection("panchayats").countDocuments({ status: "active" }),
        db.collection("supports").countDocuments(),
        db.collection("panchayats").aggregate([{ $group: { _id: "$district", total: { $sum: 1 }, active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } }, { $sort: { active: -1 } }]).toArray(),
        db.collection("supports").find().limit(20).sort({ date: -1 }).toArray(),
        db.collection("panchayats").find(query).sort({ status: 1, name: 1 }).limit(50).toArray(),
        db.collection("admin_settings").findOne({})
    ]);
    return NextResponse.json({ totalGPs, activeLeadersCount: active, totalVotersCount: supports, districtStats: dists, globalLeads: leads, panchayatList: JSON.parse(JSON.stringify(list)), settings });
}