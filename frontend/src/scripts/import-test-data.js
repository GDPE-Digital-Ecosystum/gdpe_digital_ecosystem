const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function importTest() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db("rajgram_db");
        // ✅ Nayi Collection mein data dalo
    
        const testCollection = db.collection("usertests");

        const data = JSON.parse(fs.readFileSync('gram_panchayat1.json', 'utf8'));
        
        console.log("⏳ Purana test data saaf kar rahe hain...");
        await testCollection.deleteMany({});
        
        console.log(`🚀 ${data.length} records upload ho rahe hain...`);
        await testCollection.insertMany(data);
        
        // Slug index banana mat bhulna
        await testCollection.createIndex({ slug: 1 }, { unique: true });
        
        console.log("✅ SUCCESS: Naya data panchayats_test mein aa gaya!");
    } catch (e) { console.error(e); }
    finally { await client.close(); }
}
importTest();