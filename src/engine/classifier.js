/**
 * classifier.js
 * 서베이 답변 → 분류 축(persona, skill, constraints) 변환
 * v2.1: q_role → persona 직접 매핑, q_ai_experience → aiLevel 추가
 */

const ROLE_TO_PERSONA = {
  side_builder: 'side_builder',
  idea_demo: 'idea_demo',
  founder: 'founder',
  pm: 'strategist',
  marketer: 'marketer',
  dev: 'solo_dev',
  lead: 'team_lead',
  career_ai: 'career_ai',
};

const SKILL_MAP = {
  none: 'low',
  basic: 'low',
  simple: 'med',
  comfortable: 'high',
  expert: 'high',
};

const AI_LEVEL_MAP = {
  none: 'beginner',
  tried: 'intermediate',
  active: 'advanced',
};

/**
 * 서베이 답변 객체 → 분류 프로필 변환
 */
export function classify(answers) {
  const role = answers.q_role || 'side_builder';
  const codeComfort = answers.q_code_comfort || 'none';
  const team = answers.q_team || 'solo';

  // 1. persona 결정: q_role이 직접 매핑
  let persona = ROLE_TO_PERSONA[role] || 'side_builder';

  // 2. team override: team(4+)이면서 solo_dev → team_lead
  if (team === 'team' && persona === 'solo_dev') {
    persona = 'team_lead';
  }

  // 3. skill 결정
  const skill = SKILL_MAP[codeComfort] || 'low';

  // 4. AI 경험 수준
  const aiLevel = AI_LEVEL_MAP[answers.q_ai_experience] || 'beginner';

  return {
    persona,
    skill,
    aiLevel,
    security: answers.q_security || 'low',
    ecosystem: answers.q_ecosystem || 'any',
    urgency: answers.q_urgency || 'this_week',
    outputType: answers.q_output || 'demo',
  };
}
