import { useReducer, useCallback } from 'react'
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

  const { step, answers } = state
  const question = questions[step]
  const isLast = step === questions.length - 1
  const hasAnswer = answers[question.id] !== undefined

  const handleSelect = useCallback((value) => {
    dispatch({ type: 'SELECT', questionId: question.id, value })
  }, [question.id])

  const handleNext = useCallback(() => {
    if (!hasAnswer) return
    if (isLast) {
      onComplete(answers)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }, [hasAnswer, isLast, answers, onComplete])

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV' })
  }, [])

  // 옵션 선택 시 자동 진행 (마지막 문항 제외)
  const handleOptionSelect = useCallback((value) => {
    dispatch({ type: 'SELECT', questionId: question.id, value })
    if (!isLast) {
      // 약간의 딜레이로 선택 애니메이션 보여주기
      setTimeout(() => dispatch({ type: 'NEXT' }), 200)
    }
  }, [question.id, isLast])

  return (
    <div>
      <ProgressBar current={step} total={questions.length} />
      <QuestionCard
        question={question}
        currentIndex={step}
        total={questions.length}
        selectedValue={answers[question.id]}
        onSelect={handleOptionSelect}
      />
      <div className="survey-nav">
        <button
          className="btn btn--small"
          onClick={handlePrev}
          disabled={step === 0}
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
        >
          ← 이전
        </button>
        {isLast && hasAnswer && (
          <button className="btn btn--primary" onClick={handleNext}>
            결과 보기
          </button>
        )}
      </div>
    </div>
  )
}
