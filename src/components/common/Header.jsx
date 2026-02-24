export default function Header({ onLogoClick }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo" onClick={(e) => { e.preventDefault(); onLogoClick?.(); }}>
          ToolMatch
        </a>
        <span className="header__tagline">AI 도구 추천 가이드</span>
      </div>
    </header>
  )
}
