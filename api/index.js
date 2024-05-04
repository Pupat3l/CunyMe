import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());

// Construct the directory path to serve static files
const clientDirectory = dirname(__filename);

app.use(express.static(clientDirectory));
app.use(express.json());

app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
