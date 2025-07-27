# 🍽️ FoodBot AI

FoodBot AI is a smart lead management and chatbot-integrated platform built using the MERN stack with Firebase authentication and AI agent automation. This project includes:

- 🔐 Authentication (login/signup)
- 🤖 AI agent (lead extractor using Gemini API)
- 📥 Lead storage with Firebase/Firestore
- 📡 Modular Command Processor integration
- ⚛️ React frontend + Node.js/Express backend

---

## 📁 Project Structure

```
FoodBotAi/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── schema/
│   └── index.js
├── frontend/
│   ├── src/
│   └── index.html
└── .gitignore
```

---

## 🚀 Setup Instructions

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16+ recommended)
- Firebase project with Firestore enabled
- Google Service Account (Admin SDK JSON)
- Gemini API key (or OpenAI if applicable)

---

### 📦 Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 🔐 Firebase Configuration (IMPORTANT)

Create a file at:

```
backend/config/serviceAccount.json
```

This file should contain your Firebase service account credentials.  
**DO NOT share this file or push it to GitHub.**

You can use the sample below as a reference:

#### 👉 `serviceAccount.sample.json`

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@your-project.iam.gserviceaccount.com"
}
```

---

## 🌐 Running the Project

### Start Backend

```bash
cd backend
node index.js
```

### Start Frontend (Vite)

```bash
cd frontend
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in both backend and frontend if needed.

#### 👉 `backend/.env.sample`

```env
PORT=5000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Make a copy and rename it:

```bash
cp .env.sample .env
```

---

## 🔥 Firestore Setup

Ensure the following in your Firebase Console:

- Firestore is enabled
- Required collections like `leads`, `users` exist (or auto-create)

---

## 🧠 AI Agent Setup

This project uses Gemini API to parse messages and extract leads.

- Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Add it to your `.env` as `GEMINI_API_KEY=your_key_here`

---

## 📌 Notes

- Never commit `.env` or `serviceAccount.json`
- Use `.gitignore` to keep secrets safe
- GitHub secret scanning is enabled for protection

---

## 🤝 Contributions

Feel free to fork this repo, raise issues, or suggest improvements.

---

## 📄 License

MIT License

