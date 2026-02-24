import { useState, useCallback, useMemo } from 'react'
import { classify } from '../engine/classifier.js'
import { recommend } from '../engine/recommender.js'
import { loadProfileFromUrl } from '../utils/shareUrl.js'
import { showToast } from '../components/common/Toast.jsx'
import { sendTrackingEvent, getSessionId, nowKST } from '../utils/tracker.js'

const ratings = [
  { value: 'very_helpful', label: '매우 도움됨', emoji: '🎯' },
  { value: 'helpful', label: '도움됨', emoji: '👍' },
  { value: 'so_so', label: '보통', emoji: '🤔' },
  { value: 'not_helpful', label: '아쉬움', emoji: '👎' },
]

export default function FeedbackPage({ onBack, answers, shareActions }) {
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // 서베이 답변 + 추천 결과 수집
  const context = useMemo(() => {
    const urlProfile = loadProfileFromUrl()
    const profile = urlProfile || (answers ? classify(answers) : null)
    const result = profile ? recommend(profile) : null

    return {
      // 서베이 원본 답변 (8문항)
      q_role: answers?.q_role || '',
      q_goal: answers?.q_goal || '',
      q_code_comfort: answers?.q_code_comfort || '',
      q_team: answers?.q_team || '',
      q_output: answers?.q_output || '',
      q_security: answers?.q_security || '',
      q_ecosystem: answers?.q_ecosystem || '',
      q_urgency: answers?.q_urgency || '',
      // 분류 결과
      persona: profile?.persona || '',
      skill: profile?.skill || '',
      // 추천 결과
      primary: result?.primary.map(t => t.name).join(', ') || '',
      also: result?.also.map(t => t.name).join(', ') || '',
    }
  }, [answers])

  const handleSubmit = useCallback(async () => {
    if (!rating) return
    setSubmitting(true)

    const payload = {
      timestamp: nowKST(),
      type: 'feedback',
      sessionId: getSessionId(),
      rating,
      comment: comment.trim(),
      ...context,
      source: answers ? 'survey' : 'shared_link',
      shared: (shareActions || []).join(', '),
      resultUrl: window.location.href,
      userAgent: navigator.userAgent,
    }

    try {
      sendTrackingEvent(payload)
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }, [rating, comment, context])

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="feedback-done">
          <div className="feedback-done__icon">✓</div>
          <h2>감사합니다!</h2>
          <p className="text-muted" style={{ marginTop: 8, marginBottom: 24 }}>
            피드백이 전달되었습니다. 더 나은 추천을 만드는 데 사용할게요.
          </p>
          <button className="btn btn--primary" onClick={onBack}>
            결과로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="feedback-page">
      <button className="btn btn--small" onClick={onBack}>
        ← 결과로 돌아가기
      </button>

      <h2 style={{ marginTop: 24, marginBottom: 8 }}>피드백을 남겨주세요</h2>
      <p className="text-muted" style={{ marginBottom: 32 }}>
        여러분의 의견이 더 나은 추천을 만듭니다.
      </p>

      {/* Rating */}
      <div className="feedback-question">
        <h3 className="feedback-question__title">이 추천이 도움이 되었나요?</h3>
        <div className="feedback-ratings">
          {ratings.map((r) => (
            <button
              key={r.value}
              className={`feedback-rating-btn${rating === r.value ? ' feedback-rating-btn--selected' : ''}`}
              onClick={() => setRating(r.value)}
              type="button"
            >
              <span className="feedback-rating-btn__emoji">{r.emoji}</span>
              <span className="feedback-rating-btn__label">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="feedback-question">
        <h3 className="feedback-question__title">
          더 나은 추천을 위해 의견을 남겨주세요
          <span className="text-muted text-sm" style={{ fontWeight: 400, marginLeft: 8 }}>선택</span>
        </h3>
        <textarea
          className="feedback-textarea"
          placeholder="예: 이런 도구도 포함해주세요, 질문이 어려웠어요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>

      {/* Submit */}
      <button
        className="btn btn--primary"
        onClick={handleSubmit}
        disabled={!rating || submitting}
        style={{ width: '100%', marginTop: 8 }}
      >
        {submitting ? '전송 중...' : '피드백 보내기'}
      </button>
    </div>
  )
}
