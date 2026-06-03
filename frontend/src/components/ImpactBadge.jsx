const colors = {
  critical: { background: "#FDECEA", color: "#C0392B", border: "#E74C3C" },
  medium:   { background: "#FEF9E7", color: "#B7770D", border: "#F39C12" },
  low:      { background: "#EAF4FB", color: "#1A5276", border: "#2E75B6" },
}

export default function ImpactBadge({ level }) {
  const c = colors[level?.toLowerCase()] || colors.low
  return (
    <span style={{
      padding: "2px 10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: "bold",
      border: `1px solid ${c.border}`,
      background: c.background,
      color: c.color,
      marginLeft: 8,
      textTransform: "uppercase"
    }}>
      {level}
    </span>
  )
}