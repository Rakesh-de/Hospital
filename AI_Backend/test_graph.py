from graph.workflow import graph

result = graph.invoke(

    {

        "report": """

Hemoglobin : 11.5

WBC : 14000

Platelets : 220000

Blood Sugar : 190

"""

    }

)

print(result["summary"])

print("rakesh prajapat")