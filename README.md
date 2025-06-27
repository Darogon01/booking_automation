# 🤖⚙️ Booking Automation Test with Playwright

This project is an automated test challenge designed to validate key functionalities of the Booking.com website using **Playwright** and **TypeScript**.

---

## 📌 Objective

The goal of this challenge is to demonstrate automation skills by simulating a real-world scenario on [Booking.com](https://www.booking.com) and verifying that the UI behaves as expected.

---

## 📋 Task Overview

The test script performs the following steps:

1. Navigate to [https://www.booking.com](https://www.booking.com)
2. In the “Where are you going?” input, type **Coruña**
3. Set the **Check-in date** to the **1st day of the next calendar month**
4. Set the **Check-out date** to the **7th day of the same month**
5. Click the **Search** button
6. Log the **total number of properties found** in the console
7. Validate that the **Check-in date** displayed on the results page is the **1st of next month**
8. Validate that the **Check-out date** is the **7th of next month**
9. Print the **names of all the properties listed on the first page of results**

---


## 📁 Tech Stack & Dependencies

- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Steps to Install and Run the Tests


### 🧬  1. Clone the repository

```bash
git clone https://github.com/your-username/booking-automation.git
cd booking-automation
```

### 📦 2. Install dependencies:

```bash
npm install
```

### ▶️ 3. Run the test

```bash
npx playwright test
```

### 📊 4. Show the report (optional)

```bash
npx playwright show-report
```



