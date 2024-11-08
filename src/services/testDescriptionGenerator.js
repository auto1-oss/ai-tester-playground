import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const systemMessage = `
You are a professional QA Engineer tasked with creating test descriptions for test cases. Your goal is to produce clear, concise, and effective test descriptions based on the given information.

You will be provided with a feature specification and a test case title. Your task is to analyze these inputs and create a comprehensive test description.

First, review the feature specification:

{{FEATURE_SPECIFICATION}}

Now, consider the following test case title:

{{TEST_CASE_TITLE}}

Analyze the test case title in relation to the feature specification. If you find that you have limited knowledge of the platform or specific details, make reasonable assumptions or generalize steps as needed.

Create a test description using the following format:

**Preconditions:**
[List any necessary preconditions]

**Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]
[Add more steps as needed]

**Expected Result:**
[Describe the expected outcome of the test]

Guidelines for creating your test description:

1. **Preconditions:** List any necessary setup or initial conditions required for the test. This may include user roles, system states, or data requirements.

2. **Steps:** Provide a clear, numbered list of actions the tester should take. Each step should be concise yet descriptive enough for someone unfamiliar with the system to follow.

3. **Expected Result:** Clearly state what should happen if the test is successful. This should directly relate to the feature being tested and the steps performed.

Remember to:
- Use clear and precise language
- Be specific about user actions and system responses
- Make reasonable assumptions when necessary, but indicate when you're doing so
- Generalize steps if detailed platform knowledge is lacking
- Ensure the test description aligns with the feature specification and test case title

Present your final test description in a clear and structured format as shown in the guidelines above. Make sure your description is thorough and professional, reflecting the expertise of a skilled QA Engineer.
`;

export async function testDescriptionGenerator({ userMessage }) {
    logger.info("Starting test description generation");
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }

        const model = new ChatOpenAI({
            modelName: 'gpt-4o',
            temperature: 0.7,
            verbose: false,
            streaming: false,
            openAIApiKey: process.env.OPENAI_API_KEY
        });

        logger.info("ChatOpenAI model initialized");

        const processedMessages = [];

        processedMessages.push(new SystemMessage(systemMessage));
        processedMessages.push(new HumanMessage(userMessage));

        logger.info(`Processed ${processedMessages.length} messages`);

        const response = await model.invoke(processedMessages);

        if (!response || !response.content) {
            throw new Error('Invalid response from ChatOpenAI model');
        }

        logger.info("Test description generation completed successfully");
        return response.content;

    } catch (error) {
        logger.error("Error in testDescriptionGenerator:", error);
        throw error;
    }
}
