import { useReducer, useCallback, useState } from 'react'
import questionsData from '../data/questions.json'
import ProgressBar from '../components/survey/ProgressBar.jsx'
import QuestionCard from '../components/survey/QuestionCard.jsx'

const questions = questionsData.questions

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      }
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, questions.length - 1) }
    case 'PREV':
      return { ...state, step: Math.max(state.step - 1, 0) }
    default:
      return state
  }
}

export default function SurveyPage({ onComplete }) {
  const [state, dispatch] = useReducer(reducer, {
    step: 0,
    answers: {},
  })
  const [animating, setAnimating] = useState(false)

  const { step, answers } = state
  const question = questions[step]
  const isLast = step === questions.length - 1
  const hasAnswer = answers[question.id] !== undefined
  const answeredCount = Object.keys(answers).length

  const animateNext = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      dispatch({ type: 'NEXT' })
      setAnimating(false)
    }, 150)
  }, [])

  const handleNext = useCallback(() => {
    if (!hasAnswer) return
    if (isLast) {
      onComplete(answers)
    } else {
      animateNext()
    }
  }, [hasAnswer, isLast, answers, onComplete, animateNext])

  const handlePrev = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      dispatch({ type: 'PREV' })
      setAnimating(false)
    }, 150)
  }, [])

  const handleOptionSelect = useCallback((value) => {
    dispatch({ type: 'SELECT', questionId: question.id, value })
    if (!isLast) {
      setTimeout(() => animateNext(), 350)
    }
  }, [question.id, isLast, animateNext])

  return (
    <div>
      <ProgressBar current={answeredCount} total={questions.length} />
      <div className={`survey-question-area${animating ? ' survey-question-area--exit' : ''}`}>
        <QuestionCard
          question={question}
          currentIndex={step}
          total={questions.length}
          selectedValue={answers[question.id]}
          onSelect={handleOptionSelect}
        />
      </div>
      {isLast && hasAnswer ? (
        <div style={{ marginTop: 32 }}>
          <button className="btn btn--primary" onClick={handleNext} style={{ width: '100%' }}>
            결과 보기
          </button>
        </div>
      ) : step > 0 ? (
        <div className="survey-nav">
          <button className="btn btn--small" onClick={handlePrev}>
            ← 이전
          </button>
        </div>
      ) : null}
    </div>
  )
}
