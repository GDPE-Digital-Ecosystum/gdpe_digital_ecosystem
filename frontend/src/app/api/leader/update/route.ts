
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const {
//             slug, themeColor, bio, banner, leader_name, avatar,
//             history, geography, economy,
//             historyImg, geographyImg, economyImg // 👈 Naye Image fields
//         } = body;

//         const client = await clientPromise;
//         const db = client.db("rajgram_db");

//         await db.collection("panchayats").updateOne(
//             { slug: slug },
//             {
//                 $set: {
//                     "leader_name": leader_name, // 👈 Naya field
//                     "config.avatar": avatar,
//                     "config.themeColor": themeColor,
//                     "config.banner": banner,
//                     "bio": bio,
//                     "history": history,
//                     "geography": geography,
//                     "economy": economy,
//                     "config.historyImg": historyImg,
//                     "config.geographyImg": geographyImg,
//                     "config.economyImg": economyImg,
//                     "status": "active"
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
        const { 
            slug, leader_name, bio, banner, themeColor,
            history, geography, economy,
            historyImg, geographyImg, economyImg,
            avatar, avatarPos, avatarZoom, manifestoImg 
        } = body;

        const client = await clientPromise;
        const db = client.db("rajgram_db");

        await db.collection("panchayats").updateOne(
            { slug: slug },
            { 
                $set: { 
                    leader_name,
                    bio,
                    status: "active",
                    "config.themeColor": themeColor,
                    "config.banner": banner,
                    "config.avatar": avatar,
                    "config.avatarPos": avatarPos,
                    "config.avatarZoom": avatarZoom,
                    "config.manifestoImg": manifestoImg,
                    "config.historyImg": historyImg,
                    "config.geographyImg": geographyImg,
                    "config.economyImg": economyImg,
                    history,
                    geography,
                    economy
                } 
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update Failed" }, { status: 500 });
    }
}