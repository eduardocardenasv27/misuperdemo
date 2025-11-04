import express from 'express';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/api/posts', postRoutes)

app.listen(port);

app.get('/', (req, res) => {
    res.send('hola mundo');
});

console.log('server on port', port);