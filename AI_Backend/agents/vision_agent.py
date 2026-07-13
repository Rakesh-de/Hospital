from PIL import Image

def vision_agent(state):

    image = Image.open(state["file"])

    state["image_info"] = {

        "width": image.width,

        "height": image.height,

        "format": image.format,

        "mode": image.mode

    }

    return state