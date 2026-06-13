import os
from pymongo import MongoClient

# 1. Connect to your LOCAL database
local_client = MongoClient("mongodb://localhost:27017")
local_db = local_client["cinemax"]
local_collection = local_db["movies"]

# 2. Connect to your CLOUD database
cloud_uri = "mongodb+srv://dimalkafernando33_db_user:pYIWX2cPhmLDS6Zq@cluster0.l8vopxs.mongodb.net/?appName=Cluster0"
cloud_client = MongoClient(cloud_uri)
cloud_db = cloud_client["cinemax"]
cloud_collection = cloud_db["movies"]

# 3. Copy the data
movies = list(local_collection.find())
print(f"Found {len(movies)} movies in local database.")

if len(movies) > 0:
    # Clear existing cloud data just in case
    cloud_collection.delete_many({})
    
    # Insert local data into cloud database
    cloud_collection.insert_many(movies)
    print("Successfully copied all movies to the cloud database!")
else:
    print("No movies found in the local database to copy.")
