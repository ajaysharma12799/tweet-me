import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import Router from './routes/routes';
import connectDB from './config/dbConfig';

const app: Express = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// DB Config
connectDB();

// Routes
app.use('/api/v1', Router);

const Port = 4321;
try {
    server.listen(Port, (): void => {
        console.log(`Server Running on http://localhost:${Port}`);
    });
} catch (error) {
    console.log(error);
}