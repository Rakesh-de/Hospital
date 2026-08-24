import os

from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:

    # ==========================
    # FastAPI
    # ==========================
    APP_NAME = "MediMind AI Backend"

    APP_VERSION = "1.0.0"

    APP_HOST = os.getenv("APP_HOST", "0.0.0.0")

    APP_PORT = int(os.getenv("APP_PORT", 8000))


    # ==========================
    # MongoDB
    # ==========================
    MONGO_URI = os.getenv("MONGO_URI")

    DATABASE_NAME = os.getenv("DATABASE_NAME")

    COLLECTION_NAME = os.getenv("COLLECTION_NAME")


    # ==========================
    # Groq LLM
    # ==========================
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    MODEL_NAME = os.getenv(
        "MODEL_NAME",
        "openai/gpt-oss-120b",
    )


    # ==========================
    # Vector Database
    # ==========================
    VECTOR_DB = os.getenv(
        "VECTOR_DB",
        "vector_store"
    )


    # ==========================
    # Upload Folder
    # ==========================
    UPLOAD_FOLDER = os.getenv(
        "UPLOAD_FOLDER",
        "uploads"
    )


# ======================
# JWT
# ======================

JWT_SECRET = os.getenv("JWT_SECRET")

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)

JWT_EXPIRE = os.getenv(
    "JWT_EXPIRE",
    1440
)

settings = Settings()