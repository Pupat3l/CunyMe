import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import { dirname} from 'path';
import path from 'path';


const __dirname = dirname(path.resolve());

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'client')));

app.use(express.json());

app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
