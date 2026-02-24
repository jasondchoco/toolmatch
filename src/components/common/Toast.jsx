import { useState, useEffect, useCallback } from 'react'

let _showToast = () => {}

export function showToast(message) {
  _showToast(message)
}

export default function Toast() {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)

  const show = useCallback((message) => {
    setMsg(message)
    setVisible(true)
    setTimeout(() => setVisible(false), 2000)
  }, [])

  useEffect(() => {
    _showToast = show
    return () => { _showToast = () => {} }
  }, [show])

  return (
    <div className={`toast${visible ? ' toast--visible' : ''}`}>
      {msg}
    </div>
  )
}
