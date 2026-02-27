export default function AlsoTools({ tools }) {
  if (!tools || tools.length === 0) return null

  return (
    <section className="also-tools">
      <p className="also-tools__title">이런 도구도 있어요</p>
      <div className="also-tools__grid">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="also-card"
          >
            <div className="also-card__name">{tool.name}</div>
            <div className="also-card__best-for">{tool.bestFor}</div>
            <div className="also-card__pricing">
              {tool.pricing?.has_free ? (
                <span className="also-card__free">무료 플랜 있음</span>
              ) : (
                <span className="also-card__paid">{tool.pricing?.paid_from || '유료'}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
