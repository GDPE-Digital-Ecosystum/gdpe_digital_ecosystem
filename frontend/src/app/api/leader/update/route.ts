
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const { 
//             slug, leader_name, bio, banner, themeColor,
//             history, geography, economy,
//             historyImg, geographyImg, economyImg,
//             avatar, avatarPos, avatarZoom, manifestoImg,
//             gallery,videos // 👈 Ye array dashboard se aa raha hai
//         } = body;

//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         await db.collection("panchayats_test").updateOne(
//             { slug: slug },
//             { 
//                 $set: { 
//                     leader_name,
//                     bio,
//                     status: "active",
//                     "config.themeColor": themeColor,
//                     "config.banner": banner,
//                     "config.avatar": avatar,
//                     "config.avatarPos": avatarPos,
//                     "config.avatarZoom": avatarZoom,
//                     "config.manifestoImg": manifestoImg,
//                     "config.historyImg": historyImg,
//                     "config.geographyImg": geographyImg,
//                     "config.economyImg": economyImg,
//                     "config.gallery": gallery || [], // 👈 Gallery yahan save ho rahi hai
//                     "config.videos": videos || [], // 👈 Naya field videos save karne ke liye
//                     history,
//                     geography,
//                     economy
//                 } 
//             }
//         );

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         return NextResponse.json({ error: "Update Failed" }, { status: 500 });
//     }
// }
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { slug } = body;

        if (!slug) return NextResponse.json({ error: "Slug missing" }, { status: 400 });

        // ✅ HINDI FIX: Slug ko decode aur normalize karo taaki DB se exact match ho
        const decodedSlug = decodeURIComponent(slug).normalize('NFC');

        const client = await clientPromise;
        const db = client.db("rajgram_db");

        // Data Object based on your exact screenshot structure
        const updateFields = { 
            leader_name: body.leader_name,
            bio: body.bio,
            history: body.history,
            geography: body.geography,
            economy: body.economy,
            status: "active",
            "config.themeColor": body.themeColor,
            "config.banner": body.banner,
            "config.avatar": body.avatar,
            "config.avatarPos": body.avatarPos,
            "config.avatarZoom": body.avatarZoom,
            "config.manifestoImg": body.manifestoImg,
            "config.historyImg": body.historyImg,
            "config.geographyImg": body.geographyImg,
            "config.economyImg": body.economyImg,
            "config.gallery": body.gallery || [],
            "config.videos": body.videos || [],
//               "secretary_name": "Chandra Prakash",
//   "secretary_phone": "98290XXXXX",
//   "secretary_email": "sec@raj.gov.in",
//   "assets": [
//     { 
//       "id": 1, 
//       "name": "Naya School Bhawan", 
//       "cat": "Education", 
//       "cost": "₹25 Lakh", 
//       "lat": 25.2138, 
//       "lng": 74.6355, 
//       "img": "cloudinary_url" 
//     }
//   ]
        };

        console.log("🛠️ Attempting update for slug:", decodedSlug);

        // 1. Pehle 'panchayats' collection mein try karo
        let result = await db.collection("panchayats").updateOne(
            { slug: decodedSlug },
            { $set: updateFields }
        );

        // 2. Agar wahan nahi mila, toh 'panchayats_test' mein update karo
        if (result.matchedCount === 0) {
            console.log("Not found in main, trying panchayats_test...");
            result = await db.collection("panchayats_test").updateOne(
                { slug: decodedSlug },
                { $set: updateFields }
            );
        }

        if (result.matchedCount === 0) {
            console.error("❌ Slug not found in any collection:", decodedSlug);
            return NextResponse.json({ error: "Panchayat not found" }, { status: 404 });
        }

        console.log("✅ Update Successful for:", decodedSlug);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Update API Error:", error.message);
        return NextResponse.json({ error: "Update Failed" }, { status: 500 });
    }
}