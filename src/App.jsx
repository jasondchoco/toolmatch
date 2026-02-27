import { useState, useCallback, useEffect } from 'react'
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import Toast from './components/common/Toast.jsx'
import SurveyPage from './pages/SurveyPage.jsx'
import ResultPage from './pages/ResultPage.jsx'

function getInitialPage() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('c') && params.has('e')) return 'result'
  return 'landing'
}

export default function App() {
  const [page, setPage] = useState(getInitialPage)
  const [answers, setAnswers] = useState(null)
  const [editingAnswers, setEditingAnswers] = useState(null)

  const handleShare = useCallback(() => {}, [])

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
    setEditingAnswers(null)
    window.history.replaceState({}, '', window.location.pathname)
    setPage('landing')
  }, [])

  const editSurvey = useCallback(() => {
    setEditingAnswers(answers)
    setPage('survey')
  }, [answers])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      if (params.has('c') && params.has('e')) {
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
                하고 싶은 일을 고르면, 당신의 상황에 맞는 AI 도구를 추천하고
                어떻게 시작하면 되는지까지 알려드려요.
              </p>
              <md-filled-button
                onClick={startSurvey}
                style={{ '--md-filled-button-container-shape': '20px', minWidth: '200px', height: '56px', fontSize: '17px' }}
              >
                무료로 추천받기
              </md-filled-button>
              <p className="text-muted text-sm" style={{ marginTop: 4 }}>
                6개 질문 · 1분이면 끝 · 35개 AI 도구
              </p>
            </div>
          )}
          {page === 'survey' && (
            <SurveyPage onComplete={completeSurvey} initialAnswers={editingAnswers} />
          )}
          {page === 'result' && (
            <ResultPage answers={answers} onRestart={restart} onEdit={editSurvey} onShare={handleShare} />
          )}
        </div>
      </main>
      <Footer />
      <Toast />
    </>
  )
}
