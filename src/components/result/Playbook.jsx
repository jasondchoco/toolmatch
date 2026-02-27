export default function StartGuide({ tool, firstStep }) {
  if (!tool?.howToStart || tool.howToStart.length === 0) return null

  return (
    <section className="start-guide">
      <p className="start-guide__title">시작하는 법</p>
      <ol className="start-guide__steps">
        {tool.howToStart.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      {firstStep?.prompt_example && (
        <p className="start-guide__prompt">
          예시: <em>{firstStep.prompt_example}</em>
        </p>
      )}
    </section>
  )
}
