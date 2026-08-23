import os
import sys
import traceback
import tempfile
import requests

from fastapi import APIRouter
from pydantic import BaseModel

from services.ocr_service import extract_image_text
from services.pdf_service import extract_pdf_text

from graph.workflow import graph

router = APIRouter(
    prefix="/report",
    tags=["AI Bridge"]
)


class AnalyzeRequest(BaseModel):
    reportId: str
    fileUrl: str
    fileType: str


@router.post("/analyze")
async def analyze(request: AnalyzeRequest):

    try:

        # -----------------------------
        # Download File
        # -----------------------------

        response = requests.get(
            request.fileUrl,
            timeout=60
        )

        response.raise_for_status()

        suffix = ".pdf" if request.fileType == "pdf" else ".jpg"

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as tmp:

            tmp.write(response.content)
            tmp_path = tmp.name

        try:

            if request.fileType == "pdf":
                extracted_text = extract_pdf_text(tmp_path)
            else:
                extracted_text = extract_image_text(tmp_path)

        finally:
            pass

        if not extracted_text.strip():
            extracted_text = "No readable text found."

        # -----------------------------
        # LangGraph State
        # -----------------------------

        state = {
            "file": request.fileUrl,
            "image_path": tmp_path if request.fileType == "image" else None,

            "vision": {},
            "text": extracted_text,
            "prescription": {},
            "summary": ""
        }

        print("GRAPH START")

        result = graph.invoke(state)

        print("GRAPH END")
        print(result)

        if os.path.exists(tmp_path):
            os.remove(tmp_path)

        print("\n========= OCR TEXT =========")
        print(extracted_text)
        print("============================")

        # -----------------------------
        # Response
        # -----------------------------

        return {
            "success": True,

            "extractedText": result.get(
                "text",
                extracted_text
            ),

            "vision": result.get(
                "vision",
                {}
            ),

            "prescription": result.get(
                "prescription",
                {}
            ),

            "summary": result.get(
                "summary",
                ""
            )
        }

    except Exception as e:

        traceback.print_exc(file=sys.stdout)

        return {
            "success": False,
            "message": str(e)
        }