from services.ocr_service import extract_image_text

def ocr_agent(state):

    print(">>> OCR Agent")

    # Vision OCR already available
    vision = state.get("vision", {})

    if vision.get("ocr_text"):

        print("Using Vision OCR")

        state["text"] = vision["ocr_text"]

        return state

    print("Using EasyOCR")

    path = state["image_path"]

    state["text"] = extract_image_text(path)

    return state