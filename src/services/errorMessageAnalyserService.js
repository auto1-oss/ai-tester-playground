import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const initialMessage = `
Your task is to analyze error stack traces provided by the user to extract and organize information about where a failure occurred within an internal software repository. When processing the error stack trace, adhere to the following guidelines to generate your response:

Identify the Failure Point: Determine the exact file (with its extension) and line number where the error originated. This file should be part of the internal repository, not external libraries or frameworks.

List Related Internal Files: Compile a list of all unique files from the internal codebase mentioned in the stack trace. Include relevant file types (e.g., Java, Groovy) that are part of the internal repository. Ensure each file is listed only once, focusing on the first occurrence of each file as the point of interest.

Format the Response in JSON: Provide your response in JSON format, with two main components: "failedOn" for the primary failure point and "relatedFiles" for a deduplicated list of related files from the internal codebase. Follow this template:

{
  "failedOn": {"fileName": "FileName.extension", "line": "LineNumber"},
  "relatedFiles": [
    {"fileName": "FileName.extension", "line": "LineNumber"},
    ...
  ]
}
Differentiate Between Internal and External Files: Exercise caution to distinguish internal repository files from external ones. This includes recognizing specific naming conventions, file paths, or other patterns that indicate a file is part of the internal codebase"
Note: The accuracy of identifying and excluding external files is crucial for the integrity of the extracted information. Ensure that the response accurately reflects the internal codebase's involvement in the error while adhering to the specified JSON format.
`

export async function errorMessageAnalyserService(userMessage) {
    console.log(`Preparing for test error analysis`);
    try {
        const systemMessage = new SystemMessage(initialMessage);
        const humanMessage = new HumanMessage(userMessage);

        const chat = new ChatOpenAI({
            temperature: 0.5,
            verbose: false,
            modelName: "gpt-4o",
            streaming: false,
        }).bind({
            response_format: {
                type: "json_object",
            },
        });;

        const analysis = await chat.invoke([systemMessage, humanMessage]);

        console.log("AI Interaction is Finished");

        return analysis.content;

    } catch (error) {
        console.error("Test Run Analysis Failed:", error);
        throw error;
    }
}
