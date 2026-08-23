import cv2
import numpy as np
import easyocr

reader = easyocr.Reader(["en"], gpu=False)


def preprocess(image_path):

    image = cv2.imread(image_path)

    if image is None:
        raise Exception("Image not found")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.fastNlMeansDenoising(gray)

    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        11,
    )

    return thresh


def extract_image_text(image_path):

    processed = preprocess(image_path)

    results = reader.readtext(
        processed,
        detail=1,
        paragraph=True
    )
    print("=" * 50)
    print("OCR Results:")
    print(results)
    print("=" * 50)  


    text = ""

    for item in results:

        print(item)

        if len(item) < 2:
            continue

        value = item[1]

        
        text += value + "\n"

    return text.strip()
    
    print("Extracted Text:")
    print(text)