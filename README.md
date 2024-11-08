# AI Tester Playground

Welcome to the **AI Tester Playground**, an interactive environment designed to leverage AI for various Quality Assurance (QA) tasks. This repository provides a set of tools and examples that demonstrate how to analyze error messages, generate test descriptions, and create comprehensive test cases using OpenAI's language models.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Using the Examples](#using-the-examples)
- [API Endpoints](#api-endpoints)
- [Viewing Output](#viewing-output)

## Features

- **Error Message Analysis**: Analyze and extract key information from error stack traces.
- **Test Description Generation**: Create detailed test descriptions based on feature specifications and test case titles.
- **Test Case Generation**: Generate comprehensive and categorized test cases from business specifications.
- **Test Result Analysis**: Provide actionable recommendations based on test failures.
- **Extensible Architecture**: Easily add new AI-powered QA tools by extending controllers and services.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14 or higher. You can download it from [Node.js Official Website](https://nodejs.org/).
- **OpenAI API Key**: Obtain an API key from [OpenAI](https://openai.com/).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/agyulai/ai-tester-playground.git
   cd ai-tester-playground
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the necessary dependencies using npm:

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory of the project to store your environment variables. This file should contain your OpenAI API key and any other necessary configurations.

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=23500
   VERBOSE=false
   ```

    - **OPENAI_API_KEY**: Your OpenAI API key.
    - **PORT**: (Optional) The port on which the server will run. Defaults to `23500` if not specified.
    - **VERBOSE**: (Optional) Set to `true` to enable verbose logging.

## Running the Application

Start the Express server by running:

```bash
npm start
```

The server will start on the specified port (default is `23500`). You can verify it's running by accessing the health check endpoint:

```bash
http://localhost:23500/health
```

You should receive a JSON response:

```json
{
  \"status\": \"UP\"
}
```

## Using the Examples

The repository includes several example scripts that demonstrate how to interact with the AI-powered endpoints. These examples showcase how to analyze error messages, generate test descriptions, create test cases, and analyze test results.

### Example Scripts

1. **Test Description Example**

   Generates a test description based on a feature specification and test case title.

   ```bash
   node src/examples/test-description-example.js
   ```

   **Output:** A `test-description-response.md` file containing the generated test description.

2. **Test Error Example**

   Analyzes an error message to extract relevant information.

   ```bash
   node src/examples/test-error-example.js
   ```

   **Output:** A `test-error.md` file containing the analysis.

3. **Test Generation Example**

   Generates test cases from a business specification.

   ```bash
   node src/examples/test-generation-example.js
   ```

   **Output:** A `test-generation-response.md` file containing the generated test cases.

4. **Test Result Example**

   Analyzes test results to provide actionable recommendations.

   ```bash
   node src/examples/test-result-example.js
   ```

   **Output:** A `test-result.md` file containing the analysis.

## API Endpoints

The application exposes several API endpoints under the `/ai` path. Below are the available routes and their functionalities:

- **POST /ai/test-result/analyse**

  Analyzes test results to provide recommendations.

  **Sample Request**
   
   ```bash
   curl -X POST http://localhost:23500/ai/test-result/analyse \
     -H "Content-Type: application/json" \
     -d '{
           "userMessage": "<YOUR_ERROR_MESSAGE_HERE>"
         }'
   ```

- **POST /ai/test-error/analyse**

  Analyzes error messages to extract failure points and related files.
  
  **Sample Request**
   
   ```bash
   curl -X POST http://localhost:23500/ai/test-error/analyse \
     -H "Content-Type: application/json" \
     -d '{
           "userMessage": "<YOUR_ERROR_MESSAGE_HERE>"
         }'
   ```

- **POST /ai/test-description/generate**

  Generates detailed test descriptions based on provided specifications.
  
  **Sample Request**
   
   ```bash
   curl -X POST http://localhost:23500/ai/test-description/generate \
     -H "Content-Type: application/json" \
     -d '{
           "featureSpecification": "<YOUR_FEATURE_SPECIFICATION_HERE>",
           "testCaseTitle": "<YOUR_TEST_CASE_TITLE_HERE>"
         }'

   ```

- **POST /ai/test-generation/generate**

  Generates comprehensive test cases from business specifications.

   **Sample Request**
   
   ```bash
   curl -X POST http://localhost:23500/ai/test-generation/generate \
     -H "Content-Type: application/json" \
     -d '{
           "aiSettings": {
             "aiModel": "gpt-4o",
             "customTemperature": 0.7
           },
           "messages": [
             {
               "author": "system",
               "type": "specification",
               "message": "<YOUR_BUSINESS_SPECIFICATION_HERE>"
             },
             {
               "author": "user",
               "message": "<YOUR_USER_MESSAGE_HERE>"
             }
           ]
         }'
   ```

## Viewing Output

The example scripts save their outputs as Markdown (`.md`) files in the `src/examples/` directory. You can view these files using any Markdown viewer or text editor to see the AI-generated content.

For example, after running the test description example:

- **File:** `src/examples/test-description-response.md`
- **Content:** Detailed test description based on your input.


*Happy Testing!*
