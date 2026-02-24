// OG 이미지 생성 스크립트 (1200x630 PNG)
// 실행: node scripts/generate-og.mjs

import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/og-image.png')

const W = 1200
const H = 630

const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')

// Background
ctx.fillStyle = '#0b0d12'
ctx.fillRect(0, 0, W, H)

// Subtle grid lines
ctx.strokeStyle = 'rgba(255,255,255,0.04)'
ctx.lineWidth = 1
for (let x = 0; x <= W; x += 60) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
}
for (let y = 0; y <= H; y += 60) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
}

// Accent glow (top-left)
const glow = ctx.createRadialGradient(200, 200, 0, 200, 200, 400)
glow.addColorStop(0, 'rgba(99,102,241,0.18)')
glow.addColorStop(1, 'rgba(99,102,241,0)')
ctx.fillStyle = glow
ctx.fillRect(0, 0, W, H)

// Left accent bar
ctx.fillStyle = '#6366f1'
ctx.fillRect(80, 140, 5, 220)

// Badge
ctx.fillStyle = 'rgba(99,102,241,0.15)'
const badgeX = 100, badgeY = 130, badgeW = 190, badgeH = 38, badgeR = 20
ctx.beginPath()
ctx.moveTo(badgeX + badgeR, badgeY)
ctx.arcTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + badgeH, badgeR)
ctx.arcTo(badgeX + badgeW, badgeY + badgeH, badgeX, badgeY + badgeH, badgeR)
ctx.arcTo(badgeX, badgeY + badgeH, badgeX, badgeY, badgeR)
ctx.arcTo(badgeX, badgeY, badgeX + badgeW, badgeY, badgeR)
ctx.closePath()
ctx.fill()
ctx.strokeStyle = 'rgba(99,102,241,0.5)'
ctx.lineWidth = 1
ctx.stroke()

ctx.fillStyle = '#818cf8'
ctx.font = 'bold 16px sans-serif'
ctx.fillText('AI 도구 추천 가이드', 120, 153)

// Main title
ctx.fillStyle = '#e8eaf0'
ctx.font = 'bold 72px sans-serif'
ctx.fillText('Tool', 100, 260)
ctx.fillStyle = '#818cf8'
ctx.fillText('Match', 100 + ctx.measureText('Tool').width, 260)

// Subtitle
ctx.fillStyle = '#a8b0c2'
ctx.font = '26px sans-serif'
ctx.fillText('8개 질문, 2분이면 나에게 맞는 AI 도구를 찾아드려요.', 100, 320)

// Tool chips
const chips = ['ChatGPT', 'Claude', 'Cursor', 'Notion AI', 'Perplexity']
const chipColors = [
  { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.4)', text: '#818cf8' },
  { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.3)',   text: '#4ade80' },
  { bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.3)',   text: '#facc15' },
  { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   text: '#f87171' },
  { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)',  text: '#a5b4fc' },
]

ctx.font = 'bold 18px sans-serif'
let cx = 100
chips.forEach((chip, i) => {
  const tw = ctx.measureText(chip).width
  const pw = tw + 28, ph = 38, py = 380, r = 20
  const c = chipColors[i]
  ctx.fillStyle = c.bg
  ctx.beginPath()
  ctx.moveTo(cx + r, py)
  ctx.arcTo(cx + pw, py, cx + pw, py + ph, r)
  ctx.arcTo(cx + pw, py + ph, cx, py + ph, r)
  ctx.arcTo(cx, py + ph, cx, py, r)
  ctx.arcTo(cx, py, cx + pw, py, r)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = c.border
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.fillStyle = c.text
  ctx.fillText(chip, cx + 14, py + 25)
  cx += pw + 10
})

// URL
ctx.fillStyle = 'rgba(168,176,194,0.5)'
ctx.font = '20px sans-serif'
ctx.fillText('aitools-inky.vercel.app', 100, 570)

// Right illustration — stacked cards
const cards = [
  { y: 160, label: '개발자 유형', tools: 'Cursor + Claude' },
  { y: 290, label: '기획자 유형', tools: 'ChatGPT + Notion AI' },
  { y: 420, label: '창업가 유형', tools: 'Perplexity + ChatGPT' },
]
cards.forEach(({ y, label, tools }, i) => {
  const x = 720, w = 400, h = 100, r = 12
  const alpha = i === 0 ? 1 : i === 1 ? 0.6 : 0.3
  ctx.globalAlpha = alpha
  // card bg
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.stroke()
  // accent dot
  ctx.fillStyle = '#6366f1'
  ctx.beginPath(); ctx.arc(x + 24, y + 28, 5, 0, Math.PI * 2); ctx.fill()
  // label
  ctx.fillStyle = '#a8b0c2'
  ctx.font = '14px sans-serif'
  ctx.fillText(label, x + 40, y + 33)
  // tools
  ctx.fillStyle = '#e8eaf0'
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText(tools, x + 40, y + 65)
  ctx.globalAlpha = 1
})

// Save
const buf = canvas.toBuffer('image/png')
writeFileSync(OUT, buf)
console.log(`✓ OG image saved: ${OUT}`)
