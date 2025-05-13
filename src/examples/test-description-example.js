/*
 * This file is part of the auto1-oss/ai-tester-playground.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import fetch from 'node-fetch';
import fs from 'fs/promises';

const payload = {
    featureSpecification: `
    1. User Authentication System
Overview:
Develop a secure user authentication system that allows users to register, log in, and manage their profiles.

Requirements:

Registration:
Users can sign up using email and password.
Email verification is required.
Login:
Users can log in with verified email and password.
Implement "Forgot Password" functionality via email.
Profile Management:
Users can view and update their profile information.
Password change functionality with current password verification.
Security:
Passwords must be hashed using a strong algorithm (e.g., bcrypt).
Implement account lockout after multiple failed login attempts.
API Endpoints:
POST /register
POST /login
POST /forgot-password
POST /reset-password
GET /profile
PUT /profile
Non-Functional Requirements:

Performance: Authentication processes should complete within 2 seconds.
Scalability: Support up to 10,000 concurrent users.
Compliance: Adhere to GDPR for data protection.
2. E-Commerce Shopping Cart
Overview:
Create a shopping cart feature for an e-commerce platform that allows users to add, remove, and manage products before purchase.

Requirements:

Add to Cart:
Users can add products to the cart from product listings and detail pages.
Display product name, price, quantity, and subtotal in the cart.
Remove from Cart:
Users can remove individual products or clear the entire cart.
Update Quantity:
Users can adjust the quantity of each product in the cart.
Validate stock availability before updating.
Cart Persistence:
Cart contents should persist across user sessions using cookies or user accounts.
Price Calculation:
Automatically calculate total price, including taxes and shipping.
Checkout Integration:
Seamlessly integrate with the checkout process.
Non-Functional Requirements:

Usability: Intuitive UI/UX for managing cart items.
Performance: Cart operations should respond within 1 second.
Reliability: Ensure cart data consistency across different devices and sessions.
3. Inventory Management System
Overview:
Develop an inventory management system to track product stock levels, manage suppliers, and handle reorder processes.

Requirements:

Product Management:
Add, update, and delete products with details like SKU, name, description, and price.
Stock Tracking:
Monitor stock levels in real-time.
Set minimum stock thresholds for automatic reorder alerts.
Supplier Management:
Manage supplier information and contact details.
Associate products with respective suppliers.
Reorder Process:
Generate purchase orders when stock falls below thresholds.
Track order status and receive inventory updates upon delivery.
Reporting:
Generate reports on stock levels, sales trends, and reorder history.
Non-Functional Requirements:

Scalability: Handle inventory data for up to 100,000 products.
Security: Restrict access based on user roles (e.g., admin, manager).
Integration: Compatible with existing ERP and accounting systems.
    `,
    testCaseTitle: `Verify that a user can successfully reset their password using the email link`
};

async function generateTestDescription() {
    try {
        const response = await fetch('http://localhost:23500/ai/test-description/generate', {
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

        // Write the analysis to a Markdown file
        await fs.writeFile('test-description-response.md', dataToWrite);
        console.log('Test description successfully saved to test-description-response.md');

    } catch (error) {
        console.error('Error:', error);
    }
}

generateTestDescription();
