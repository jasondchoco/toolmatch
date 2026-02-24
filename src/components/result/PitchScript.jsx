import { useCallback } from 'react'
import { showToast } from '../common/Toast.jsx'

function copyText(text) {
  try {
    navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
}

export default function PitchScript({ pitch }) {
  const handleCopy = useCallback(() => {
    copyText(pitch)
    showToast('스크립트가 복사되었습니다')
  }, [pitch])

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 12 }}>팀에 설명할 때 이렇게 말해보세요 (20초)</h3>
      <div className="pitch-block">
        <p className="pitch-block__quote">"{pitch}"</p>
      </div>
      <button className="btn btn--small" onClick={handleCopy}>
        스크립트 복사
      </button>
    </section>
  )
}
