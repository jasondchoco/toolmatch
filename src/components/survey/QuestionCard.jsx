import OptionButton from './OptionButton.jsx'

export default function QuestionCard({ question, currentIndex, total, selectedValue, onSelect }) {
  return (
    <div>
      <p className="survey-step">{currentIndex + 1} / {total}</p>
      <h2 className="survey-question">{question.text}</h2>
      {question.subtext && (
        <p className="survey-subtext">{question.subtext}</p>
      )}
      <div className="survey-options">
        {question.options.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            selected={selectedValue === opt.value}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  )
}
