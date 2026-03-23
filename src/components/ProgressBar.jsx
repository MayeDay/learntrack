export default function ProgressBar({ value, color, height = 6 }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className="progress-bar-bg" style={{ height }}>
      <div
        className="progress-bar-fill"
        style={{ width: `${pct}%`, height, background: color }}
      />
    </div>
  )
}
