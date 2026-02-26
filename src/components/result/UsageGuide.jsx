import { useState, useCallback } from 'react'

function ToolGuide({ tool }) {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((v) => !v), [])

  return (
    <div className="card guide-card">
      <button className="guide-card__toggle" onClick={toggle} type="button">
        <span className="guide-card__name">{tool.name}</span>
        <span className={`guide-card__arrow${open ? ' guide-card__arrow--open' : ''}`}>▸</span>
      </button>
      {open && (
        <div className="guide-card__body">
          <ol className="guide-steps">
            {tool.howToStart.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {tool.usageTips && tool.usageTips.length > 0 && (
            <div className="usage-tips">
              <div className="usage-tips__label">활용 팁</div>
              <ul className="usage-tips__list">
                {tool.usageTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="guide-cta"
          >
            바로 시작하기 →
          </a>
        </div>
      )}
    </div>
  )
}

export default function UsageGuide({ primaryTools, alsoTools }) {
  const allTools = [...(primaryTools || []), ...(alsoTools || [])]
  if (allTools.length === 0) return null

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 8 }}>각 도구 활용법</h3>
      <p className="text-muted text-sm" style={{ marginBottom: 16 }}>
        눌러서 시작 방법과 팁을 확인하세요
      </p>
      {allTools.map((tool) => (
        <ToolGuide key={tool.id} tool={tool} />
      ))}
    </section>
  )
}
