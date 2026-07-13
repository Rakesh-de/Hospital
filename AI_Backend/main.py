from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.chat import router as chat_router
from routers.report import router as report_router

app = FastAPI(
    title="MediMind AI",
    version="1.0.0"
)

# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Routers ----------------

app.include_router(chat_router)

app.include_router(report_router)

# ---------------- Home ----------------

@app.get("/")
async def home():

    return {
        "message": "Backend Running"
    }