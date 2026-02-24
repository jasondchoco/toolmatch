/**
 * html2canvas 래퍼 — 결과 영역을 PNG로 내보내기
 */

export async function exportResultPng(elementId = 'result-export-area') {
  const el = document.getElementById(elementId)
  if (!el) return

  const { default: html2canvas } = await import('html2canvas')

  const canvas = await html2canvas(el, {
    backgroundColor: '#0b0d12',
    scale: 2,
    useCORS: true,
    logging: false,
  })

  const link = document.createElement('a')
  link.download = 'toolmatch-result.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
