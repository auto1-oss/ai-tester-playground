import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const initialMessage = `
When analyzing test failures, you will receive a failure message and, optionally, the relevant source code. Your analysis should yield precise, actionable recommendations that directly address the identified issues without resorting to superficial fixes.

Your response should include:

- **File Name:** Clearly identify the file where the error was detected.
- **Function Details:** If source code is provided, include the entire function where the error occurred. Highlight the specific part of the function related to the failure.
- **Recommendations (Limit to 3):** Offer up to three specific, actionable recommendations for resolving the problem. Recommendations should be rooted in best practices and aim to address the root cause of the failure.
  - Avoid suggesting to merely increase timeout values.
  - Do not recommend adding try-catch blocks or loops as a workaround.
  - Do not recommend adding if-else conditions.
- **Diagnosis:** Assess whether the issue suggests a bug within the system or if the test code requires adjustments due to changes in the application's behavior or structure.

**Formatting Guidelines:**

- Use Markdown for clear and structured responses. Incorporate code blocks for function details and recommendations where applicable.
- Keep the explanation concise, focusing on the "what" and "how" of your recommendations.

**Example Structure:**

\`\`\`markdown
**File Name:** \`ExamplePageTests.java\`

**Function Details:**
void problematicFunction() {
    // Code snippet where the error occurs
}

**Recommendations:**

1. **Code Improvement:**
   // Suggested code fix
2. **Review Application Changes:**
   Ensure the test aligns with recent application updates.
3. **Enhance Test Reliability:**
   Implement more robust condition checks before proceeding.

**Diagnosis:**
Based on the error, this appears to be [a bug in the system/a need for test code adjustment]. Further investigation is recommended to confirm.
\`\`\`
`;

export async function testResultAnalyserService(userMessage) {
    console.log(`Preparing for test result analysis`);
    try {
        const systemMessage = new SystemMessage(initialMessage);
        const humanMessage = new HumanMessage(userMessage);

        const chat = new ChatOpenAI({
            temperature: 0.5,
            verbose: false,
            modelName: "gpt-4o",
            streaming: false,
        });

        const analysis = await chat.invoke([systemMessage, humanMessage]);

        console.log("AI Interaction is Finished");

        return analysis.content;

    } catch (error) {
        console.error("Test Run Analysis Failed:", error);
        throw error;
    }
}
