from config.model import llm
from chat.prompts import medical_prompt

chat_chain = medical_prompt | llm


# -----------------------------
# General AI Chat
# -----------------------------
async def chat_with_ai(question):

    response = chat_chain.invoke({
        "context": "",
        "question": question
    })

    return response.content


async def chat_with_ai(question, history=None):
    history_text = ""
    if history:
        for h in history[-6:]:  # last 3 exchanges
            history_text += f"User: {h['question']}\nAI: {h['answer']}\n"

    response = await chat_chain.ainvoke({
        "context": history_text,
        "question": question
    })
    return response.content

# -----------------------------
# Report AI Chat
# -----------------------------
async def chat_with_report(report, question):

    context = report.get("extractedText", "")

    if not context:
        context = report.get("aiSummary", "")

    response = chat_chain.invoke({
        "context": context,
        "question": question
    })

    return response.content