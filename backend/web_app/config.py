import os

import pymongo


class Config:
    MONGO_HOST = os.environ.get("MONGO_HOST", "localhost")
    MONGO_PORT = int(os.environ.get("MONGO_PORT", "27017"))
    MONGO_DATABASE_NAME = os.environ.get("MONGO_DATABASE_NAME", "gpn")


def connect_wells_database():
    client = pymongo.MongoClient(
        host=Config.MONGO_HOST,
        port=Config.MONGO_PORT
    )
    database = client.get_database(Config.MONGO_DATABASE_NAME)
    return database

