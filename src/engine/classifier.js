/**
 * classifier.js
 * 서베이 답변 → 분류 축(persona, skill, constraints) 변환
 */

const PERSONA_MATRIX = {
  // [q_goal][q_role] → persona
  idea_to_demo: {
    pm: 'idea_demo',
    dev: 'idea_demo',
    lead: 'idea_demo',
    founder: 'idea_demo',
    other: 'idea_demo',
  },
  dev_speed: {
    pm: 'pm_research',
    dev: 'solo_dev',
    lead: 'team_lead',
    founder: 'solo_dev',
    other: 'solo_dev',
  },
  research_docs: {
    pm: 'pm_research',
    dev: 'pm_research',
    lead: 'pm_research',
    founder: 'pm_research',
    other: 'pm_research',
  },
  parallel_ops: {
    pm: 'team_lead',
    dev: 'solo_dev',
    lead: 'team_lead',
    founder: 'team_lead',
    other: 'team_lead',
  },
};

const SKILL_MAP = {
  none: 'low',
  basic: 'low',
  simple: 'med',
  comfortable: 'high',
  expert: 'high',
};

/**
 * 서베이 답변 객체 → 분류 프로필 변환
 * @param {Object} answers - { q_role, q_goal, q_code_comfort, q_team, q_output, q_security, q_ecosystem, q_urgency }
 * @returns {Object} classification profile
 */
export function classify(answers) {
  const role = answers.q_role || 'other';
  const goal = answers.q_goal || 'idea_to_demo';
  const codeComfort = answers.q_code_comfort || 'none';
  const team = answers.q_team || 'solo';

  // 1. persona 결정: goal이 가장 강한 시그널
  let persona = PERSONA_MATRIX[goal]?.[role] || 'idea_demo';

  // 2. team override: team(4+)이면서 solo_dev → team_lead
  if (team === 'team' && persona === 'solo_dev') {
    persona = 'team_lead';
  }

  // 3. skill 결정
  const skill = SKILL_MAP[codeComfort] || 'low';

  return {
    persona,
    skill,
    security: answers.q_security || 'low',
    ecosystem: answers.q_ecosystem || 'any',
    urgency: answers.q_urgency || 'this_week',
    outputType: answers.q_output || 'demo',
  };
}
