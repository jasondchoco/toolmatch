/**
 * 분류 프로필 → URL 파라미터 인코딩/디코딩
 */

export function generateShareUrl(profile) {
  const params = new URLSearchParams({
    p: profile.persona,
    s: profile.skill,
    sec: profile.security || 'low',
    eco: profile.ecosystem || 'any',
    u: profile.urgency || 'this_week',
  })
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function loadProfileFromUrl() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('p') && params.has('s')) {
    return {
      persona: params.get('p'),
      skill: params.get('s'),
      security: params.get('sec') || 'low',
      ecosystem: params.get('eco') || 'any',
      urgency: params.get('u') || 'this_week',
    }
  }
  return null
}
