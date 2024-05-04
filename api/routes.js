import express from 'express';
import fetch from 'node-fetch';
import connectToDb from './db.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const db = await connectToDb();

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

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, '../client', filename));
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email address');
     }
    
    if (!isValidPassword(password)) {
        return res.status(400).send('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.collection('users').insertOne({ email, password: hashedPassword });
        res.send('Registration successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            res.send('Registration successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

function isValidPassword(password) {
    return password.length >= 8;
}
export default router;
