from tree_parser.python_parser import parse_python
import json

code = """
def forward(input_data):
    results = []
    for i in range(len(input_data)):
        sample = input_data[i]
    return results
"""

result = parse_python(code)
print(json.dumps(result, indent=2))