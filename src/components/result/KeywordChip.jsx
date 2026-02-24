export default function KeywordChip({ text, type }) {
  const cls = type === 'praised' ? 'chip chip--praised' : 'chip chip--criticized'
  return <span className={cls}>{text}</span>
}
