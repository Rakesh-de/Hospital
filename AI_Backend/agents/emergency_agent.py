def emergency_agent(state):

    diagnosis = state["diagnosis"]

    if diagnosis["risk"]=="High":

        state["emergency"]={

            "priority":"RED",

            "ambulance":True,

            "doctor":"Immediately Consult"

        }

    else:

        state["emergency"]={

            "priority":"GREEN",

            "ambulance":False,

            "doctor":"Routine Check"

        }

    return state