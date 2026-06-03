from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from parser.python_parser import parse_python
from prompt.builder import build_prompt
from gpt.client import analyze
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])

class AnalyzeRequest(BaseModel):
    code: str
    mode: str   # "aiml" | "cp" | "sd"

@app.post("/analyze")
async def analyze_code(req: AnalyzeRequest):
    ast_data     = parse_python(req.code)
    system, user = build_prompt(req.code, ast_data, req.mode)
    result       = analyze(system, user)
    return result