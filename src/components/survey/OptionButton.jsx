export default function OptionButton({ label, selected, onClick }) {
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
