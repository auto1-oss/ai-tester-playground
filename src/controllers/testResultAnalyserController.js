/*
 * This file is part of the auto1-oss/ai-tester-playground.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { testResultAnalyserService } from "../services/testResultAnalyserService.js";

export const testResultAnalyserController = async (req, res) => {
    try {
        const userMessage = req.body.userMessage;

        if (userMessage) {
            const analysis = await testResultAnalyserService(userMessage);
            res.json({ analysis });
        } else {
            res.status(400).json({ error: 'User Message cannot be null' });
        }

    } catch (e) {
        console.error("Error in testResultAnalyserController:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
