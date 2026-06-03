import tree_sitter_python as tspython
from tree_sitter import Language, Parser

PY_LANGUAGE = Language(tspython.language())
parser = Parser(PY_LANGUAGE)

def parse_python(source_code: str) -> dict:
    source_bytes = bytes(source_code, "utf8")
    tree = parser.parse(source_bytes)
    root = tree.root_node
    return {
        "variables": extract_variables(root, source_bytes),
        "functions": extract_functions(root, source_bytes),
        "loops":     extract_loops(root, source_bytes),
        "calls":     extract_calls(root, source_bytes),
    }

def node_text(node, source_bytes: bytes) -> str:
    return source_bytes[node.start_byte:node.end_byte].decode("utf8")

def extract_variables(root, source_bytes: bytes) -> list:
    results = []
    def walk(node):
        if node.type == "assignment":
            left = node.child_by_field_name("left")
            if left:
                results.append({
                    "name": node_text(left, source_bytes),
                    "line": left.start_point[0] + 1
                })
        for child in node.children:
            walk(child)
    walk(root)
    return results

def extract_functions(root, source_bytes: bytes) -> list:
    results = []
    def walk(node):
        if node.type == "function_definition":
            name   = node.child_by_field_name("name")
            params = node.child_by_field_name("parameters")
            results.append({
                "name":     node_text(name, source_bytes) if name else "unknown",
                "params":   node_text(params, source_bytes) if params else "",
                "line":     node.start_point[0] + 1,
                "end_line": node.end_point[0] + 1
            })
        for child in node.children:
            walk(child)
    walk(root)
    return results

def extract_loops(root, source_bytes: bytes) -> list:
    results = []
    def walk(node, depth=0):
        if node.type in ("for_statement", "while_statement"):
            results.append({
                "type":    node.type,
                "line":    node.start_point[0] + 1,
                "depth":   depth,
                "snippet": node_text(node, source_bytes)[:120]
            })
            depth += 1
        for child in node.children:
            walk(child, depth)
    walk(root)
    return results

def extract_calls(root, source_bytes: bytes) -> list:
    results = []
    def walk(node):
        if node.type == "call":
            func = node.child_by_field_name("function")
            results.append({
                "call": node_text(func, source_bytes) if func else "unknown",
                "line": node.start_point[0] + 1
            })
        for child in node.children:
            walk(child)
    walk(root)
    return results