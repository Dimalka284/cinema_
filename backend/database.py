import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://dimalkafernando33_db_user:pYIWX2cPhmLDS6Zq@cluster0.l8vopxs.mongodb.net/?appName=Cluster0")

client = MongoClient(MONGO_URI)

db = client["cinemax"]

movies_collection = db["movies"]


