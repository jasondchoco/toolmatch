// AI로 [카테고리]를 — 조사 포함
// 한국어 받침 여부 → 조사 선택
function hasBatchim(str) {
  const code = str[str.length - 1].charCodeAt(0)
  if (code < 0xAC00 || code > 0xD7A3) return false
  return (code - 0xAC00) % 28 !== 0
}

const categoryPhrases = {
  writing: 'AI로 글쓰기·편집을',
  image: 'AI로 이미지 생성을',
  video: 'AI로 영상 만들기를',
  music: 'AI로 음악 만들기를',
  voice: 'AI로 음성·보이스 작업을',
  coding: 'AI로 코딩·개발을',
  automation: 'AI로 업무 자동화를',
  research: 'AI로 리서치·분석을',
  presentation: 'AI로 발표 자료 만들기를',
  data: 'AI로 데이터 분석을',
  office: 'AI로 오피스 문서 작업을',
}

const contextMap = {
  work: '직장에서',
  study: '공부·학업에서',
  hobby: '취미로',
  business: '사업에서',
}

const experienceMap = {
  beginner: '처음 시작하시는군요.',
  tried: '써보신 적 있으시군요.',
  active: '이미 잘 활용하고 계시는군요.',
}

const urgencyBudgetMap = {
  today: {
    free_only: '지금 바로 무료로 시작할 수 있는 도구를 골랐어요.',
    low_budget: '지금 바로 부담 없이 시작할 수 있는 도구를 골랐어요.',
    any_budget: '지금 바로 시작할 수 있는 최적의 도구를 골랐어요.',
  },
  this_week: {
    free_only: '이번 주 안에 무료로 시작할 수 있는 도구를 골랐어요.',
    low_budget: '이번 주 안에 부담 없이 시작할 수 있는 도구를 골랐어요.',
    any_budget: '이번 주 안에 시작할 수 있는 최적의 도구를 골랐어요.',
  },
  exploring: {
    free_only: '천천히 탐색하면서 무료로 써볼 수 있는 도구를 골랐어요.',
    low_budget: '천천히 탐색하면서 합리적인 비용의 도구를 골랐어요.',
    any_budget: '상황에 맞는 최적의 도구를 찾아봤어요.',
  },
}

export function generateNarrative(profile) {
  const { categories = [], experience, context, urgency, budget } = profile

  let catText
  if (categories.length === 0) {
    catText = 'AI를'
  } else if (categories.length === 1) {
    catText = categoryPhrases[categories[0]] || 'AI를'
  } else {
    // 2개: "AI로 영상 만들기와 업무 자동화를"
    const labels = categories.map((c) => {
      const phrase = categoryPhrases[c] || ''
      return phrase.replace(/^AI로 /, '').replace(/[을를]$/, '')
    }).filter(Boolean)
    const connector = hasBatchim(labels[0]) ? '과 ' : '와 '
    const eul = hasBatchim(labels[labels.length - 1]) ? '을' : '를'
    catText = `AI로 ${labels.join(connector)}${eul}`
  }

  const contextText = contextMap[context] || ''
  const expText = experienceMap[experience] || '시작하시는군요.'

  const line1 = [contextText, catText, expText].filter(Boolean).join(' ')
  const line2 = urgencyBudgetMap[urgency]?.[budget] || '딱 맞는 도구를 골랐어요.'

  return { line1, line2 }
}
