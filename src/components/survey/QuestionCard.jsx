import OptionButton from './OptionButton.jsx'

export default function QuestionCard({ question, currentIndex, total, selectedValue, onSelect }) {
  const isMultiSelect = question.multiSelect === true
  const isCardType = question.options.some((opt) => opt.icon)
  const selectedArr = isMultiSelect ? (Array.isArray(selectedValue) ? selectedValue : []) : []

  const handleClick = (value) => {
    if (isMultiSelect) {
      const maxSelect = question.maxSelect || Infinity
      if (selectedArr.includes(value)) {
        onSelect(selectedArr.filter((v) => v !== value))
      } else if (selectedArr.length < maxSelect) {
        onSelect([...selectedArr, value])
      }
    } else {
      onSelect(value)
    }
  }

  const isSelected = (value) => {
    if (isMultiSelect) return selectedArr.includes(value)
    return selectedValue === value
  }

  return (
    <div>
      <p className="survey-step">{currentIndex + 1} / {total}</p>
      <h2 className="survey-question">{question.text}</h2>
      {question.subtext ? (
        <p className="survey-subtext">{question.subtext}</p>
      ) : (
        <div style={{ marginBottom: 24 }} />
      )}
      <div className={isCardType ? 'category-grid' : 'survey-options'}>
        {question.options.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            icon={opt.icon}
            description={opt.description}
            selected={isSelected(opt.value)}
            onClick={() => handleClick(opt.value)}
            variant={isCardType ? 'card' : 'default'}
          />
        ))}
      </div>
    </div>
  )
}
