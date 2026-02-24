export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="survey-progress">
      <div className="survey-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  )
}
