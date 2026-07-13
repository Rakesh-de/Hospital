def risk_agent(state):

    confidence = state["diagnosis"]["confidence"]

    risk = state["diagnosis"]["risk"]

    health = state["diagnosis"]["health_score"]

    emergency = state["diagnosis"]["emergency"]

    score = {

        "confidence": confidence,

        "risk": risk,

        "health_score": health,

        "emergency": emergency

    }

    state["risk"] = score

    return state