const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzD7osekZREvpvqlfpmXUNmXe3G6A2khZJ-UCAtlQGlaW1T7kc_sR015WWPdyjiI3N7/exec'

let sessionId = null

export function getSessionId() {
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  }
  return sessionId
}

export function sendTrackingEvent(payload) {
  try {
    fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // silent fail
  }
}
