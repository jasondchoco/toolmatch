import { useState, useCallback, useMemo } from 'react'
import { classify } from '../../engine/classifier.js'
import { recommend } from '../../engine/recommender.js'
import { loadProfileFromUrl } from '../../utils/shareUrl.js'
import { sendTrackingEvent, getSessionId, nowKST } from '../../utils/tracker.js'

const ratings = [
  { value: 'very_helpful', emoji: '🎯' },
  { value: 'helpful', emoji: '👍' },
  { value: 'so_so', emoji: '🤔' },
  { value: 'not_helpful', emoji: '👎' },
]

export default function InlineFeedback({ answers }) {
  const [selectedRating, setSelectedRating] = useState(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const context = useMemo(() => {
    const urlProfile = loadProfileFromUrl()
    const profile = urlProfile || (answers ? classify(answers) : null)
    const result = profile ? recommend(profile) : null
    const allPrimary = result?.categories?.flatMap((c) => c.primary.map((t) => t.name)) || []
    const allAlso = result?.categories?.flatMap((c) => c.also.map((t) => t.name)) || []
    return {
      q_category: answers?.q_category?.join(',') || '',
      q_experience: answers?.q_experience || '',
      q_context: answers?.q_context || '',
      q_urgency: answers?.q_urgency || '',
      q_budget: answers?.q_budget || '',
      q_solo_team: answers?.q_solo_team || '',
      categories: profile?.categories?.join(',') || '',
      experience: profile?.experience || '',
      primary: allPrimary.join(', '),
      also: allAlso.join(', '),
    }
  }, [answers])

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
    try {
      sendTrackingEvent({
        timestamp: nowKST(),
        type: 'feedback',
        sessionId: getSessionId(),
        rating: selectedRating,
        comment,
        ...context,
        source: answers ? 'survey' : 'shared_link',
        shared: '',
        resultUrl: window.location.href,
        userAgent: navigator.userAgent,
      })
    } catch { /* ignore */ }
  }, [selectedRating, comment, context, answers])

  if (submitted) {
    return (
      <div className="inline-feedback inline-feedback--done">
        <span>피드백 감사합니다!</span>
      </div>
    )
  }

  return (
    <div className="inline-feedback">
      <div className="inline-feedback__row">
        <span className="inline-feedback__question">이 추천이 도움이 되었나요?</span>
        <div className="inline-feedback__emojis">
          {ratings.map((r) => (
            <button
              key={r.value}
              className={`inline-feedback__emoji-btn${selectedRating === r.value ? ' inline-feedback__emoji-btn--selected' : ''}`}
              onClick={() => setSelectedRating(r.value)}
              type="button"
            >
              {r.emoji}
            </button>
          ))}
        </div>
      </div>
      <div className="inline-feedback__row">
        <input
          className="inline-feedback__input"
          type="text"
          placeholder="한 줄 의견이 있다면 남겨주세요 (선택)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && selectedRating && handleSubmit()}
        />
        <button
          className="inline-feedback__submit"
          onClick={handleSubmit}
          disabled={!selectedRating}
          type="button"
        >
          보내기
        </button>
      </div>
    </div>
  )
}
