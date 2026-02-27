/**
 * classifier.js (v3)
 * 서베이 답변 → v3 프로필 객체 변환 (단순 pass-through)
 */

export function classify(answers) {
  return {
    categories: answers.q_category || [],
    experience: answers.q_experience || 'beginner',
    context: answers.q_context || 'work',
    urgency: answers.q_urgency || 'this_week',
    budget: answers.q_budget || 'any_budget',
    soloTeam: answers.q_solo_team || 'solo',
  }
}
