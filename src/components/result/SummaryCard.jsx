export default function ResultCard({ category }) {
  const { label, primary, topReasons } = category
  const mainTool = primary[0]

  return (
    <section className="result-card">
      {mainTool && (
        <div className="result-card__hero">
          <span className="result-card__category">{label}</span>
          <h2 className="result-card__tool-name">{mainTool.name}</h2>
          <p className="result-card__best-for">{mainTool.bestFor}</p>

          {topReasons.length > 0 && (
            <>
              <div className="result-card__inner-divider" />
              <p className="result-card__section-label">이 도구를 추천하는 이유</p>
              <ol className="result-card__reason-list">
                {topReasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      )}
    </section>
  )
}
