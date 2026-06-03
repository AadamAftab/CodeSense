import { useState } from "react"
import ImpactBadge from "./ImpactBadge"

function Section({ title, items, renderItem }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ marginBottom: 24, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ background: "#1A3C5E", color: "white", padding: "12px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
      >
        <span style={{ fontWeight: "bold", fontSize: 16 }}>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: 16 }}>
          {items?.length === 0
            ? <p style={{ color: "#888" }}>No issues found.</p>
            : items?.map((item, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
                {renderItem(item)}
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default function OutputPanel({ result }) {
  return (
    <div style={{ marginTop: 8 }}>

      <Section
        title="Variable Naming"
        items={result.naming}
        renderItem={item => (
          <>
            <div style={{ marginBottom: 6 }}>
              <code style={{ background: "#fee", padding: "2px 6px", borderRadius: 4 }}>{item.current}</code>
              <span style={{ margin: "0 8px", color: "#888" }}>→</span>
              <code style={{ background: "#efe", padding: "2px 6px", borderRadius: 4 }}>{item.suggested}</code>
              <ImpactBadge level={item.impact} />
              <span style={{ color: "#888", fontSize: 13, marginLeft: 8 }}>Line {item.line}</span>
            </div>
            <p style={{ margin: 0, color: "#444", fontSize: 14 }}>{item.reason}</p>
          </>
        )}
      />

      <Section
        title="Code Gaps"
        items={result.gaps}
        renderItem={item => (
          <>
            <div style={{ marginBottom: 6 }}>
              <strong style={{ color: "#C0392B" }}>{item.issue}</strong>
              <ImpactBadge level={item.impact} />
              <span style={{ color: "#888", fontSize: 13, marginLeft: 8 }}>Line {item.line}</span>
            </div>
            <p style={{ margin: "4px 0", color: "#444", fontSize: 14 }}>{item.explanation}</p>
            {item.fix && (
              <pre style={{ background: "#f4f4f4", padding: 10, borderRadius: 6, fontSize: 13, overflowX: "auto" }}>
                {item.fix}
              </pre>
            )}
          </>
        )}
      />

      <Section
        title="Architecture & Performance"
        items={result.architecture}
        renderItem={item => (
          <>
            <div style={{ marginBottom: 6 }}>
              <strong style={{ color: "#1A3C5E" }}>{item.issue}</strong>
              <ImpactBadge level={item.impact} />
              <span style={{ color: "#888", fontSize: 13, marginLeft: 8 }}>Line {item.line}</span>
            </div>
            <p style={{ margin: "4px 0", color: "#444", fontSize: 14 }}>{item.explanation}</p>
            {item.fix && (
              <pre style={{ background: "#f4f4f4", padding: 10, borderRadius: 6, fontSize: 13, overflowX: "auto" }}>
                {item.fix}
              </pre>
            )}
          </>
        )}
      />

    </div>
  )
}