import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import openaiRoutes from "./src/routes/routes.js";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// Now, you can add your routes
app.use('/ai', openaiRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

export default app;
