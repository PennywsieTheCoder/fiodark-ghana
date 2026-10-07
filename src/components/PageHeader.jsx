import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUp, Moon, Sun } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { sitePath } from '../utils/sitePath'

export default function PageHeader({ active = '', overlay = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem('fiodark-theme')
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const links = [
    ['Home', sitePath('/')],
    ['Services', sitePath('/services')],
    ['Contact', sitePath('/contact')],
    ['About', sitePath('/about')],
  ]
  const visibleLinks = overlay ? links.slice(1) : links

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    window.localStorage.setItem('fiodark-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const updateHeader = () => {
      setScrolled(window.scrollY > 6)
      setShowBackToTop(window.scrollY > Math.max(500, window.innerHeight * 0.65))
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const toggleTheme = () => setDarkMode((current) => !current)

  return (
    <header className={`site-header ${overlay ? 'site-header-overlay' : 'about-header'}${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-is-open' : ''}`}>
      <div className="header-bar">
        <BrandLogo light={overlay} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {visibleLinks.map(([label, href]) => <a className={active === label.toLowerCase() ? 'active' : ''} href={href} key={label}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className={`theme-toggle${darkMode ? ' is-dark' : ''}`} type="button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Light mode' : 'Dark mode'} aria-pressed={darkMode} onClick={toggleTheme}>{darkMode ? <Sun key="sun" size={20} /> : <Moon key="moon" size={20} />}</button>
          <a className="header-cta" href={`${sitePath('/services')}?openQuote=1#request-quote`}>Request a quote <ArrowRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`} id="mobile-navigation" aria-hidden={!menuOpen} onClick={() => setMenuOpen(false)}><div className="mobile-menu-panel" onClick={(event) => event.stopPropagation()}><nav aria-label="Mobile navigation">{visibleLinks.map(([label, href]) => <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="mobile-quote" href={`${sitePath('/services')}?openQuote=1#request-quote`} onClick={() => setMenuOpen(false)}>Request a quote <ArrowRight size={17} /></a></nav></div></div>
      <button className={`back-to-top${showBackToTop ? ' is-visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>
    </header>
  )
}
