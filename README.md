# FitBuddy 🏋️‍♂️🤖 – AI Fitness & Diet Plan Generator

FitBuddy is a **full-stack AI-powered web application** that generates personalized **fitness routines and diet plans** using **Google Gemini AI** based on user biometrics, goals, and available equipment.

The application takes inputs like **age, height, weight, fitness goal, workout frequency, and diet preference**, then uses AI to produce a **structured weekly workout routine and nutrition recommendations**.

---

# ✨ Features

### AI Generated Fitness Plans

* Uses **Google Gemini AI**
* Generates **weekly workout routines**
* Suggests **rest days**
* Provides **diet recommendations**

### Structured JSON Output

The AI returns **clean structured JSON** so the frontend can easily parse and display the plan.

### Modern SaaS UI

Built with:

* React
* TailwindCSS
* Lucide Icons

Features:

* Responsive design
* Dark mode UI
* Clean card-based layout

### Export Options

Users can:

* Copy the generated plan
* Download the plan as `.json`

### Strong Validation

* **TypeScript** for type safety
* **Zod** for runtime validation
* Validates both frontend and backend data

### Secure Backend

Backend uses security best practices:

* Helmet (security headers)
* CORS protection
* Rate limiting
* Winston logging

---

# 🛠️ Tech Stack

## Frontend

* React 18 (Vite)
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* TanStack Query (React Query)
* Axios

## Backend

* Node.js
* Express.js
* TypeScript
* Google Generative AI SDK (`@google/generative-ai`)
* Zod validation
* Winston logger
* Helmet
* CORS
* Express Rate Limit

## Shared Code

* TypeScript interfaces
* Zod schemas

---

# 📂 Project Structure

```
FitBuddy/
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── FitnessForm.tsx
│   │   │   └── PlanCard.tsx
│   │   ├── lib
│   │   │   └── api.ts
│   │   └── App.tsx
│   │
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server
│   ├── src
│   │   ├── controllers
│   │   │   └── planController.ts
│   │   ├── middlewares
│   │   │   └── errorHandler.ts
│   │   ├── services
│   │   │   └── geminiService.ts
│   │   ├── utils
│   │   │   └── logger.ts
│   │   └── server.ts
│   │
│   └── tsconfig.json
│
└── shared
    └── types
        └── index.ts
```

---

# 🚀 Getting Started

## Prerequisites

Install:

* Node.js **v18 or higher**
* Google Gemini API Key

Generate API key from **Google AI Studio**.

---

# Installation

Clone the repository:

```
git clone https://github.com/yourusername/FitBuddy.git
cd FitBuddy
```

Install shared dependency:

```
npm install zod
```

Install backend dependencies:

```
cd server
npm install
```

Install frontend dependencies:

```
cd ../client
npm install
```

---

# Environment Variables

### Backend `.env`

Create `.env` inside `server/`

```
PORT=5000
NODE_ENV=development

GEMINI_API_KEY=your_gemini_api_key_here

FRONTEND_URL=http://localhost:5173
```

⚠️ Never commit your API key to GitHub.

---

### Frontend `.env`

Create `.env` inside `client/`

```
VITE_API_URL=http://localhost:5000/api
```

---

# Running the Application

You need **two terminals**.

### Terminal 1 – Backend

```
cd server
npx ts-node src/server.ts
```

### Terminal 2 – Frontend

```
cd client
npm run dev
```

Open browser:

```
http://localhost:5173
```

---

# 📡 API Documentation

## POST `/api/generate-plan`

Generates a personalized fitness plan.

### Request Body

```json
{
  "age": 25,
  "gender": "Male",
  "height": 180,
  "weight": 75,
  "goal": "Gain Muscle",
  "level": "Intermediate",
  "daysPerWeek": 4,
  "equipment": "Dumbbells, Bench",
  "diet": "Non-Veg"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "weeklyRoutine": [],
    "restDaySuggestions": [],
    "dietRecommendations": [],
    "caloriesEstimate": 2800,
    "proteinIntake": 160
  }
}
```

---

# 🚀 Deployment

## Frontend Deployment

Deploy on:

* Vercel
* Netlify

Build command:

```
npm run build
```

Environment variable:

```
VITE_API_URL=https://your-backend-url/api
```

---

## Backend Deployment

Deploy on:

* Render
* Railway
* Heroku

Build command:

```
npx tsc
```

Start command:

```
node dist/server.js
```

Add environment variables:

```
GEMINI_API_KEY
FRONTEND_URL
```

---

# 🎯 Summary

FitBuddy is a **modern AI-powered fitness planner** combining:

* AI-powered workout generation
* Full-stack TypeScript architecture
* Secure backend APIs
* Clean React UI
* Exportable structured fitness plans

It demonstrates a **production-style full-stack AI SaaS application** suitable for portfolios, hackathons, and startup MVPs.
