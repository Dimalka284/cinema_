# 🎬 CinemaX

A full-stack movie discovery platform built with **React + Vite** on the frontend and **FastAPI + MongoDB** on the backend. Browse movies by genre, view detailed info, explore the community, and chat with an AI-powered movie assistant — **CineBot**.

---

## ✨ Features

- 🏠 **Home Page** — Netflix-style horizontal movie rows powered by the OMDB API, organized by genre and franchise (Action, Sci-Fi, Horror, Animated, Marvel, DC, and more)
- 🎥 **Movie Details** — Dedicated page for each movie with full metadata
- 💬 **CineBot (AI Chat)** — Floating AI assistant powered by Google Gemini that answers movie-related questions, gives recommendations, and shares trivia
- 👥 **Community** — Community screen for movie discussions
- ℹ️ **About** — About page
- 🌐 **Responsive Design** — Dark-themed UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| OMDB API | Movie data (posters, ratings, etc.) |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| MongoDB + PyMongo | Movie database |
| Google Gemini API | AI chat (CineBot) |
| python-dotenv | Environment variable management |

---

## 📁 Project Structure

```
cinema_/
├── backend/                  # FastAPI backend
│   ├── main.py               # API routes (movies + AI chat)
│   ├── database.py           # MongoDB connection
│   ├── .env                  # 🔒 Secret keys (not in Git)
│   └── .env.example          # Template for env variables
│
└── cinemaX/                  # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── MovieRow.jsx
    │   │   ├── AIChatBot.jsx   # CineBot floating chat
    │   │   └── Footer.jsx
    │   ├── screen/
    │   │   ├── home.jsx
    │   │   ├── moviedetails.jsx
    │   │   ├── community.jsx
    │   │   └── about.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- MongoDB (running locally on port 27017)
- [OMDB API Key](https://www.omdbapi.com/apikey.aspx)
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Dimalka284/cinema_.git
cd cinema_
```

---

### 2. Backend Setup

```bash
cd backend
```

Create a `.env` file (use `.env.example` as a template):

```bash
cp .env.example .env
```

Add your API key to `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Install Python dependencies:

```bash
pip install fastapi uvicorn pymongo python-dotenv google-genai
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

---

### 3. Frontend Setup

```bash
cd cinemaX
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GEMINI_API_KEY` | `backend/.env` | Google Gemini API key for CineBot |

> ⚠️ Never commit your `.env` file. It is already excluded via `.gitignore`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/movies` | Get all movies from MongoDB |
| `GET` | `/api/movies/{id}` | Get a single movie by ID |
| `POST` | `/api/chat` | Send a message to CineBot (Gemini AI) |

### Chat Request Format
```json
{
  "message": "What are some good sci-fi movies?",
  "movie_title": "Interstellar"
}
```

---

## 🤖 CineBot

CineBot is a floating AI movie assistant available on every page. It is powered by **Google Gemini 2.5 Flash** and can:

- Recommend movies by genre or mood
- Provide plot summaries and trivia
- Share cast and crew information
- Answer "What should I watch tonight?" style questions

---

## 📸 Screenshots

> _Add screenshots of the app here_

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by [Dimalka284](https://github.com/Dimalka284)
