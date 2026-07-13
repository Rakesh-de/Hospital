from agents.diagnosis_agent import diagnosis_agent

state={

"text":"""

Hemoglobin : 7.5

RBC Low

Platelet Normal

Patient weakness

""",

"context":"Iron deficiency causes low Hb."

}

state=diagnosis_agent(state)

print(state["diagnosis"])