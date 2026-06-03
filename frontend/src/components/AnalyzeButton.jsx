export default function AnalyzeButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "10px 32px",
        background: loading ? "#aaa" : "#1A3C5E",
        color: "white",
        border: "none",
        borderRadius: 8,
        fontSize: 16,
        fontWeight: "bold",
        cursor: loading ? "not-allowed" : "pointer",
        marginBottom: 24
      }}
    >
      {loading ? "Analyzing..." : "Analyze"}
    </button>
  )
}