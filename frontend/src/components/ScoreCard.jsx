export default function ScoreCard({ result }) {
  const score = calculateScore(result)
  const color = score >= 80 ? "#3fb950" : score >= 50 ? "#d29922" : "#f85149"
  const label = score >= 80 ? "Good" : score >= 50 ? "Needs Work" : "Critical Issues"

  const critical = [...(result.gaps||[]), ...(result.architecture||[])].filter(i => i.impact === "critical").length
  const medium   = [...(result.gaps||[]), ...(result.architecture||[])].filter(i => i.impact === "medium").length
  const low      = [...(result.gaps||[]), ...(result.architecture||[])].filter(i => i.impact === "low").length

  return (
    <div style={{ background: "#161b22", border: `1px solid ${color}40`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 4 }}>CODE HEALTH SCORE</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 48, fontWeight: 800, color }}>{score}</span>
            <span style={{ fontSize: 20, color: "#8b949e" }}>/100</span>
            <span style={{ fontSize: 14, color, fontWeight: 600, marginLeft: 8 }}>{label}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          {critical > 0 && <Pill count={critical} label="Critical" color="#f85149" bg="#2d1b1b" />}
          {medium > 0   && <Pill count={medium}   label="Medium"   color="#d29922" bg="#2d2000" />}
          {low > 0      && <Pill count={low}       label="Low"      color="#58a6ff" bg="#1b2d3d" />}
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginTop: 16, background: "#21262d", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.8s ease" }} />
      </div>
    </div>
  )
}

function Pill({ count, label, color, bg }) {
  return (
    <div style={{ background: bg, border: `1px solid ${color}60`, borderRadius: 20, padding: "3px 10px", fontSize: 12, color, fontWeight: 600 }}>
      {count} {label}
    </div>
  )
}

function calculateScore(result) {
  let deductions = 0
  const all = [...(result.gaps||[]), ...(result.architecture||[])]
  for (const item of all) {
    if (item.impact === "critical")    deductions += 15
    else if (item.impact === "medium") deductions += 7
    else if (item.impact === "low")    deductions += 3
  }
  const naming = (result.naming||[]).length
  deductions += naming * 2
  return Math.max(0, 100 - deductions)
}