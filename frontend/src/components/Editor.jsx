import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"

export default function Editor({ code, setCode }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
      <CodeMirror
        value={code}
        height="320px"
        extensions={[python()]}
        onChange={(val) => setCode(val)}
        theme="light"
        placeholder="Paste your code here..."
      />
    </div>
  )
}