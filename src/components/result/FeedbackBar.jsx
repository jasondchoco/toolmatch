import toolsData from '../../data/tools.json'
import templatesData from '../../data/templates.json'

function buildFeedbackUrl(helpful) {
  const base = templatesData.feedbackFormUrl
  if (!base) return null
  const params = new URLSearchParams({
    helpful,
    result_url: window.location.href,
  })
  return `${base}?${params.toString()}`
}

export default function FeedbackBar() {
  const feedbackUrl = templatesData.feedbackFormUrl

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 12 }}>이 추천이 도움이 되었나요?</h3>
      <div className="feedback-actions">
        {feedbackUrl ? (
          <>
            <a
              href={buildFeedbackUrl('yes')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--small btn--positive"
            >
              도움 됐어요
            </a>
            <a
              href={buildFeedbackUrl('no')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--small btn--negative"
            >
              아쉬워요
            </a>
          </>
        ) : (
          <p className="text-muted text-sm">피드백 수집 준비 중입니다.</p>
        )}
      </div>
      <p className="feedback-note">
        {templatesData.disclaimerText}
        <br />
        {templatesData.lastUpdatedLabel}: {toolsData.last_updated}
      </p>
    </section>
  )
}
