import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { generateShareUrl } from '../../utils/shareUrl.js'
import { exportResultPng } from '../../utils/exportPng.js'
import { copyText } from '../../utils/clipboard.js'
import { showToast } from '../common/Toast.jsx'

function buildShareText(result) {
  const catLabels = result.categories?.map((c) => c.label).join(', ') || ''
  const tools = result.categories?.flatMap((c) => c.primary.map((t) => t.name)).join(', ') || ''
  return `나는 "${catLabels}"에 관심! AI 도구 추천: ${tools}\n직접 해보기 →`
}

export default function ShareExport({ profile, result, onShare }) {
  const [open, setOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const popupRef = useRef(null)

  const shareUrl = useMemo(() => generateShareUrl(profile), [profile])
  const shareText = useMemo(() => buildShareText(result), [result])

  const toggle = useCallback(() => setOpen((v) => !v), [])

  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleThreads = useCallback(() => {
    const text = `${shareText} ${shareUrl}`
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener'
    )
    onShare?.('threads')
    setOpen(false)
  }, [shareText, shareUrl, onShare])

  const handleX = useCallback(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'noopener'
    )
    onShare?.('x')
    setOpen(false)
  }, [shareText, shareUrl, onShare])

  const handleCopyLink = useCallback(() => {
    copyText(shareUrl)
    showToast('링크가 복사되었습니다')
    onShare?.('link_copy')
    setOpen(false)
  }, [shareUrl, onShare])

  const handleExportPng = useCallback(async () => {
    setExporting(true)
    try {
      await exportResultPng()
      showToast('이미지가 다운로드되었습니다')
      onShare?.('png_download')
    } catch (err) {
      console.error('PNG export failed:', err)
      showToast('이미지 저장에 실패했습니다')
    }
    setExporting(false)
    setOpen(false)
  }, [onShare])

  return (
    <div className="share-wrapper" ref={popupRef}>
      <button className="btn btn--share-trigger" onClick={toggle}>
        공유하기
      </button>
      {open && (
        <div className="share-popup">
          <button className="share-popup__item" onClick={handleThreads}>
            Threads에 공유
          </button>
          <button className="share-popup__item" onClick={handleX}>
            𝕏에 공유
          </button>
          <button className="share-popup__item" onClick={handleCopyLink}>
            링크 복사
          </button>
          <button className="share-popup__item" onClick={handleExportPng} disabled={exporting}>
            {exporting ? '저장 중...' : '이미지 저장'}
          </button>
        </div>
      )}
    </div>
  )
}
