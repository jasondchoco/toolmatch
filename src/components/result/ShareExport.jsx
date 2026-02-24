import { useState, useCallback } from 'react'
import { generateShareUrl } from '../../utils/shareUrl.js'
import { exportResultPng } from '../../utils/exportPng.js'
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

export default function ShareExport({ profile, onRestart }) {
  const [exporting, setExporting] = useState(false)

  const handleCopyLink = useCallback(() => {
    const url = generateShareUrl(profile)
    copyText(url)
    showToast('링크가 복사되었습니다')
  }, [profile])

  const handleExportPng = useCallback(async () => {
    setExporting(true)
    try {
      await exportResultPng()
      showToast('PNG가 다운로드되었습니다')
    } catch (err) {
      console.error('PNG export failed:', err)
      showToast('PNG 저장에 실패했습니다')
    }
    setExporting(false)
  }, [])

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 12 }}>결과 공유</h3>
      <div className="share-actions">
        <button className="btn btn--small" onClick={handleCopyLink}>
          링크 복사
        </button>
        <button className="btn btn--small" onClick={handleExportPng} disabled={exporting}>
          {exporting ? '저장 중...' : 'PNG 다운로드'}
        </button>
        <button className="btn btn--small" onClick={onRestart}>
          다시 하기
        </button>
      </div>
    </section>
  )
}
