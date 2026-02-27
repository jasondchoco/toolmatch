export default function OptionButton({ label, icon, description, selected, onClick, variant }) {
  if (variant === 'card') {
    return (
      <button
        className={`category-card${selected ? ' category-card--selected' : ''}`}
        onClick={onClick}
        type="button"
      >
        <span className="category-card__icon">{icon}</span>
        <span className="category-card__label">{label}</span>
        {description && <span className="category-card__desc">{description}</span>}
      </button>
    )
  }

  return (
    <button
      className={`option-btn${selected ? ' option-btn--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
