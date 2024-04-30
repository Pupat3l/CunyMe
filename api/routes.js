import express from 'express';
import fetch from 'node-fetch';
import connectToDb from './db.js';

const router = express.Router();

router.get('/hello', async (req, res) => {
    try {
        const response = await fetch('https://api.gameofthronesquotes.xyz/v1/houses');
        const json = await response.json();
        res.json(json);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/1', (req, res) => {
    res.json({ name: "Pujan", id: req.params.id });
});

router.get('/movies', async (req, res) => {
    try {
        const db = await connectToDb();
        const collection = db.collection('movies');
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;
