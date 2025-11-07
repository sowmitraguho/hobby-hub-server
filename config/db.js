import { MongoClient, ServerApiVersion } from "mongodb";

let db = null;
let client = null;

async function connectDB() {
  try {
    client = new MongoClient(process.env.MongodbURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db("groupsdb");

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) throw new Error("DB not initialized!");
  return db;
}

export function getClient() {
  if (!client) throw new Error("Mongo client not initialized!");
  return client;
}

export default connectDB;
