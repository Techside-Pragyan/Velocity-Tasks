# Velocity Tasks 🚀

A modern, AI-enhanced full-stack Task Management application built with React, Node.js, and MongoDB.

## ✨ Features

- **Auth**: Secure JWT-based authentication with animated Login/Signup.
- **Task Management**: Full CRUD operations with priority levels and categories.
- **Productivity Insights**: Visual analytics using Recharts.
- **Calendar View**: Interactive monthly calendar to track deadlines.
- **Smart AI Suggestions**: Context-aware task recommendations and productivity tips.
- **Premium UI**: Dark-mode first design with glassmorphism, smooth animations, and responsive layouts.

## 🛠️ Tech Stack

- **Frontend**: Vite, React, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt.
- **Styling**: Modern Vanilla CSS (Design Systems & Tokens).

## 🚀 Getting Started

### Prerequisites

- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### Backend Setup

1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Configure `.env` with your `MONGO_URI` and `JWT_SECRET`.
4. Start dev server: `npm run dev`

### Frontend Setup

1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## 📂 Project Structure

```text
├── backend/
│   ├── controllers/      # Logic for Auth and Tasks
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── server.js         # Entry point
└── frontend/
    ├── src/
    │   ├── components/   # UI logic (Sidebar, Cards, Modals)
    │   ├── context/      # Auth state
    │   ├── pages/        # Views (Dashboard, Analytics, Calendar)
    │   └── styles/       # Design system
```

## 📸 Screenshots

*(Add screenshots here after deployment)*