import toolsData from '../../data/tools.json'

export default function TrendingTools({ userCategories = [], excludeIds = [] }) {
  const relevant = toolsData.tools
    .filter((t) => userCategories.includes(t.category) && !excludeIds.includes(t.id))
    .slice(0, 4)

  if (relevant.length === 0) return null

  return (
    <section className="trending-tools">
      <p className="trending-tools__title">이 목적으로 많이 쓰는 다른 도구</p>
      <div className="trending-tools__grid">
        {relevant.map((tool) => (
          <a
            key={tool.id}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="trending-card"
          >
            <div className="trending-card__name">{tool.name}</div>
            <div className="trending-card__label">{tool.categoryLabel}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
