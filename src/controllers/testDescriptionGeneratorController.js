import { testDescriptionGenerator } from "../services/testDescriptionGenerator.js";

export const testDescriptionGeneratorController = async (req, res) => {
    try {
        const { featureSpecification, testCaseTitle } = req.body;

        if (!featureSpecification || !testCaseTitle) {
            return res.status(400).json({ error: 'featureSpecification and testCaseTitle are required.' });
        }

        const userMessage = `Feature Specification:\n${featureSpecification}\n\nTest Case Title:\n${testCaseTitle}`;

        const analysis = await testDescriptionGenerator({ userMessage });

        res.json({ analysis });
    } catch (e) {
        console.error("Error in testDescriptionGeneratorController:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
