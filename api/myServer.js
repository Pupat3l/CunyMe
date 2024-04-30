import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());

app.use('/api',routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
