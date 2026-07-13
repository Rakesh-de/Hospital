from services.ocr_service import extract_image_text


def ocr_agent(state):

    image_path = state["image_path"]

    text = extract_image_text(image_path)

    state["ocr_text"] = text

    return state