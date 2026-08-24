# from services.ocr_service import extract_image_text

# def ocr_agent(state):

#     print(">>> OCR Agent")

#     # Vision OCR already available
#     vision = state.get("vision", {})

#     if vision.get("ocr_text"):

#         print("Using Vision OCR")

#         state["text"] = vision["ocr_text"]

#         return state

#     print("Using EasyOCR")

#     path = state["image_path"]

#     state["text"] = extract_image_text(path)

#     return state


def ocr_agent(state):
    print(">>> OCR Agent Running")

    vision = state.get("vision", {})
    ocr_text = vision.get("ocr_text", "").strip()

    # 1. Primary: Use Vision OCR output if available
    if ocr_text:
        print("Using Vision OCR Text")
        state["text"] = ocr_text
        return state

    # 2. Fallback: Only import & call EasyOCR if Vision OCR fails
    print("Vision OCR empty, falling back to EasyOCR")
    path = state.get("image_path")
    
    if path:
        from services.ocr_service import extract_image_text
        state["text"] = extract_image_text(path)
    else:
        state["text"] = ""

    return state