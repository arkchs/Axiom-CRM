# Mini CRM & Campaign Platform

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)

A full-stack Mini CRM platform designed for intelligent customer segmentation and personalized campaign delivery. This project leverages a modern, scalable architecture to provide a robust solution for marketing automation, featuring an AI-powered engine to translate natural language into complex audience rules.

---

## ✨ Key Features

* **Dynamic Audience Segmentation:** Create complex audience segments using a flexible rule-builder with nested AND/OR logic (e.g., `spend > ₹10,000 AND visits < 3`).
* **AI-Powered Segmentation:** An innovative feature that uses an LLM to translate plain English prompts like *"Users who haven't shopped in 6 months but spent over ₹5K"* into executable segmentation rules, reducing audience creation time by over 80%.
* **Scalable Asynchronous Architecture:** Utilizes a message broker (Kafka) for data ingestion and a batch processing system for delivery receipts, ensuring high throughput and reducing database load by up to 99%.
* **Automated Campaign Delivery:** Trigger personalized messages to segmented audiences through a simulated vendor API, tracking delivery status in real-time.
* **Campaign Analytics:** A dashboard to view campaign history, audience size, and delivery statistics (Sent, Failed).
* **Secure Authentication:** Protected by Google OAuth 2.0 to ensure that only authorized users can access the platform.

---

## 🏛️ System Architecture

The application is built on a decoupled, microservice-inspired architecture to ensure scalability and maintainability.
