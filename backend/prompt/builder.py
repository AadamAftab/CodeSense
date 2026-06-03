import json
from .modes.aiml import AIML_SYSTEM_PROMPT
from .modes.cp   import CP_SYSTEM_PROMPT
from .modes.sd   import SD_SYSTEM_PROMPT

MODE_PROMPTS = {
    "aiml": AIML_SYSTEM_PROMPT,
    "cp":   CP_SYSTEM_PROMPT,
    "sd":   SD_SYSTEM_PROMPT,
}

def build_prompt(source_code: str, ast_data: dict, mode: str) -> tuple:
    system = MODE_PROMPTS.get(mode, AIML_SYSTEM_PROMPT)
    user = f"""Analyze this code.

SOURCE CODE:
{source_code}

AST SUMMARY:
{json.dumps(ast_data, indent=2)}

Return your analysis as strict JSON only.
"""
    return system, user