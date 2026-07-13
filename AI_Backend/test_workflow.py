from graph.workflow import workflow

state = {

    "file": "sample_reports/blood_test.pdf"

}

result = workflow.invoke(state)

print(result)