import os

from fastapi import APIRouter, UploadFile, File

from services.file_service import save_uploaded_file
from services.pdf_service import extract_pdf_text
from services.ocr_service import extract_image_text
from bson import ObjectId

from fastapi.responses import FileResponse
from graph.workflow import graph


from datetime import datetime

from config.database import reports_collection
router = APIRouter()



@router.post("/upload")
async def upload_report(file: UploadFile = File(...)):

    filepath = save_uploaded_file(file)

    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".pdf":
        extracted_text = extract_pdf_text(filepath)
    else:
        extracted_text = extract_image_text(filepath)

    report = {

        "filename": file.filename,

        "filepath": filepath,

        "extracted_text": extracted_text,

        "summary": "",

        "uploaded_at": str(datetime.now())

    }

    result = await reports_collection.insert_one(report)

    report["_id"] = str(result.inserted_id)

    return {

        "success": True,

        "report": report

    }

@router.get("/")
async def get_reports():

    reports = []

    async for report in reports_collection.find():

        report["_id"] = str(report["_id"])

        reports.append(report)

    return {

        "success": True,

        "reports": reports

    }


@router.get("/{report_id}")
async def get_report(report_id: str):

    report = await reports_collection.find_one(

        {"_id": ObjectId(report_id)}

    )

    if not report:

        return {

            "success": False,

            "message": "Report not found"

        }

    report["_id"] = str(report["_id"])

    return {

        "success": True,

        "report": report

    }

@router.post("/{report_id}/analyze")
async def analyze_report(report_id: str):

    report = await reports_collection.find_one(
        {
            "_id": ObjectId(report_id)
        }
    )

    if not report:

        return {
            "success": False,
            "message": "Report not found"
        }

    result = graph.invoke(

        {
            "report": report["extracted_text"]
        }

    )

    await reports_collection.update_one(

        {
            "_id": ObjectId(report_id)
        },

        {

            "$set": {

                "summary": result["summary"],

                "diagnosis": result["diagnosis"],

                "risk": result["risk"],

                "recommendation": result["recommendation"],

                "medical_context": result["medical_context"]

            }

        }

    )

    return {

        "success": True,

        "analysis": result

    }

@router.delete("/{report_id}")
async def delete_report(report_id: str):

    result = await reports_collection.delete_one(

        {
            "_id": ObjectId(report_id)
        }

    )

    if result.deleted_count == 0:

        return {

            "success": False,

            "message": "Report not found"

        }

    return {

        "success": True,

        "message": "Report deleted successfully"

    }

@router.get("/{report_id}/download")
async def download_report(report_id: str):

    report = await reports_collection.find_one(

        {
            "_id": ObjectId(report_id)
        }

    )

    if not report:

        return {

            "success": False,

            "message": "Report not found"

        }

    return FileResponse(

        path=report["filepath"],

        filename=report["filename"],

        media_type="application/pdf"

    )