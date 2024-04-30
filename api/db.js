import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.MONGODB_URL;
const dbName = 'sample_mflix';

async function connectToDb() {
    const client = new MongoClient(mongo_url, { useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default connectToDb;
