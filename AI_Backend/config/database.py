from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

from motor.motor_asyncio import AsyncIOMotorClient

from config.settings import settings

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(settings.MONGO_URI)

db = client[settings.DATABASE_NAME]

reports_collection = db["reports"]