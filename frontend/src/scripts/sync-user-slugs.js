const { MongoClient } = require('mongodb');
const { transliterate } = require('transliteration');
const slugify = require('slugify');
require('dotenv').config({ path: '.env.local' });

async function syncUsers() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db("rajgram_db");
        const usersCollection = db.collection("users");

        const users = await usersCollection.find({ role: "LEADER" }).toArray();
        console.log(`🔄 Checking ${users.length} users for Hindi slugs...`);

        for (const user of users) {
            // Check karo agar slug mein Hindi characters hain
            const isHindi = /[^\x00-\x7F]/.test(user.slug);

            if (isHindi) {
                console.log(`Found Hindi Slug: ${user.slug} for user ${user.name}`);
                
                // 1. Hindi slug ko English mein badlo wahi purane logic se
                const englishSlug = slugify(transliterate(user.slug), {
                    lower: true,
                    strict: true,
                    trim: true
                });

                // 2. Database mein update karo
                await usersCollection.updateOne(
                    { _id: user._id },
                    { $set: { slug: englishSlug } }
                );
                
                console.log(`✅ Updated to: ${englishSlug}`);
            } else {
                console.log(`✔️ Slug already in English: ${user.slug}`);
            }
        }

        console.log("\n🚀 MUBARAK HO! Users collection ab ekdum clean hai.");

    } catch (e) {
        console.error("❌ Error:", e.message);
    } finally {
        await client.close();
    }
}

syncUsers();