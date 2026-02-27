export default function ProgressBar({ current, total }) {
  const value = current / total
  return (
    <div className="survey-progress">
      <md-linear-progress value={value} buffer={1}></md-linear-progress>
    </div>
  )
}
