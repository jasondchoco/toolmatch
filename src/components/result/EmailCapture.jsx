import { useState, useCallback } from 'react'
import { sendTrackingEvent, getSessionId, nowKST } from '../../utils/tracker.js'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = useCallback(() => {
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setError('올바른 이메일 주소를 입력해주세요')
      return
    }
    setError('')
    setSubmitted(true)
    try {
      sendTrackingEvent({
        timestamp: nowKST(),
        type: 'email_capture',
        sessionId: getSessionId(),
        email: trimmed,
        resultUrl: window.location.href,
      })
    } catch { /* ignore */ }
  }, [email])

  if (submitted) {
    return (
      <div className="email-capture email-capture--done">
        <span>📬 등록 완료! 결과를 이메일로 보내드릴게요.</span>
      </div>
    )
  }

  return (
    <div className="email-capture">
      <p className="email-capture__title">📧 결과를 이메일로 받기</p>
      <p className="email-capture__desc">나중에 다시 볼 수 있도록 추천 결과를 이메일로 받아보세요</p>
      <div className="email-capture__row">
        <input
          className="email-capture__input"
          type="email"
          placeholder="이메일 주소 입력"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className="btn btn--primary btn--small email-capture__btn"
          onClick={handleSubmit}
          type="button"
        >
          받기
        </button>
      </div>
      {error && <p className="email-capture__error">{error}</p>}
    </div>
  )
}
