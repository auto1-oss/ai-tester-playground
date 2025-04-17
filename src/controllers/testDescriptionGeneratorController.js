/*
 * This file is part of the auto1-oss/ai-tester-playground.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
