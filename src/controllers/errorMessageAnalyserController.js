import { errorMessageAnalyserService } from "../services/errorMessageAnalyserService.js";

export const errorMessageAnalyserController = async (req, res) => {
    try {
        const userMessage = req.body.userMessage;

        if (userMessage) {
            const analysis = await errorMessageAnalyserService(userMessage);
            res.json({ analysis });
        } else {
            res.status(400).json({ error: 'User Message cannot be null' });
        }

    } catch (e) {
        console.error("Error in testResultAnalyserController:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
