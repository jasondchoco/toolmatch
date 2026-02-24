export default function UsageGuide({ tools }) {
  return (
    <section className="result-section">
      <h3 style={{ marginBottom: 16 }}>이렇게 시작하세요</h3>
      {tools.map((tool) => (
        <div key={tool.id} className="card guide-card">
          <div className="guide-card__name">{tool.name}</div>
          <ol className="guide-steps">
            {tool.howToStart.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="guide-cta"
          >
            바로 시작하기 →
          </a>
        </div>
      ))}
    </section>
  )
}
