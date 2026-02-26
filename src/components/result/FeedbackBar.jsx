export default function FeedbackBar({ onOpenFeedback, onRestart }) {
  return (
    <div className="feedback-bar">
      <button className="btn btn--small" onClick={onOpenFeedback}>
        피드백 남기기
      </button>
      <button className="btn btn--text" onClick={onRestart}>
        처음부터 다시 하기
      </button>
    </div>
  )
}
