def clean_output(result: dict) -> dict:
    for section in ["naming", "gaps", "architecture"]:
        if section in result:
            result[section] = [
                item for item in result[section]
                if item.get("fix", "").strip().lower() != "no fix needed"
                and item.get("issue", "").strip() != ""
            ]
    return result