import { useMemo, useEffect, useRef } from 'react'
import { classify } from '../engine/classifier.js'
import { recommend } from '../engine/recommender.js'
import { loadProfileFromUrl, generateShareUrl } from '../utils/shareUrl.js'
import { sendTrackingEvent, getSessionId, nowKST } from '../utils/tracker.js'
import SummaryCard from '../components/result/SummaryCard.jsx'
import ToolCard from '../components/result/ToolCard.jsx'
import UsageGuide from '../components/result/UsageGuide.jsx'
import PitchScript from '../components/result/PitchScript.jsx'
import ShareExport from '../components/result/ShareExport.jsx'
import FeedbackBar from '../components/result/FeedbackBar.jsx'

export default function ResultPage({ answers, onRestart, onOpenFeedback, onShare }) {
  const isSharedLink = !answers && !!loadProfileFromUrl()

  const result = useMemo(() => {
    const urlProfile = loadProfileFromUrl()
    if (urlProfile) return recommend(urlProfile)
    if (answers) {
      const profile = classify(answers)
      return recommend(profile)
    }
    return recommend({ persona: 'idea_demo', skill: 'low' })
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

    sendTrackingEvent({
      timestamp: nowKST(),
      type: 'view',
      sessionId: getSessionId(),
      rating: '',
      comment: '',
      q_role: answers?.q_role || '',
      q_goal: answers?.q_goal || '',
      q_code_comfort: answers?.q_code_comfort || '',
      q_team: answers?.q_team || '',
      q_output: answers?.q_output || '',
      q_security: answers?.q_security || '',
      q_ecosystem: answers?.q_ecosystem || '',
      q_urgency: answers?.q_urgency || '',
      persona: result.profile.persona || '',
      skill: result.profile.skill || '',
      primary: result.primary.map(t => t.name).join(', '),
      also: result.also.map(t => t.name).join(', '),
      source: answers ? 'survey' : 'shared_link',
      shared: '',
      resultUrl: window.location.href,
      userAgent: navigator.userAgent,
    })
  }, [result, answers])

  return (
    <div>
      {isSharedLink && (
        <div className="shared-banner">
          <p>누군가가 공유한 AI 도구 추천 결과입니다.</p>
          <button className="btn btn--primary btn--small" onClick={onRestart}>
            나도 해보기
          </button>
        </div>
      )}

      <div id="result-export-area">
        <SummaryCard result={result} />

        <section className="result-section">
          <h3 style={{ marginBottom: 16 }}>추천 도구</h3>
          <div className="grid-2">
            {result.primary.map((tool) => (
              <ToolCard key={tool.id} tool={tool} fitLabel="추천" />
            ))}
            {result.also.map((tool) => (
              <ToolCard key={tool.id} tool={tool} fitLabel="함께 쓰면 좋은" fitType="also" />
            ))}
          </div>
        </section>

        <UsageGuide tools={result.primary} />

        <PitchScript pitch={result.pitch} toolNames={result.primary.map(t => t.name)} />
      </div>

      <ShareExport profile={result.profile} onShare={onShare} />

      <FeedbackBar onOpenFeedback={onOpenFeedback} onRestart={onRestart} />
    </div>
  )
}
