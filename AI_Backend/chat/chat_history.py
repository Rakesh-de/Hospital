from config.database import db

from datetime import datetime


collection = db.chat_history


async def save_chat(

    user_id,

    question,

    answer

):

    await collection.insert_one(

        {

            "user_id": user_id,

            "question": question,

            "answer": answer,

            "created_at": datetime.utcnow()

        }

    )


async def get_chat_history(user_id):

    chats = []

    cursor = collection.find(

        {

            "user_id": user_id

        }

    ).sort(

        "created_at",

        -1

    )

    async for chat in cursor:

        chat["_id"] = str(chat["_id"])

        chats.append(chat)

    return chats