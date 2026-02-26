import { useCallback } from 'react'
import { showToast } from '../common/Toast.jsx'
import toolsData from '../../data/tools.json'

const allToolsDb = toolsData.tools

function findToolForStep(step, recommendedTools) {
  const stepLower = step.toLowerCase()
  // 추천 도구 우선, 전체 도구 DB 폴백
  const pools = [recommendedTools, allToolsDb]
  for (const pool of pools) {
    const sorted = [...pool].sort((a, b) => b.name.length - a.name.length)
    for (const tool of sorted) {
      if (stepLower.includes(tool.name.toLowerCase())) return tool
      const firstName = tool.name.split(/\s/)[0].toLowerCase()
      if (firstName.length >= 4 && stepLower.includes(firstName)) return tool
    }
  }
  return null
}

function generateMarkdown(result) {
  const { primary, also, playbook, reason, persona, notes } = result
  const recommendedTools = [...primary, ...also]
  const usedToolIds = new Set()
  const lines = []

  lines.push(`# ${persona.label} — AI 도구 활용 플레이북`)
  lines.push('')
  lines.push(`> ${reason}`)
  if (notes && notes.length > 0) {
    notes.forEach((n) => lines.push(`> ${n}`))
  }
  lines.push('')
  lines.push('## 추천 조합')
  lines.push(`- **메인**: ${primary.map((t) => t.name).join(', ')}`)
  if (also.length > 0) {
    lines.push(`- **보조**: ${also.map((t) => t.name).join(', ')}`)
  }
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push('## 워크플로')
  lines.push('')

  playbook.forEach((step, i) => {
    lines.push(`### ${step}`)
    lines.push('')

    const tool = findToolForStep(step, recommendedTools)
    if (tool) {
      usedToolIds.add(tool.id)

      lines.push('**시작하기**')
      tool.howToStart.forEach((s, j) => lines.push(`${j + 1}. ${s}`))
      lines.push('')

      if (tool.usageTips && tool.usageTips.length > 0) {
        lines.push('**활용 팁**')
        tool.usageTips.forEach((tip) => lines.push(`- ${tip}`))
        lines.push('')
      }

      lines.push(`- 가격: ${tool.pricing}`)
      lines.push(`- 🔗 ${tool.url}`)
    }

    lines.push('')
    if (i < playbook.length - 1) {
      lines.push('   ↓')
      lines.push('')
    }
  })

  // 워크플로에 포함되지 않은 보조 도구
  const unusedTools = recommendedTools.filter((t) => !usedToolIds.has(t.id))
  if (unusedTools.length > 0) {
    lines.push('---')
    lines.push('')
    lines.push('## 함께 활용하면 좋은 도구')
    lines.push('')
    unusedTools.forEach((tool) => {
      lines.push(`### ${tool.name}`)
      lines.push(`> ${tool.bestFor}`)
      lines.push('')
      tool.howToStart.forEach((s, j) => lines.push(`${j + 1}. ${s}`))
      if (tool.usageTips && tool.usageTips.length > 0) {
        lines.push('')
        tool.usageTips.forEach((tip) => lines.push(`- ${tip}`))
      }
      lines.push('')
      lines.push(`- 가격: ${tool.pricing}`)
      lines.push(`- 🔗 ${tool.url}`)
      lines.push('')
    })
  }

  lines.push('---')
  lines.push('*ToolMatch (aitools-inky.vercel.app) 에서 생성됨*')

  return lines.join('\n')
}

export default function Playbook({ result }) {
  const { playbook } = result
  if (!playbook || playbook.length === 0) return null

  const handleCopy = useCallback(() => {
    const md = generateMarkdown(result)
    navigator.clipboard.writeText(md).then(() => {
      showToast('플레이북이 복사되었습니다!')
    })
  }, [result])

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 8 }}>이 순서대로 시작해보세요</h3>
      <p className="text-muted text-sm" style={{ marginBottom: 16 }}>
        추천 도구를 조합한 워크플로예요
      </p>
      <div className="card playbook-card">
        <ol className="playbook-steps">
          {playbook.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <button className="btn btn--small" onClick={handleCopy} style={{ marginTop: 12 }}>
          플레이북 복사
        </button>
      </div>
    </section>
  )
}
