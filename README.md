# 🍽️ FoodBot AI

FoodBot AI is a smart lead management and chatbot-integrated platform built using the MERN stack with Firebase authentication and AI agent automation. This project includes:

- 🔐 Authentication (login/signup)
- 🤖 AI agent (lead extractor)
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
│   └── index.js
├── frontend/
│   ├── src/
│   └── index.html
└── .gitignore
```

---

## 🚀 Setup Instructions

### 🔧 Prerequisites

- Node.js (v16+)
- Firebase project with Firestore enabled
- Google Service Account (for Admin SDK access)

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

Create a `.env` file in both backend and frontend (if required).  
You can store sensitive values like:

```env
# Example for backend .env
PORT=5000
JWT_SECRET=your_jwt_secret
```

---

## 📌 Notes

- Be sure to **never commit** your `.env` or `serviceAccount.json` files.
- GitHub push protection is enabled to prevent leaking secrets.
- This project is now safe to share, collaborate, and host publicly.

---

## 🤝 Contributions

Feel free to fork this repo, raise issues, or suggest improvements.

---

## 📄 License

MIT License
