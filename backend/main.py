from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import movies_collection
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()  # Load variables from .env file

app = FastAPI()

# CORS so your React frontend can call this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ── Gemini client ──
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# ── Request / Response models ──
class ChatRequest(BaseModel):
    message: str
    movie_title: str | None = None   # optional: pass current movie for context

class ChatResponse(BaseModel):
    reply: str


# ════════════════════════════
#  Existing routes
# ════════════════════════════

@app.get("/")
def home():
    return {"message": "CinemaX API Running"}


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
#  AI Chat route
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

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        # Build the user message, injecting movie context if provided
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
                detail="Gemini API quota exhausted. Please wait a few minutes and try again, or upgrade your API plan."
            )
        raise HTTPException(status_code=500, detail=f"AI error: {err_str}")
