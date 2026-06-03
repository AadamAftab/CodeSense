export default function ModeSelector({ mode, setMode }) {
  const modes = [
    { value: "aiml", label: "AI / ML" },
    { value: "cp",   label: "Competitive Programming" },
    { value: "sd",   label: "Software Development" },
  ]

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: "bold", color: "#1A3C5E", marginRight: 12 }}>Mode:</label>
      {modes.map(m => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          style={{
            marginRight: 8,
            padding: "8px 18px",
            borderRadius: 6,
            border: "2px solid #2E75B6",
            background: mode === m.value ? "#2E75B6" : "white",
            color: mode === m.value ? "white" : "#2E75B6",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}