import express from 'express';
import connectToDb from './db.js';
import path from 'path';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import fs from 'fs';


const __dirname = path.resolve();

const router = express.Router();

const db = await connectToDb();

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../client', filename);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        console.error(`File not found: ${filename}`);
        res.status(404).send('File not found');
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const { firstName, lastName } = extractNamesFromEmail(email);
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email address');
     }
    
    if (!isValidPassword(password)) {
        return res.status(400).send('Password must be at least 8 characters');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.collection('users').insertOne({ email, password: hashedPassword, firstName: capitalize(firstName), lastName: capitalize(lastName) });
        const user = await db.collection('users').findOne({ email });
        const responseData = {
            id:user._id,
            email,
            Fname: capitalize(firstName),
            Lname: capitalize(lastName),
        };
        res.json(responseData);
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
            const userData = {
                id: user._id,
                email: user.email,
                Fname: user.firstName,
                Lname: user.lastName,
            };
            res.json(userData);
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});
router.get('/signout', (req, res) => {
    res.status(200).send('Sign-out successful');
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/print', upload.single('formFileMultiple') , async (req, res) => {
    const file = req.file; 
    const printer = req.body.printer;
    const copies = req.body.copies;
    const userId = req.body.userId;
    try {
        await db.collection('printing').insertOne({
            userId,
            printer,
            copies,
            file
        });
        res.redirect('submitted.html');;
    } catch (error) {
        console.error('Error saving printing data:', error);
        res.status(500).send('An error occurred while saving printing data');
    }
});

router.get('/printing/history/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const printingHistory = await db.collection('printing').find({ userId }).toArray();
        res.json(printingHistory);
    } catch (error) {
        console.error('Error fetching printing history:', error);
        res.status(500).json({ error: 'An error occurred while fetching printing history' });
    }
});


router.put('/updatePassword', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    try {
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.collection('users').updateOne(
            { _id: ObjectId(userId) },
            { $set: { password: hashedNewPassword } }
        );

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('An error occurred while updating password');
    }
});

router.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await db.collection('users').findOneAndDelete({ _id: ObjectId(userId) });

        if (!deletedUser.value) {
            return res.status(404).json({ message: 'User not found' });
        }
        const responseData = {
            id: deletedUser.value._id,
            email: deletedUser.value.email,
            Fname: deletedUser.value.firstName,
            Lname: deletedUser.value.lastName,
        };

        res.json({ message: 'User deleted successfully', user: responseData });
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

function extractNamesFromEmail(email) {
    const [name, rest] = email.split('@');
    const [firstName, lastName]=name.split(/[_\.]/);
    capitalize(firstName);
    capitalize(lastName);
    return { firstName, lastName };
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default router;
