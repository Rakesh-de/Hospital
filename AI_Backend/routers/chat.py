from fastapi import APIRouter
from pydantic import BaseModel
from bson import ObjectId

from chat.chat_agent import (
    chat_with_ai,
    chat_with_report
)

from chat.chat_history import (
    save_chat,
    get_chat_history
)

from config.database import reports_collection

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):

    user_id: str | None = None

    question: str


# # ------------------------
# # General AI Chat
# # ------------------------

# @router.post("/")
# async def ask_ai(request: ChatRequest):
#     print(request)
#     answer = await chat_with_ai(
#         request.question
#     )

#     if request.user_id:

#         await save_chat(
#             request.user_id,
#             request.question,
#             answer
#         )

#     return {
#         "success": True,
#         "answer": answer
#     }


# # ------------------------
# # Report Based Chat
# # ------------------------

# @router.post("/{report_id}")
# async def ask_report_ai(
#     report_id: str,
#     request: ChatRequest
# ):

#     report = await reports_collection.find_one(
#         {
#             "_id": ObjectId(report_id)
#         }
#     )

#     if report is None:

#         return {
#             "success": False,
#             "message": "Report not found"
#         }

#     answer = await chat_with_report(
#         report,
#         request.question
#     )

#     return {
#         "success": True,
#         "answer": answer
#     }


@router.get("/history/{user_id}")
async def history(user_id: str):

    chats = await get_chat_history(user_id)

    return {
        "success": True,
        "history": chats
    }



@router.post("/")
async def ask_ai(request: ChatRequest):
    try:
        history = []
        if request.user_id:
            history = await get_chat_history(request.user_id)

        answer = await chat_with_ai(request.question, history)

        if request.user_id:
            await save_chat(request.user_id, request.question, answer)

        return {"success": True, "answer": answer}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"success": False, "error": str(e)}