import { useMemo, useEffect, useRef } from 'react'
import { classify } from '../engine/classifier.js'
import { recommend } from '../engine/recommender.js'
import { loadProfileFromUrl, generateShareUrl } from '../utils/shareUrl.js'
import { sendTrackingEvent, getSessionId, nowKST } from '../utils/tracker.js'
import { generateNarrative } from '../utils/narrative.js'
import StoryCard from '../components/result/SummaryCard.jsx'
import StartGuide from '../components/result/Playbook.jsx'
import InlineFeedback from '../components/result/InlineFeedback.jsx'

export default function ResultPage({ answers, onRestart, onEdit }) {
  const result = useMemo(() => {
    const urlProfile = loadProfileFromUrl()
    if (urlProfile) return recommend(urlProfile)
    if (answers) {
      const profile = classify(answers)
      return recommend(profile)
    }
    return recommend({ categories: ['writing'], experience: 'beginner', context: 'work', urgency: 'this_week', budget: 'any_budget', soloTeam: 'solo' })
  }, [answers])

  const tracked = useRef(false)

  useEffect(() => {
    if (result.profile) {
      const url = generateShareUrl(result.profile)
      window.history.replaceState({}, '', url)
    }
  }, [result.profile])

  useEffect(() => {
    if (tracked.current || !result.profile) return
    tracked.current = true

    const allPrimary = result.categories?.flatMap((c) => c.primary.map((t) => t.name)) || []
    const allAlso = result.categories?.flatMap((c) => c.also.map((t) => t.name)) || []

    sendTrackingEvent({
      timestamp: nowKST(),
      type: 'view',
      sessionId: getSessionId(),
      rating: '',
      comment: '',
      q_category: answers?.q_category?.join(',') || '',
      q_experience: answers?.q_experience || '',
      q_context: answers?.q_context || '',
      q_urgency: answers?.q_urgency || '',
      q_budget: answers?.q_budget || '',
      q_solo_team: answers?.q_solo_team || '',
      categories: result.profile.categories?.join(',') || '',
      experience: result.profile.experience || '',
      context: result.profile.context || '',
      budget: result.profile.budget || '',
      soloTeam: result.profile.soloTeam || '',
      primary: allPrimary.join(', '),
      also: allAlso.join(', '),
      source: answers ? 'survey' : 'shared_link',
      shared: '',
      resultUrl: window.location.href,
      userAgent: navigator.userAgent,
    })
  }, [result, answers])

  const narrative = result.profile ? generateNarrative(result.profile) : null

  return (
    <div id="result-export-area">
      {narrative && (
        <div className="result-narrative">
          <p className="result-narrative__line1">{narrative.line1} {narrative.line2}</p>
        </div>
      )}

      {result.categories?.map((cat, i) => (
        <div key={cat.key}>
          <StoryCard category={cat} />

          <StartGuide tool={cat.primary[0]} firstStep={cat.firstStep} />

          {cat.primary[0]?.url && (
            <a
              href={cat.primary[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="result-cta-bottom"
            >
              지금 바로 시작하기 →
            </a>
          )}

          {i < result.categories.length - 1 && <hr className="section-divider" />}
        </div>
      ))}

      <InlineFeedback answers={answers} />

      <div className="result-restart">
        {answers && onEdit && (
          <button className="btn btn--prev btn--small" onClick={onEdit}>
            ✏️ 답변 수정하기
          </button>
        )}
        <button className="btn btn--text" onClick={onRestart}>
          처음부터 다시 하기
        </button>
      </div>
    </div>
  )
}
