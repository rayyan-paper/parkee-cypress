# Cypress Test Automation – SauceDemo

## 📌 Overview
This project contains automated test cases for SauceDemo using Cypress.

Test coverage includes:
- Login Page
- Inventory Page
- Cart Page
- Checkout Flow (Step One, Step Two, Complete)

---

## 🧪 Testing Approach
The testing strategy includes:
- Positive Testing (valid scenarios)
- Negative Testing (invalid inputs & restrictions)
- Edge Case Testing (state & boundary conditions)
- Reusable functions for maintainability

---

## 🐞 Bug Report
Detailed bug findings are documented in the Excel file below:

👉 **[View Bug Report (Excel)](./bug-report.xlsx)**

The report includes:
- Steps to reproduce
- Expected vs Actual results
- Severity & Priority classification

---

## 🎥 Test Execution Video
A demonstration of the automated test execution can be accessed here:

👉 **[Watch Test Execution Video](./test-execution.mp4)**

---

## 🔍 Key Findings Summary

### 1. Checkout Without Items
Users are able to proceed to checkout even when the cart is empty, indicating a missing validation in the purchase flow.

---

### 2. Missing Empty Cart Feedback
The cart page does not provide any message when no items are present, leading to poor user experience.

---

### 3. Non-functional Footer Links
“Terms of Service” and “Privacy Policy” links are not clickable and do not perform any action.

---

### 4. Weak Input Validation
Checkout form accepts invalid inputs such as spaces, emojis, and minimal characters without validation.

---

### 5. No Login Attempt Limitation
The system does not implement any restriction or lock mechanism after multiple failed login attempts.

---

## 🚀 Conclusion
While the core functionality of the system works as expected, several improvements can be made in:
- Input validation
- User experience feedback
- Security handling

---

## 🛠 Tech Stack
- Cypress
- JavaScript