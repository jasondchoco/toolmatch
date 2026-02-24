import { useState, useCallback, useEffect } from 'react'
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import Toast from './components/common/Toast.jsx'
import SurveyPage from './pages/SurveyPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import FeedbackPage from './pages/FeedbackPage.jsx'

function getInitialPage() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('p') && params.has('s')) return 'result'
  return 'landing'
}

export default function App() {
  const [page, setPage] = useState(getInitialPage)
  const [answers, setAnswers] = useState(null)
  const [shareActions, setShareActions] = useState([])

  const handleShare = useCallback((action) => {
    setShareActions((prev) => prev.includes(action) ? prev : [...prev, action])
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const startSurvey = useCallback(() => setPage('survey'), [])

  const completeSurvey = useCallback((surveyAnswers) => {
    setAnswers(surveyAnswers)
    setPage('result')
  }, [])

  const restart = useCallback(() => {
    setAnswers(null)
    window.history.replaceState({}, '', window.location.pathname)
    setPage('landing')
  }, [])

  const openFeedback = useCallback(() => {
    window.history.pushState({ page: 'feedback' }, '', '')
    setPage('feedback')
  }, [])
  const backToResult = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      if (params.has('p') && params.has('s')) {
        setPage('result')
      } else {
        setPage('landing')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <>
      <Header onLogoClick={restart} />
      <main className="page">
        <div className="container">
          {page === 'landing' && (
            <div className="landing">
              <h1>나에게 맞는 AI 도구 찾기</h1>
              <p className="landing__desc">
                몇 가지 질문에 답하면, 당신의 상황에 맞는 AI 도구를 추천하고
                어떻게 시작하면 되는지까지 알려드려요.
              </p>
              <button className="btn btn--primary btn--large" onClick={startSurvey}>
                무료로 추천받기
              </button>
              <p className="text-muted text-sm" style={{ marginTop: 4 }}>
                8개 질문 · 2분이면 끝 · Cursor, ChatGPT, Claude 등 8개 도구
              </p>
            </div>
          )}
          {page === 'survey' && (
            <SurveyPage onComplete={completeSurvey} />
          )}
          {page === 'result' && (
            <ResultPage answers={answers} onRestart={restart} onOpenFeedback={openFeedback} onShare={handleShare} />
          )}
          {page === 'feedback' && (
            <FeedbackPage onBack={backToResult} answers={answers} shareActions={shareActions} />
          )}
        </div>
      </main>
      <Footer />
      <Toast />
    </>
  )
}
