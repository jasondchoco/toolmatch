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
  const [submitted, setSubmitted] = useState(false)

  const context = useMemo(() => {
    const urlProfile = loadProfileFromUrl()
    const profile = urlProfile || (answers ? classify(answers) : null)
    const result = profile ? recommend(profile) : null
    return {
      q_role: answers?.q_role || '',
      q_goal: answers?.q_goal || '',
      q_code_comfort: answers?.q_code_comfort || '',
      q_team: answers?.q_team || '',
      q_output: answers?.q_output || '',
      q_security: answers?.q_security || '',
      q_ecosystem: answers?.q_ecosystem || '',
      q_urgency: answers?.q_urgency || '',
      persona: profile?.persona || '',
      skill: profile?.skill || '',
      aiLevel: profile?.aiLevel || '',
      outputType: profile?.outputType || '',
      primary: result?.primary.map((t) => t.name).join(', ') || '',
      also: result?.also.map((t) => t.name).join(', ') || '',
    }
  }, [answers])

  const handleRate = useCallback((value) => {
    setSubmitted(true)
    try {
      sendTrackingEvent({
        timestamp: nowKST(),
        type: 'feedback',
        sessionId: getSessionId(),
        rating: value,
        comment: '',
        ...context,
        source: answers ? 'survey' : 'shared_link',
        shared: '',
        resultUrl: window.location.href,
        userAgent: navigator.userAgent,
      })
    } catch { /* ignore */ }
  }, [context, answers])

  if (submitted) {
    return (
      <div className="inline-feedback inline-feedback--done">
        <span>피드백 감사합니다!</span>
      </div>
    )
  }

  return (
    <div className="inline-feedback">
      <span className="inline-feedback__question">이 추천이 도움이 되었나요?</span>
      <div className="inline-feedback__emojis">
        {ratings.map((r) => (
          <button
            key={r.value}
            className="inline-feedback__emoji-btn"
            onClick={() => handleRate(r.value)}
            type="button"
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
