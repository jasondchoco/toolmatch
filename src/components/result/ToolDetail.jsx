import { useState, useCallback } from 'react'
import KeywordChip from './KeywordChip.jsx'

function ToolItem({ tool, fitLabel, fitType, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((v) => !v), [])
  const pillClass = fitType === 'also' ? 'pill pill--also' : 'pill pill--primary'

  return (
    <div className="card tool-detail">
      <button className="tool-detail__toggle" onClick={toggle} type="button">
        <div className="tool-detail__header">
          {fitLabel && <span className={pillClass}>{fitLabel}</span>}
          <span className="tool-detail__name">{tool.name}</span>
        </div>
        <div className="tool-detail__summary">{tool.bestFor}</div>
        <span className={`tool-detail__arrow${open ? ' tool-detail__arrow--open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="tool-detail__body">
          <div className="tool-detail__section">
            <div className="section-label">좋은 점</div>
            <div className="chips">
              {tool.praisedKeywords.map((kw, i) => (
                <KeywordChip key={i} text={kw} type="praised" />
              ))}
            </div>
          </div>

          <div className="tool-detail__section">
            <div className="section-label">아쉬운 점</div>
            <div className="chips">
              {tool.criticizedKeywords.map((kw, i) => (
                <KeywordChip key={i} text={kw} type="criticized" />
              ))}
            </div>
          </div>

          <div className="tool-detail__section">
            <div className="section-label">시작하기</div>
            <ol className="guide-steps">
              {tool.howToStart.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {tool.usageTips && tool.usageTips.length > 0 && (
            <div className="tool-detail__section">
              <div className="section-label">활용 팁</div>
              <ul className="usage-tips__list">
                {tool.usageTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="tool-detail__footer">
            <span className="tool-detail__pricing">{tool.pricing}</span>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-detail__cta"
            >
              바로 시작하기 →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ToolDetail({ primaryTools, alsoTools }) {
  const allTools = [
    ...(primaryTools || []).map((t) => ({ tool: t, fitLabel: '추천', fitType: 'primary' })),
    ...(alsoTools || []).map((t) => ({ tool: t, fitLabel: '함께 쓰면 좋은', fitType: 'also' })),
  ]
  if (allTools.length === 0) return null

  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 8 }}>도구 자세히 보기</h3>
      <p className="text-muted text-sm" style={{ marginBottom: 16 }}>
        눌러서 상세 정보와 시작 방법을 확인하세요
      </p>
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
