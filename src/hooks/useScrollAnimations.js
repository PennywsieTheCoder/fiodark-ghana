import { useLayoutEffect, useRef } from 'react'

const revealSelector = [
  'main > section:not(:first-child)',
  '.service-card',
  '.process-grid article',
  '.detailed-service-card',
  '.contact-details-grid article',
  '.objective-grid article',
  '.purpose-card',
  '.faq-list details',
].join(', ')

export default function useScrollAnimations() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    const elements = [...page.querySelectorAll(revealSelector)]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    elements.forEach((element) => {
      element.classList.add('scroll-reveal')
      const siblingIndex = [...element.parentElement.children].indexOf(element)
      element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex * 70, 280)}ms`)
    })

    let observer
    const frame = window.requestAnimationFrame(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      })

      elements.forEach((element) => observer.observe(element))
    })

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      elements.forEach((element) => {
        element.classList.remove('scroll-reveal', 'is-visible')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [])

  return pageRef
}
