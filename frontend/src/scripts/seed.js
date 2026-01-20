const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
// dotenv ko load karna padega warna process.env kaam nahi karega
require('dotenv').config({ path: '.env.local' });

async function seedData() {
    // 1. Check karo ki environment variable load hua ya nahi
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("❌ ERROR: MONGODB_URI nahi mila! Pehle check karo ki .env.local file root folder mein hai ya nahi.");
        process.exit(1);
    }

    const client = new MongoClient(uri);

    try {
        console.log("⏳ MongoDB se connect ho raha hai...");
        await client.connect();
        const db = client.db("rajgram_db"); // Database ka naam
        const collection = db.collection("panchayats");

        // 2. master_data.json ka sahi path dhundna
        // Agar file root mein hai toh '../' use karna hoga
        const jsonPath = path.join(process.cwd(), 'master_data.json');
        
        if (!fs.existsSync(jsonPath)) {
            console.error(`❌ ERROR: File nahi mili path par: ${jsonPath}`);
            console.log("Check karo ki master_data.json project ke root (sabse bahar wale) folder mein hai.");
            process.exit(1);
        }

        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        console.log(`📦 Data mil gaya: ${data.length} records. Upload shuru ho raha hai...`);

        // 3. Purana data delete karo aur naya insert karo
        await collection.deleteMany({});
        const result = await collection.insertMany(data);

        // 4. Slug par Index lagao (Search fast karne ke liye)
        await collection.createIndex({ slug: 1 }, { unique: true });

        console.log(`✅ SUCCESS: ${result.insertedCount} records upload ho gaye!`);

    } catch (err) {
        console.error("❌ DATABASE ERROR:", err.message);
    } finally {
        await client.close();
        console.log("🔌 Connection closed.");
    }
}

seedData();