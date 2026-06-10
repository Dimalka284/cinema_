from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import movies_collection
from pydantic import BaseModel
import os
import json
import httpx
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Clients ──
client            = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

# ── TMDB Genre map ──
GENRE_MAP = {
    "action":    28,
    "drama":     18,
    "horror":    27,
    "animation": 16,
    "sci-fi":    878,
    "thriller":  53,
    "comedy":    35,
    "romance":   10749,
}

# ── Models ──
class ChatRequest(BaseModel):
    message:     str
    movie_title: str | None = None

class ChatResponse(BaseModel):
    reply: str


# ════════════════════════════
#  CineBot system prompt
# ════════════════════════════

SYSTEM_PROMPT = """You are CineBot, the friendly AI movie assistant for CinemaX — a premium movie streaming platform.

Your personality:
- Enthusiastic about movies, TV shows, and all things cinema
- Knowledgeable about plot summaries, cast, directors, ratings, genres, awards, and recommendations
- Concise but engaging — keep replies under 150 words unless a longer answer is genuinely needed
- Use light markdown (bold, bullet points) to make answers scannable
- If asked about something unrelated to movies/shows/entertainment, politely redirect the conversation back to cinema topics

What you can help with:
- Movie recommendations based on genre, mood, or similar titles
- Plot summaries and spoiler-free overviews
- Cast and crew information
- Ratings, awards, box office performance
- "What should I watch tonight?" style questions
- Trivia and fun facts about films

Always stay in character as CineBot and keep the tone fun and cinematic."""


# ════════════════════════════
#  Health check
# ════════════════════════════

@app.get("/")
def home():
    return {"message": "CinemaX API Running"}


# ════════════════════════════
#  Movie routes (MongoDB)
# ════════════════════════════

@app.get("/api/movies")
def get_movies():
    movies = []
    for movie in movies_collection.find():
        movie["_id"] = str(movie["_id"])
        movies.append(movie)
    return movies


@app.get("/api/movies/{movie_id}")
def get_movie(movie_id: str):
    from bson import ObjectId
    movie = movies_collection.find_one({"_id": ObjectId(movie_id)})
    if movie:
        movie["_id"] = str(movie["_id"])
        return movie
    return {"error": "Movie not found"}


# ════════════════════════════
#  TMDB Category route
# ════════════════════════════

@app.get("/api/category/{genre_name}")
async def get_by_genre(genre_name: str, page: int = 1):
    genre_id = GENRE_MAP.get(genre_name.lower())

    if not genre_id:
        raise HTTPException(
            status_code=404,
            detail=f"Genre '{genre_name}' not found. Available: {list(GENRE_MAP.keys())}"
        )

    url = (
        "https://api.themoviedb.org/3/discover/movie"
        f"?api_key={TMDB_API_KEY}"
        f"&with_genres={genre_id}"
        f"&sort_by=popularity.desc"
        f"&language=en-US"
        f"&page={page}"
    )

    async with httpx.AsyncClient() as http:
        response = await http.get(url)

    # Debugging (you can remove these later)
    print("TMDB URL:", url)
    print("TMDB Status:", response.status_code)

    if response.status_code != 200:
        print("TMDB Error:", response.text)

        raise HTTPException(
            status_code=response.status_code,
            detail=f"TMDB Error: {response.text}"
        )

    data = response.json()

    movies = []
    for m in data.get("results", []):
        movies.append({
            "id": m.get("id"),
            "title": m.get("title", ""),
            "overview": m.get("overview", ""),
            "rating": m.get("vote_average", 0),
            "release_year": (
                m.get("release_date", "")[:4]
                if m.get("release_date")
                else "N/A"
            ),
            "image_url": (
                f"https://image.tmdb.org/t/p/w500{m['poster_path']}"
                if m.get("poster_path")
                else ""
            ),
            "backdrop_url": (
                f"https://image.tmdb.org/t/p/w1280{m['backdrop_path']}"
                if m.get("backdrop_path")
                else ""
            ),
        })

    return {
        "genre": genre_name,
        "page": data.get("page", 1),
        "total_pages": data.get("total_pages", 1),
        "total_results": data.get("total_results", 0),
        "movies": movies,
    }


# ════════════════════════════
#  AI — CineBot chat
# ════════════════════════════

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        user_msg = req.message
        if req.movie_title:
            user_msg = f"[Context: the user is currently viewing the movie '{req.movie_title}']\n\n{req.message}"

        full_prompt = f"{SYSTEM_PROMPT}\n\nUser: {user_msg}\n\nCineBot:"

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
        )

        reply = response.text.strip() if response.text else "Sorry, I couldn't think of a response right now. Try asking me something else!"
        return ChatResponse(reply=reply)

    except Exception as e:
        err_str = str(e)
        if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
            raise HTTPException(
                status_code=429,
                detail="Gemini API quota exhausted. Please wait a few minutes and try again."
            )
        raise HTTPException(status_code=500, detail=f"AI error: {err_str}")