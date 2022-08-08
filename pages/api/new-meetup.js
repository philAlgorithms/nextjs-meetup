import { MongoClient } from "mongodb";

async function handler (req, res) {
    if(req.method === 'POST'){
        const data = req.body;
        
        const client = await MongoClient.connect('mongodb+srv://admin:meetup_123X@cluster0.2dnl0f9.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;