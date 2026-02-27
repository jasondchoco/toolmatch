import { useState, useCallback } from 'react'
import KeywordChip from './KeywordChip.jsx'

function formatPricing(pricing) {
  if (!pricing) return ''
  if (typeof pricing === 'string') return pricing
  const parts = []
  if (pricing.free_tier) parts.push(pricing.free_tier)
  if (pricing.paid_from) parts.push(`유료: ${pricing.paid_from}`)
  return parts.join(' · ')
}

function ToolItem({ tool, fitLabel, fitType, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((v) => !v), [])
  const pillClass = fitType === 'also' ? 'pill pill--also' : 'pill pill--primary'

  return (
    <div className="tool-item">
      <button className="tool-item__toggle" onClick={toggle} type="button">
        <div className="tool-item__head">
          {fitLabel && <span className={pillClass}>{fitLabel}</span>}
          <span className="tool-item__name">{tool.name}</span>
          <span className="tool-item__pricing-inline">{formatPricing(tool.pricing)}</span>
        </div>
        <span className={`tool-item__arrow${open ? ' tool-item__arrow--open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="tool-item__body">
          <p className="tool-item__best-for">{tool.bestFor}</p>

          <div className="tool-item__chips-row">
            {tool.praisedKeywords.map((kw, i) => (
              <KeywordChip key={`p${i}`} text={kw} type="praised" />
            ))}
            {tool.criticizedKeywords.map((kw, i) => (
              <KeywordChip key={`c${i}`} text={kw} type="criticized" />
            ))}
          </div>

          {tool.usageTips && tool.usageTips.length > 0 && (
            <ul className="tool-item__tips">
              {tool.usageTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}

          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-item__cta">
            바로 시작하기 →
          </a>
        </div>
      )}
    </div>
  )
}

export default function ToolDetail({ primaryTools, alsoTools, title }) {
  const allTools = [
    ...(primaryTools || []).map((t) => ({ tool: t, fitLabel: '추천', fitType: 'primary' })),
    ...(alsoTools || []).map((t) => ({ tool: t, fitLabel: '함께 쓰면 좋은', fitType: 'also' })),
  ]
  if (allTools.length === 0) return null

  return (
    <section className="tool-list">
      <h4 className="tool-list__title">{title || '도구 자세히 보기'}</h4>
      {allTools.map(({ tool, fitLabel, fitType }, i) => (
        <ToolItem
          key={tool.id}
          tool={tool}
          fitLabel={fitLabel}
          fitType={fitType}
          defaultOpen={i === 0}
        />
      ))}
    </section>
  )
}
