export default function FeedbackBar({ onOpenFeedback, onRestart }) {
  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 12 }}>이 추천이 도움이 되었나요?</h3>
      <button className="btn btn--primary" onClick={onOpenFeedback}>
        피드백을 주세요
      </button>
      <div className="divider" />
      <button className="btn btn--small restart-btn" onClick={onRestart}>
        처음부터 다시 하기
      </button>
    </section>
  )
}
