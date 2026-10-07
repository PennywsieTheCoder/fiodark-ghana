import { useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react'

const TURNSTILE_SITE_KEY = '0x4AAAAAAFQZAif-ASx4ZCB5'
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let turnstileLoader

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (turnstileLoader) return turnstileLoader

  turnstileLoader = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)
    const script = existingScript || document.createElement('script')

    const handleLoad = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile did not initialise.'))
    const handleError = () => reject(new Error('Turnstile could not be loaded.'))

    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })

    if (!existingScript) {
      script.src = TURNSTILE_SCRIPT
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  })

  return turnstileLoader
}

export default function TurnstileField({ onVerify, resetSignal = 0 }) {
  const containerRef = useRef(null)
  const onVerifyRef = useRef(onVerify)
  const [status, setStatus] = useState('loading')
  const [errorCode, setErrorCode] = useState('')
  const [retryAttempt, setRetryAttempt] = useState(0)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    onVerifyRef.current = onVerify
  }, [onVerify])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false
    let widgetId
    setStatus('loading')
    setErrorCode('')
    onVerifyRef.current(false)

    loadTurnstile().then((turnstile) => {
      if (cancelled || !containerRef.current) return
      widgetId = turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme,
        appearance: 'interaction-only',
        size: 'flexible',
        retry: 'auto',
        'retry-interval': 5000,
        'refresh-expired': 'auto',
        'refresh-timeout': 'auto',
        callback: () => {
          setStatus('verified')
          setErrorCode('')
          onVerifyRef.current(true)
        },
        'expired-callback': () => {
          setStatus('expired')
          onVerifyRef.current(false)
        },
        'error-callback': (code) => {
          setStatus('error')
          setErrorCode(String(code || ''))
          onVerifyRef.current(false)
        },
        'timeout-callback': () => {
          setStatus('expired')
          onVerifyRef.current(false)
        },
        'unsupported-callback': () => {
          setStatus('unsupported')
          onVerifyRef.current(false)
        },
      })
    }).catch(() => {
      if (!cancelled) {
        setStatus('error')
        onVerifyRef.current(false)
      }
    })

    return () => {
      cancelled = true
      if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [resetSignal, retryAttempt, theme])

  const errorMessage = errorCode.startsWith('110200')
    ? 'This website address is not authorised for verification.'
    : errorCode.startsWith('110') || errorCode.startsWith('400')
      ? 'Security verification is not configured for this address.'
      : errorCode.startsWith('200500')
        ? 'The security check was blocked by the browser or network.'
        : 'Security verification failed. Please try again.'

  const statusContent = {
    loading: <><LoaderCircle className="turnstile-spinner" /> Running security check…</>,
    verified: <><CheckCircle2 /> Security check complete</>,
    expired: <><AlertCircle /> Verification expired. Please verify again.</>,
    error: <><AlertCircle /> {errorMessage}</>,
    unsupported: <><AlertCircle /> This browser cannot run the security check.</>,
  }

  return <div className={`form-verification is-${status}`}>
    <div className="turnstile-widget" ref={containerRef} />
    <p aria-live="polite"><ShieldCheck className="turnstile-shield" /> <span>{statusContent[status]}</span></p>
    {(status === 'error' || status === 'expired') && <button className="turnstile-retry" type="button" onClick={() => setRetryAttempt((current) => current + 1)}>Try verification again</button>}
  </div>
}
