import { useState, useCallback } from 'react'

export default function Header({ onLogoClick }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  )

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', next)
    setTheme(next)
  }, [theme])

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo" onClick={(e) => { e.preventDefault(); onLogoClick?.(); }}>
          ToolMatch
        </a>
        <span className="header__tagline">AI 도구 추천 가이드</span>
        <button className="theme-toggle" onClick={toggleTheme} type="button" aria-label="테마 변경">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
