import "server-only"

import { MongoClient, ServerApiVersion, Db, Collection, Document } from "mongodb"

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found!")
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let cachedDb: Db | null = null

async function getDb(dbName: string): Promise<Db> {
  try {
    if (cachedDb) {
      return cachedDb
    }

    await client.connect()
    console.log(">>>> Connected to DB <<<<")

    cachedDb = client.db(dbName)
    return cachedDb
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const db = await getDb("next_blog_db")
  return db.collection<T>(collectionName)
}
