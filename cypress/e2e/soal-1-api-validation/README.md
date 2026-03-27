# 🧪 API Validation Test – One Piece Characters

This project contains automated API tests using Cypress to validate data integrity and business rules for the following endpoint:

**GET** `https://api.api-onepiece.com/v2/characters/en`

---

## 📌 Objective

The goal of this test is to validate that the API response meets specific business requirements and to identify any inconsistencies in the data.

---

## 🎥 Demo

📺 **Test Execution Recording:**

👉 **[Watch Test Execution Video](https://drive.google.com/file/d/1Ew-AeHj8jRlXNnUO_soZ65n5RLH-HQSA/view?usp=drive_link)**
---

## ✅ Test Cases

### 1. Status Code Validation

* The API must return **HTTP 200**
* If not, the test fails

---

### 2. Unique Character ID

* Each character must have a **unique `id`**
* Duplicate IDs will cause the test to fail

---

### 3. Gum-Gum Fruit Ownership

* The fruit **"Gum-Gum Fruit"** must belong exclusively to Monkey D. Luffy
* If any other character has this fruit → test fails

---

### 4. Crew Bounty Validation

* For each **crew (`crew.id`)**:

  * `total_prime` must equal the **sum of all `bounty` values** of characters in that crew
* If there is any mismatch → test fails

---

## ⚙️ Tech Stack

* Cypress – API testing framework
* JavaScript (ES6)

---

## 🚀 Setup & Installation

### 1. Clone repository

```bash
git clone <https://github.com/rayyan-paper/parkee-cypress/tree/main/cypress/e2e/soal-1-api-validation>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Cypress binary

```bash
npx cypress install
```

---

## ▶️ How to Run Tests

### Open Cypress GUI

```bash
npx cypress open
```

### Run via CLI (headless)

```bash
npx cypress run
```

---

## 🧠 Implementation Notes

### Data Normalization

* `bounty` and `total_prime` are returned as **strings with dot separators**
* These values are converted into integers before validation

Example:

```js
"3.000.000.000" → 3000000000
```

---

### Handling Edge Cases

* Empty `bounty` values are treated as `0` for calculation purposes
* Non-numeric values (e.g., `"inconnu"`) are considered **invalid**
* Crews with invalid or missing `total_prime` are skipped to avoid false negatives

---

## 🚨 Findings & Anomalies

During testing, several data inconsistencies were identified:

* ❌ Mismatch between `total_prime` and aggregated bounty values
* ❌ Non-numeric values such as `"inconnu"` in numeric fields
* ❌ Missing or empty `bounty` values
* ❌ Inconsistent number formatting (e.g., `"67.0000.000"`)
* ❌ Crew metadata mismatch (declared member count vs actual entries)
* ❌ Aggregate value smaller than individual bounty (data integrity issue)

---

## 🎯 Key Insight

> The test results indicate that the API contains multiple data integrity issues.
> The validation logic works as expected and successfully identifies inconsistencies in the dataset.

---

## 📝 Conclusion

This test suite demonstrates how automated API testing can be used to:

* Validate business rules
* Detect data anomalies
* Ensure reliability of API responses

---

## 👨‍💻 Author

Rayyan Dzaki
