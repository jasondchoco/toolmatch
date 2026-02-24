import KeywordChip from './KeywordChip.jsx'

export default function ToolCard({ tool, fitLabel, fitType }) {
  const pillClass = fitType === 'also' ? 'pill pill--also' : 'pill pill--primary'
  return (
    <div className="card tool-card">
      <div className="tool-card__header">
        <span className="tool-card__name">{tool.name}</span>
        <span className="pill pill--category">{tool.categoryLabel}</span>
        {fitLabel && <span className={pillClass}>{fitLabel}</span>}
      </div>
      <div className="tool-card__meta">{tool.bestFor}</div>

      <div className="tool-card__section">
        <div className="section-label">좋은 점</div>
        <div className="chips">
          {tool.praisedKeywords.map((kw, i) => (
            <KeywordChip key={i} text={kw} type="praised" />
          ))}
        </div>
      </div>

      <div className="tool-card__section">
        <div className="section-label">아쉬운 점</div>
        <div className="chips">
          {tool.criticizedKeywords.map((kw, i) => (
            <KeywordChip key={i} text={kw} type="criticized" />
          ))}
        </div>
      </div>

      <div className="tool-card__pricing">{tool.pricing}</div>
    </div>
  )
}
