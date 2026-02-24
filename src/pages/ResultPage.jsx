import { useMemo, useEffect } from 'react'
import { classify } from '../engine/classifier.js'
import { recommend } from '../engine/recommender.js'
import { loadProfileFromUrl, generateShareUrl } from '../utils/shareUrl.js'
import SummaryCard from '../components/result/SummaryCard.jsx'
import ToolCard from '../components/result/ToolCard.jsx'
import UsageGuide from '../components/result/UsageGuide.jsx'
import PitchScript from '../components/result/PitchScript.jsx'
import ShareExport from '../components/result/ShareExport.jsx'
import FeedbackBar from '../components/result/FeedbackBar.jsx'

export default function ResultPage({ answers, onRestart }) {
  const result = useMemo(() => {
    // 1. URL 파라미터에서 프로필 로드 (공유 링크)
    const urlProfile = loadProfileFromUrl()
    if (urlProfile) {
      return recommend(urlProfile)
    }

    // 2. 서베이 답변에서 분류
    if (answers) {
      const profile = classify(answers)
      return recommend(profile)
    }

    // 3. fallback
    return recommend({ persona: 'idea_demo', skill: 'low' })
  }, [answers])

  // URL을 프로필 파라미터로 업데이트 (결과 공유/새로고침 대비)
  useEffect(() => {
    if (result.profile) {
      const url = generateShareUrl(result.profile)
      window.history.replaceState({}, '', url)
    }
  }, [result.profile])

  return (
    <div>
      <div id="result-export-area">
        {/* Block 1: Summary */}
        <SummaryCard result={result} />

        {/* Block 2: Tool Cards */}
        <section className="result-section">
          <h3 style={{ marginBottom: 16 }}>추천 도구 자세히 보기</h3>
          <div className="grid-2">
            {result.primary.map((tool) => (
              <ToolCard key={tool.id} tool={tool} fitLabel="추천" />
            ))}
            {result.also.map((tool) => (
              <ToolCard key={tool.id} tool={tool} fitLabel="함께 쓰면 좋은" />
            ))}
          </div>
        </section>

        {/* Block 3: Usage Guide */}
        <UsageGuide tools={result.primary} />

        {/* Block 4: Pitch Script */}
        <PitchScript pitch={result.pitch} />
      </div>

      {/* Block 5: Share & Export */}
      <ShareExport profile={result.profile} onRestart={onRestart} />

      {/* Block 6: Feedback */}
      <FeedbackBar />
    </div>
  )
}
