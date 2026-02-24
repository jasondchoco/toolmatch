export default function SummaryCard({ result }) {
  const { persona, primary, also, reason, notes } = result

  return (
    <section className="result-section">
      <div className="card summary-card">
        <div className="persona-badge">{persona.label} 유형</div>
        <h2 style={{ marginBottom: 16 }}>가장 잘 맞는 조합</h2>

        <div className="combo-row">
          <span className="pill pill--primary">추천</span>
          {primary.map((t) => (
            <span key={t.id} className="chip">{t.name}</span>
          ))}
        </div>

        {also.length > 0 && (
          <div className="combo-row">
            <span className="pill pill--also">함께 쓰면 좋은</span>
            {also.map((t) => (
              <span key={t.id} className="chip">{t.name}</span>
            ))}
          </div>
        )}

        <p className="reason-text">{reason}</p>
        {notes.map((note, i) => (
          <p key={i} className="reason-text text-muted text-sm">{note}</p>
        ))}
      </div>
    </section>
  )
}
