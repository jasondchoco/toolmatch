import { useState, useCallback, useMemo } from 'react'
import { copyText } from '../../utils/clipboard.js'
import { showToast } from '../common/Toast.jsx'

const audiences = [
  {
    id: 'ceo',
    label: '🏢 CEO/대표님',
    tone: (pitch, tools) =>
      `대표님, ${tools} 도입을 제안드립니다. ${pitch} 경쟁사는 이미 쓰고 있을 수 있습니다. 🚀`,
  },
  {
    id: 'lead',
    label: '💼 팀장님',
    tone: (pitch, tools) =>
      `팀장님, ${tools} 한번 써볼까요? ${pitch} 팀 전체 생산성이 확 올라갈 겁니다. 💪`,
  },
  {
    id: 'peer',
    label: '🤝 동료',
    tone: (pitch, tools) =>
      `야 나 ${tools} 써봤는데 진짜 좋더라. ${pitch} 한번 같이 써보자! ⚡`,
  },
  {
    id: 'default',
    label: '📋 기본',
    tone: (pitch) => pitch,
  },
]

export default function PitchScript({ pitch, toolNames }) {
  const [audienceId, setAudienceId] = useState('ceo')
  const tools = toolNames?.join(' + ') || 'AI 도구'

  const currentPitch = useMemo(() => {
    const audience = audiences.find((a) => a.id === audienceId)
    return audience.tone(pitch, tools)
  }, [audienceId, pitch, tools])

  const handleCopy = useCallback(() => {
    copyText(currentPitch)
    showToast('스크립트가 복사되었습니다 ✨')
  }, [currentPitch])

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 4 }}>팀 설득용 한마디</h3>
      <p className="text-muted text-sm" style={{ marginBottom: 14 }}>
        누구를 설득할지 골라보세요. 복사해서 바로 보내면 됩니다.
      </p>
      <div className="pitch-audience-tabs">
        {audiences.map((a) => (
          <button
            key={a.id}
            className={`pitch-audience-tab${audienceId === a.id ? ' pitch-audience-tab--active' : ''}`}
            onClick={() => setAudienceId(a.id)}
            type="button"
          >
            {a.label}
          </button>
        ))}
      </div>
      <div className="pitch-block">
        <p className="pitch-block__quote">{currentPitch}</p>
      </div>
      <button className="btn btn--small" onClick={handleCopy}>
        스크립트 복사
      </button>
    </section>
  )
}
