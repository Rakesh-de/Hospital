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


    if extracted_text.strip() == "":

        extracted_text = "No readable text found."

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

    # result = graph.invoke(

    #     {
    #         "report": report["extracted_text"]
    #     }

    # )

    result = graph.invoke({

    "file": report["filepath"],

    "image_path": report["filepath"],

    "text": "",

    "context": "",

    "vision": {
        "report_type": "",
        "ocr_text": "",
        "doctor_notes": "",
        "medicines": []
    },

    "lab_values": {},

    "lab_analysis": {},

    "clinical": {},

    "diagnosis": {},

    "prescription": {},

    "drug_interactions": {},

    "recommendation": {},

    "medicine_schedule": [],

    "comparison": {},

    "summary": "",

    "emergency": {}

   })

    print("\n================ GRAPH RESULT ================")
 
    print("VISION")
    print(result.get("vision"))

    print("TEXT")
    print(result.get("text"))

    print("DIAGNOSIS")
    print(result.get("diagnosis"))

    print("=============================================\n")




    await reports_collection.update_one(

        {
            "_id": ObjectId(report_id)
        },

        {

            # "$set": {

            #     "summary": result["summary"],

            #     "diagnosis": result["diagnosis"],

            #     "risk": result["risk"],

            #     "recommendation": result["recommendation"],

            #     "medical_context": result["medical_context"]

            # }

            "$set": {

    # Existing

    "summary": result.get("summary"),

    "diagnosis": result.get("diagnosis"),

    "recommendation": result.get("recommendation"),

    "medical_context": result.get("context"),

    "medicine_schedule": result.get("medicine_schedule"),

    "emergency": result.get("emergency"),

    # Vision

    "vision": result.get("vision"),

    # OCR

    "extracted_text": result.get("text"),

    # Lab

    "lab_analysis": result.get("lab_analysis"),

    "lab_values": result.get("lab_values"),

    # Clinical Decision

    "clinical": result.get("clinical"),

    # Drug Interaction

    "drug_interactions": result.get("drug_interactions"),

    # Prescription

    "prescription": result.get("prescription"),

    # Comparison

    "comparison": result.get("comparison"),

    # Diagnosis Details

    "health_score": result.get(
        "diagnosis",
        {}
    ).get(
        "health_score",
        0
    ),

    "overall_health": result.get(
        "diagnosis",
        {}
    ).get(
        "overall_health",
        ""
    ),

    "risk_level": result.get(
        "diagnosis",
        {}
    ).get(
        "risk_level",
        ""
    ),

    "possible_conditions": result.get(
        "diagnosis",
        {}
    ).get(
        "possible_conditions",
        []
    ),

    "abnormal_values": result.get(
        "diagnosis",
        {}
    ).get(
        "abnormal_values",
        []
    ),

    "follow_up_tests": result.get(
        "diagnosis",
        {}
    ).get(
        "follow_up_tests",
        []
    ),

    "doctor_notes": result.get(
        "diagnosis",
        {}
    ).get(
        "doctor_notes",
        ""
    ),

    "medicines": result.get(
        "diagnosis",
        {}
    ).get(
        "medicines",
        []
    )

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