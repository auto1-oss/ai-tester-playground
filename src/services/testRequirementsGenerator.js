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
import logger from '../utils/logger.js';

dotenv.config();

const systemMessage = `
You are a QA Engineer tasked with creating a list of high-level acceptance criteria categories based strictly on the given specifications. These categories will be used by AI as a foundation for creating detailed test cases.

Here are the specifications you will be working with:

<specifications> {{SPECIFICATIONS}} </specifications>

Your task is to:

Carefully analyze the specifications.
Identify the main functional areas or features explicitly mentioned.
Create a numbered list of high-level acceptance criteria categories.
Important Instructions:

Each category should be directly based on the specifications.
Use clear, concise language suitable for QA purposes.
Ensure all major functional areas from the specifications are represented.
Provide only the category titles, without any additional details or descriptions.
Do not provide detailed test cases or any additional information beyond the high-level category titles.
Format your output as a simple numbered list of category titles. Each title should be in the format:

<category> Number. Category Title </category>

Note: If the user provides a different template for the output, prioritize using that template over the default format.

Provide your list of high-level acceptance criteria category titles based strictly on the given specifications.
`;

export async function testRequirementsGenerator(payload) {
    logger.info("Starting testRequirementsGenerator");
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }

        if (!payload || !payload.messages || !Array.isArray(payload.messages)) {
            throw new Error('Invalid payload structure');
        }

        const model = new ChatOpenAI({
            modelName: 'gpt-4',
            temperature: 0.5,
            verbose: false,
            streaming: false,
            openAIApiKey: process.env.OPENAI_API_KEY
        });

        logger.info("ChatOpenAI model initialized");

        const processedMessages = [];
        let specificationMessage = '';

        processedMessages.push(new SystemMessage(systemMessage));

        payload.messages.forEach((item, index) => {
            if (!item || typeof item !== 'object') {
                logger.warn(`Invalid message item at index ${index}:`, item);
                return;
            }

            if (item.author === "system" && item.type === "specification") {
                specificationMessage += item.message + '\n';
            } else if (item.author === "user") {
                if (!item.message) {
                    logger.warn(`User message is empty at index ${index}`);
                    return;
                }
                processedMessages.push(new HumanMessage(item.message));
            }
        });

        if (specificationMessage) {
            processedMessages.push(new SystemMessage(specificationMessage));
        }

        logger.info(`Processed ${processedMessages.length} messages`);

        const response = await model.invoke(processedMessages);

        if (!response || !response.content) {
            throw new Error('Invalid response from ChatOpenAI model');
        }

        logger.info("Test requirements generation completed successfully");
        return response.content;

    } catch (error) {
        logger.error("Error in testRequirementsGenerator:", error);
        throw error;
    }
}
