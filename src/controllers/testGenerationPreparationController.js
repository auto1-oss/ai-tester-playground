import {testGeneration} from "../services/testGenerationPreparation.js";

export const testGenerationController = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload) {
            return res.status(400).json({ error: 'Payload is required.' });
        }

        const analysis = await testGeneration(payload);

        res.json({ analysis });
    } catch (e) {
        console.error("Error in testGenerationPreparationController:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
