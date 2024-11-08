import fetch from 'node-fetch';
import fs from 'fs/promises';

const payload = {
        aiSettings: {
            aiModel: 'gpt-4o',
            customTemperature: 0.7
        },
        messages: [
            {
                author: 'system',
                type: 'specification',
                message: `
            ### Business Specification: User Authentication System
            
            **Overview:**
            Develop a secure user authentication system that allows users to register, log in, and manage their profiles.
            
            **Requirements:**
            - **Registration:**
              - Users can sign up using email and password.
              - Email verification is required.
            - **Login:**
              - Users can log in with verified email and password.
              - Implement "Forgot Password" functionality via email.
            - **Profile Management:**
              - Users can view and update their profile information.
              - Password change functionality with current password verification.
            - **Security:**
              - Passwords must be hashed using a strong algorithm (e.g., bcrypt).
              - Implement account lockout after multiple failed login attempts.
            - **API Endpoints:**
              - POST /register
              - POST /login
              - POST /forgot-password
              - POST /reset-password
              - GET /profile
              - PUT /profile
            
            **Non-Functional Requirements:**
            - **Performance:** Authentication processes should complete within 2 seconds.
            - **Scalability:** Support up to 10,000 concurrent users.
            - **Compliance:** Adhere to GDPR for data protection.
            `
    },
    {
        author: 'user',
        message: 'Generate test cases based on the above business specification.'
    }
]
};

async function generateTestCases() {
    try {
        const response = await fetch('http://localhost:23500/ai/test-generation/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const responseJson = await response.json();
        const analysis = responseJson.analysis;

        const dataToWrite = typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2);

        await fs.writeFile('test-generation-response.md', dataToWrite);
        console.log('Test cases successfully saved to test-generation-response.md');

    } catch (error) {
        console.error('Error:', error);
    }
}

generateTestCases();
