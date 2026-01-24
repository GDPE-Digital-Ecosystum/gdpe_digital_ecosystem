import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing');

const uri = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;