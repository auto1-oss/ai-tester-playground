/*
 * This file is part of the auto1-oss/ai-tester-playground.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from 'dotenv';
import { testRequirementsGenerator } from "./testRequirementsGenerator.js";
import logger from '../utils/logger.js';

dotenv.config();

const systemMessage = `
Prompt for Exhaustive and Detailed Test Case Generation Based on Acceptance Criteria

You will receive a business specification document, sometimes in the form of processed text from a PDF. Your task is to analyze this information and generate an exhaustive, structured list of test cases, grouped under specific acceptance criteria provided in the system message. Do not modify the output structure.

Instructions for Generating Test Cases:

Meticulous Document Analysis:

Carefully read and analyze every single detail in the provided business specification.
Treat each sentence and bullet point as a potential test case.
Exhaustive Test Case Creation:

Create a separate test case for every single functionality, feature, UI element, status change, user interaction, and system behavior mentioned in the document.
Do not summarize or combine multiple requirements into a single test case.
Strict Adherence to Specifications:

Use the exact terminology, button texts, status names, and numerical values as mentioned in the document.
Include all specific details such as day counts, filter names, and status transitions in your test cases.
Comprehensive Coverage:

Ensure test cases cover all aspects mentioned in the document, including but not limited to:
UI changes (e.g., title changes, button text modifications)
New functionalities (e.g., new buttons, filters)
Status transitions and their conditions
User flow changes
Text changes and new messages
Tracking and analytics requirements
Categorize Test Cases:

Prefix each test case with an appropriate category: [Functional] [Boundary] [Negative] [Error Handling] [Performance] [Security] [Data Integrity] [User Experience] [Tracking]
Format Test Cases in JSON:
Use the following JSON template:
{
"testCases": [
{
"acceptance_criteria": "Criterion description (max 255 characters)",
"id": "AC-SESSID-TIMESTAMP-COUNTER",
"test_cases": [
{"id": "TC-SESSID-TIMESTAMP-COUNTER", "title": "Category: Detailed test case description (max 255 characters)"},
...
]
},
...
]
}

Ensure Specificity and Detail:

Each test case should be highly specific, testable, and directly related to a single requirement in the document.
Include all relevant details from the specification in each test case.
Cross-Reference and Verification:

After creating all test cases, cross-reference them with the original document to ensure no details are missed.
If any information is missing or unclear, create a test case to verify that specific aspect.
Unique Identifier Generation:

Generate unique identifiers for each acceptance criterion and test case as per the specified format.
Ensure no duplication of identifiers.
Output Format:

Provide the response solely in valid JSON format.
Do not include any explanatory text outside the JSON structure.
Deliverable:
A comprehensive JSON file containing an exhaustive list of detailed test cases, each categorized and organized under the corresponding acceptance criteria as specified in the system message. The test cases should cover every single aspect of the functionality described in the provided business specification, without omitting any details, no matter how small.
`;

export async function testGeneration(payload) {
    try {
        logger.info('Starting testGenerationPreparation');

        if (!payload || typeof payload !== 'object') {
            throw new Error('Invalid or missing payload');
        }

        const { aiModel, customTemperature } = payload.aiSettings || {};
        logger.info(`AI Model: ${aiModel}, Custom Temperature: ${customTemperature}`);

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }
        const verbose = process.env.VERBOSE === 'true' || false;

        const model = new ChatOpenAI({
            modelName: aiModel && aiModel.length > 0 ? aiModel : 'gpt-4',
            temperature: aiModel && aiModel.length > 0 ? parseFloat(customTemperature) : 1,
            verbose: verbose,
            streaming: false,
            openAIApiKey: process.env.OPENAI_API_KEY,
            timeout: 60000,
        });
        logger.info('ChatOpenAI model initialized');

        if (!Array.isArray(payload.messages)) {
            throw new Error('Invalid or missing messages in payload');
        }

        const messages = [];

        messages.push(new SystemMessage(systemMessage));
        payload.messages.forEach(item => {
            if (!item || typeof item !== 'object') {
                logger.warn('Invalid message item:', item);
                return;
            }

            if (item.author === 'system') {
                messages.push(new SystemMessage(item.message));
            } else if (item.author === 'user') {
                if (!item.message) {
                    logger.warn('User message is empty');
                    return;
                }
                messages.push(new HumanMessage(item.message));
            } else {
                logger.warn(`Unknown author type: ${item.author}`);
            }
        });

        logger.info(`Processed ${messages.length} valid messages`);

        const acc = await testRequirementsGenerator(payload);
        logger.info('Test requirements generated');

        messages.push(new SystemMessage(`IMPORTANT: You MUST VERY CAREFULLY FOLLOW these Acceptance Criteria in your response. These criteria are crucial and should guide your entire output. Ensure that every aspect of your response aligns with and addresses these criteria:

${acc}

Failure to adhere to these criteria will result in an incomplete or incorrect response. Please review and incorporate each point thoroughly in your output.`));

        logger.info('Invoking ChatOpenAI model');
        const response = await model.invoke(messages);

        if (!response || !response.content) {
            throw new Error('Invalid response from ChatOpenAI model');
        }

        logger.info('Test generation preparation completed successfully');
        return response.content;
    } catch (error) {
        logger.error("Error in testGenerationPreparation:", error);
        throw error;
    }
}
