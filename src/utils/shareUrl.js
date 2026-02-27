/**
 * v3 프로필 → URL 파라미터 인코딩/디코딩
 */

export function generateShareUrl(profile) {
  const params = new URLSearchParams({
    c: (profile.categories || []).join(','),
    e: profile.experience || 'beginner',
    ctx: profile.context || 'work',
    u: profile.urgency || 'this_week',
    b: profile.budget || 'any_budget',
    t: profile.soloTeam || 'solo',
  })
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function loadProfileFromUrl() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('c') && params.has('e')) {
    return {
      categories: (params.get('c') || '').split(',').filter(Boolean),
      experience: params.get('e') || 'beginner',
      context: params.get('ctx') || 'work',
      urgency: params.get('u') || 'this_week',
      budget: params.get('b') || 'any_budget',
      soloTeam: params.get('t') || 'solo',
    }
  }
  return null
}
