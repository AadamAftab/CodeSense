import { useState } from "react"
import Editor from "./components/Editor"
import ModeSelector from "./components/ModeSelector"
import AnalyzeButton from "./components/AnalyzeButton"
import OutputPanel from "./components/OutputPanel"
import axios from "axios"

export default function App() {
  const [code, setCode]     = useState("")
  const [mode, setMode]     = useState("aiml")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  const analyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze`,
        { code, mode }
      )
      setResult(res.data)
    } catch (e) {
      setError("Analysis failed. Check your backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1A3C5E", fontSize: 36, marginBottom: 4 }}>CodeSense</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>AI-powered code quality analysis</p>
      <ModeSelector mode={mode} setMode={setMode} />
      <Editor code={code} setCode={setCode} />
      <AnalyzeButton onClick={analyze} loading={loading} />
      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}
      {result && <OutputPanel result={result} />}
    </div>
  )
}