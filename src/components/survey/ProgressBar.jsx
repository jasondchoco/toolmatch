export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100
  return (
    <div className="survey-progress">
      <div className="survey-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  )
}
