/*
 * This file is part of the auto1-oss/ai-tester-playground.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
