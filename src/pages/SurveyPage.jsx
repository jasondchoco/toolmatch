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

export default function SurveyPage({ onComplete, initialAnswers }) {
  const [state, dispatch] = useReducer(reducer, {
    step: 0,
    answers: initialAnswers || {},
  })
  const [animating, setAnimating] = useState(false)

  const { step, answers } = state
  const question = questions[step]
  const isLast = step === questions.length - 1
  const isMultiSelect = question.multiSelect === true

  const currentAnswer = answers[question.id]
  const hasAnswer = isMultiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : currentAnswer !== undefined

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
    // multiSelect는 자동 advance 안 함
    if (!isMultiSelect && !isLast) {
      setTimeout(() => animateNext(), 350)
    }
  }, [question.id, isMultiSelect, isLast, animateNext])

  const showNextButton = isMultiSelect && hasAnswer && !isLast
  const showResultButton = isLast && hasAnswer

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
      {showResultButton ? (
        <div style={{ marginTop: 32 }}>
          <md-filled-button
            onClick={handleNext}
            style={{ width: '100%', '--md-filled-button-container-shape': '20px' }}
          >
            결과 보기
          </md-filled-button>
        </div>
      ) : showNextButton ? (
        <div style={{ marginTop: 32 }}>
          <md-filled-button
            onClick={handleNext}
            style={{ width: '100%', '--md-filled-button-container-shape': '20px' }}
          >
            다음
          </md-filled-button>
        </div>
      ) : null}
      {step > 0 && !showResultButton && !showNextButton && (
        <div className="survey-nav">
          <button className="btn btn--prev" onClick={handlePrev}>← 이전</button>
        </div>
      )}
      {step > 0 && (showResultButton || showNextButton) && (
        <div className="survey-nav" style={{ marginTop: 12 }}>
          <button className="btn btn--prev" onClick={handlePrev}>← 이전</button>
        </div>
      )}
    </div>
  )
}
