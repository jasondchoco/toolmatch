/**
 * recommender.js
 * 분류 프로필 → 규칙 매칭 + 추천 결과 생성
 */

import rulesData from '../data/rules.json';
import toolsData from '../data/tools.json';

const toolsMap = {};
toolsData.tools.forEach((t) => { toolsMap[t.id] = t; });

/**
 * 규칙 조건이 분류 프로필에 매칭되는지 확인
 */
function matchesConditions(conditions, profile) {
  for (const [key, value] of Object.entries(conditions)) {
    if (profile[key] !== value) return false;
  }
  return true;
}

/**
 * 분류 프로필을 기반으로 추천 결과 생성
 * @param {Object} profile - classify()의 반환값
 * @returns {Object} { primary: Tool[], also: Tool[], reason, pitch, notes, persona }
 */
export function recommend(profile) {
  const { rules, constraintModifiers, personas } = rulesData;

  // 1. 위→아래로 첫 매칭 규칙 선택
  let matched = null;
  for (const rule of rules) {
    if (Object.keys(rule.conditions).length === 0) continue; // fallback 스킵
    if (matchesConditions(rule.conditions, profile)) {
      matched = rule;
      break;
    }
  }

  // 2. 매칭 없으면 fallback (마지막 규칙)
  if (!matched) {
    matched = rules[rules.length - 1];
  }

  // 3. 결과 복사
  let primaryIds = [...matched.primary];
  let alsoIds = [...matched.also];
  const notes = [];

  // 4. constraint modifiers 적용
  for (const mod of constraintModifiers) {
    const [condKey, condVal] = Object.entries(mod.condition)[0];
    if (profile[condKey] === condVal) {
      if (mod.demote) {
        for (const toolId of mod.demote) {
          if (primaryIds.includes(toolId)) {
            primaryIds = primaryIds.filter((t) => t !== toolId);
            alsoIds.push(toolId);
          } else if (alsoIds.includes(toolId)) {
            alsoIds = [...alsoIds.filter((t) => t !== toolId), toolId];
          }
        }
      }
      if (mod.boost) {
        for (const toolId of mod.boost) {
          if (!primaryIds.includes(toolId) && !alsoIds.includes(toolId)) {
            alsoIds.unshift(toolId);
          } else if (alsoIds.includes(toolId)) {
            alsoIds = [toolId, ...alsoIds.filter((t) => t !== toolId)];
          }
        }
      }
      if (mod.note) {
        notes.push(mod.note);
      }
    }
  }

  // 5. 중복 제거, 제한
  alsoIds = alsoIds.filter((t) => !primaryIds.includes(t));
  primaryIds = primaryIds.slice(0, 2);
  alsoIds = alsoIds.slice(0, 2);

  // 6. ID → Tool 객체 변환
  const primaryTools = primaryIds.map((id) => toolsMap[id]).filter(Boolean);
  const alsoTools = alsoIds.map((id) => toolsMap[id]).filter(Boolean);

  // 7. persona 정보
  const personaInfo = personas[profile.persona] || personas.idea_demo;

  return {
    primary: primaryTools,
    also: alsoTools,
    reason: matched.reason,
    pitch: matched.pitch,
    playbook: matched.playbook || [],
    notes,
    persona: personaInfo,
    personaKey: profile.persona,
    profile,
  };
}

/**
 * 추천된 모든 툴(primary + also) 반환
 */
export function getAllRecommendedTools(result) {
  return [...result.primary, ...result.also];
}
