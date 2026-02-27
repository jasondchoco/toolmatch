/**
 * recommender.js (v3)
 * 카테고리별 categoryRules 기반 추천 엔진
 */

import rulesData from '../data/rules.json'
import toolsData from '../data/tools.json'
import questionsData from '../data/questions.json'

const toolsMap = {}
toolsData.tools.forEach((t) => { toolsMap[t.id] = t })

const categoryLabels = {}
const catQuestion = questionsData.questions.find((q) => q.id === 'q_category')
if (catQuestion) {
  catQuestion.options.forEach((opt) => { categoryLabels[opt.value] = opt.label })
}

/**
 * v3 프로필 기반 추천 결과 생성
 * @param {Object} profile - classify()의 반환값
 * @returns {Object} { categories: [...], experienceNote, profile }
 */
export function recommend(profile) {
  const { categoryRules, budgetModifiers, teamModifiers, urgencyModifiers, budgetNotes, experienceNotes } = rulesData
  const { categories, experience, context, urgency, budget, soloTeam } = profile

  const cats = categories.length > 0 ? categories : ['writing']

  const resultCategories = cats.map((cat) => {
    const rule = categoryRules[cat]
    if (!rule) return null

    // 1. byExperience에서 primary/also 결정
    const expRule = rule.byExperience?.[experience] || rule.default
    let primaryIds = [...expRule.primary]
    let alsoIds = [...expRule.also]

    // 2. budgetModifiers 적용
    if (budget && budgetModifiers[budget]) {
      const mod = budgetModifiers[budget]
      if (mod.boost) {
        for (const id of mod.boost) {
          if (alsoIds.includes(id) && !primaryIds.includes(id)) {
            // also에 있으면 앞으로
            alsoIds = [id, ...alsoIds.filter((x) => x !== id)]
          }
        }
        // boost 대상이 primary에 없고 also에도 없으면 무시 (카테고리 밖 도구)
      }
      if (mod.demote) {
        for (const id of mod.demote) {
          if (primaryIds.includes(id)) {
            primaryIds = primaryIds.filter((x) => x !== id)
            if (!alsoIds.includes(id)) alsoIds.push(id)
          }
        }
        // primary가 비어지면 also에서 승격
        if (primaryIds.length === 0 && alsoIds.length > 0) {
          primaryIds = [alsoIds.shift()]
        }
      }
    }

    // 3. teamModifiers 적용
    if (soloTeam === 'team' && teamModifiers?.team) {
      const validTypes = teamModifiers.team.boost_solo_or_team
      // team 호환 도구를 우선
      const teamFriendly = (id) => {
        const tool = toolsMap[id]
        return tool && validTypes.includes(tool.solo_or_team)
      }
      primaryIds.sort((a, b) => (teamFriendly(b) ? 1 : 0) - (teamFriendly(a) ? 1 : 0))
      alsoIds.sort((a, b) => (teamFriendly(b) ? 1 : 0) - (teamFriendly(a) ? 1 : 0))
    }

    // 중복 제거 + 제한
    alsoIds = alsoIds.filter((id) => !primaryIds.includes(id))
    primaryIds = primaryIds.slice(0, 2)
    alsoIds = alsoIds.slice(0, 2)

    // ID → Tool 객체
    const primaryTools = primaryIds.map((id) => toolsMap[id]).filter(Boolean)
    const alsoTools = alsoIds.map((id) => toolsMap[id]).filter(Boolean)

    // 4. situation 텍스트 생성
    const situationTemplate = rule.situationTemplates?.[context] || rule.situationTemplates?.work || ''
    const budgetNote = budgetNotes?.[budget] || ''
    const urgencyNote = urgencyModifiers?.[urgency]?.note || ''
    const situation = [situationTemplate, budgetNote, urgencyNote].filter(Boolean).join(' ')

    // 5. primary tool의 fit_reasons에서 이유 3개 선택
    const topReasons = []
    const mainTool = primaryTools[0]
    if (mainTool?.fit_reasons) {
      const fr = mainTool.fit_reasons
      // context, budget, experience 순으로 이유 수집
      if (fr[context]) topReasons.push(fr[context])
      if (fr[budget] && topReasons.length < 3) topReasons.push(fr[budget])
      if (fr[experience] && topReasons.length < 3) topReasons.push(fr[experience])
      if (fr[urgency] && topReasons.length < 3) topReasons.push(fr[urgency])
      if (soloTeam === 'team' && fr.team && topReasons.length < 3) topReasons.push(fr.team)
      // 부족하면 beginner/work 등 기본값
      if (topReasons.length < 3 && fr.beginner && !topReasons.includes(fr.beginner)) topReasons.push(fr.beginner)
      if (topReasons.length < 3 && fr.work && !topReasons.includes(fr.work)) topReasons.push(fr.work)
    }

    // 6. firstStep
    const firstStep = mainTool?.first_step || { action: '', prompt_example: '' }

    return {
      key: cat,
      label: categoryLabels[cat] || cat,
      situation,
      primary: primaryTools,
      also: alsoTools,
      topReasons: topReasons.slice(0, 3),
      firstStep,
    }
  }).filter(Boolean)

  return {
    categories: resultCategories,
    experienceNote: experienceNotes?.[experience] || '',
    profile,
  }
}

/**
 * 추천된 모든 툴(primary + also) 반환
 */
export function getAllRecommendedTools(result) {
  const tools = []
  for (const cat of result.categories) {
    tools.push(...cat.primary, ...cat.also)
  }
  // 중복 제거
  const seen = new Set()
  return tools.filter((t) => {
    if (seen.has(t.id)) return false
    seen.add(t.id)
    return true
  })
}
