import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUp, Menu, Moon, Sun, X } from 'lucide-react'
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
      setScrolled(window.scrollY > 32)
      setShowBackToTop(window.scrollY > Math.max(500, window.innerHeight * 0.65))
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  const toggleTheme = () => setDarkMode((current) => !current)

  return (
    <header className={`site-header ${overlay ? 'site-header-overlay' : 'about-header'}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-bar">
        <BrandLogo light={overlay} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {visibleLinks.map(([label, href]) => <a className={active === label.toLowerCase() ? 'active' : ''} href={href} key={label}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Light mode' : 'Dark mode'} onClick={toggleTheme}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button>
          <a className="header-cta" href={`${sitePath('/services')}?openQuote=1#request-quote`}>Request a quote <ArrowRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={23} /></button>
        </div>
      </div>
      {menuOpen && <div className="mobile-menu"><div className="mobile-menu-head"><BrandLogo /><button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X /></button></div><nav aria-label="Mobile navigation">{visibleLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}<button className="mobile-theme-toggle" type="button" onClick={toggleTheme}>{darkMode ? <><Sun size={18} /> Light mode</> : <><Moon size={18} /> Dark mode</>}</button><a className="mobile-quote" href={`${sitePath('/services')}?openQuote=1#request-quote`}>Request a quote <ArrowRight size={17} /></a></nav></div>}
      <button className={`back-to-top${showBackToTop ? ' is-visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>
    </header>
  )
}
