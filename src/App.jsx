import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Container,
  FileCheck2,
  Globe2,
  PackageCheck,
  Plane,
  Route,
  Ship,
  Truck,
} from 'lucide-react'
import heroImage from './assets/fiodark-hero-v1.png'
import mobileHeroImage from './assets/fiodark-hero-mobile-v1.png'
import seaFreightImage from './assets/service-sea-freight-v1.jpg'
import airFreightImage from './assets/service-air-freight-v1.jpg'
import customsClearanceImage from './assets/service-customs-clearance-v1.jpg'
import haulageImage from './assets/service-haulage-v1.jpg'
import cargoHandlingImage from './assets/service-cargo-handling-v1.jpg'
import tradeConsultancyImage from './assets/service-trade-consultancy-v1.jpg'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import PrivacyPage from './PrivacyPage'
import ServicesPage from './ServicesPage'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import useScrollAnimations from './hooks/useScrollAnimations'
import { currentSitePath, sitePath } from './utils/sitePath'

const services = [
  {
    icon: Ship,
    image: seaFreightImage,
    title: 'Sea Freight',
    text: 'Coordinated import and export solutions for containerised and general cargo.',
  },
  {
    icon: Plane,
    image: airFreightImage,
    title: 'Air Freight',
    text: 'Responsive handling for urgent and time-sensitive shipments by air.',
  },
  {
    icon: FileCheck2,
    image: customsClearanceImage,
    title: 'Customs Clearance',
    text: 'Experienced support through documentation, port processes and clearance.',
  },
  {
    icon: Truck,
    image: haulageImage,
    title: 'Haulage & Delivery',
    text: 'Dependable inland transport from the port to your final destination.',
  },
  {
    icon: Container,
    image: cargoHandlingImage,
    title: 'Cargo Handling',
    text: 'Practical guidance on packaging, loading, containers and cargo conditions.',
  },
  {
    icon: Globe2,
    image: tradeConsultancyImage,
    title: 'Trade Consultancy',
    text: 'Clear direction for international trade, shipping and freight decisions.',
  },
]

const process = [
  { icon: ClipboardCheck, title: 'Tell us your needs', text: 'Share the cargo type, route and timing.' },
  { icon: Route, title: 'We plan the movement', text: 'We coordinate documentation and logistics.' },
  { icon: PackageCheck, title: 'Your cargo is delivered', text: 'We manage the journey through final delivery.' },
]

function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      return undefined
    }

    let animationFrame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return

      const duration = 1400
      const startedAt = performance.now()
      const animate = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(value * eased))
        if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
      }

      animationFrame = window.requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.45 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [value])

  return <strong ref={counterRef} aria-label={`${value}${suffix}`}><span aria-hidden="true">{count}{suffix}</span></strong>
}

function App() {
  const pageRef = useScrollAnimations()

  const currentPath = currentSitePath()
  if (currentPath === '/about') return <AboutPage />
  if (currentPath === '/services') return <ServicesPage />
  if (currentPath === '/contact') return <ContactPage />
  if (currentPath === '/privacy') return <PrivacyPage />

  return (
    <div className="site-shell page-enter" id="top" ref={pageRef}>
      <PageHeader active="home" overlay />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image hero-image-desktop" src={heroImage} alt="Container ship at sea with a cargo aircraft above a modern port" />
          <img className="hero-image hero-image-mobile" src={mobileHeroImage} alt="Container ship, cargo aircraft and freight terminal arranged for a mobile view" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-trust-badge"><span aria-hidden="true" />Trusted Ghanaian freight expertise <strong>since 2001</strong></p>
            <h1 id="hero-title">Moving Ghana’s trade <em>across the world.</em></h1>
            <p className="hero-copy">Reliable freight forwarding, customs clearance and cargo logistics connecting Ghana to partners around the world.</p>
            <div className="hero-actions">
              <a className="button hero-primary-action" href={`${sitePath('/services')}#request-quote`}>Request a quote <ArrowRight size={17} /></a>
              <a className="button button-ghost" href={sitePath('/services')}>Explore our services</a>
            </div>
          </div>
        </section>

        <section className="trust-band" id="company-strengths" aria-label="Company strengths">
          <div className="trust-intro"><p>Service with distinction</p><h2>Experience clients can count on.</h2></div>
          <article><AnimatedCounter value={25} suffix="+" /><span>Years of clearing and freight experience</span></article>
          <article><AnimatedCounter value={21} suffix="+" /><span>Years serving long-standing clients</span></article>
          <article><AnimatedCounter value={41} /><span>Years of leadership in shipping</span></article>
        </section>

        <section className="about section" id="about">
          <div className="section-kicker">Built on experience</div>
          <div className="about-grid">
            <div>
              <h2>Moving cargo with clarity, care and confidence.</h2>
            </div>
            <div className="about-copy">
              <p>FIODARK Ghana provides freight forwarding, customs clearance, trucking and consultancy services for importers and exporters. Our knowledge of local port and customs operations helps clients move goods efficiently while they focus on their core business.</p>
              <a className="text-link" href={sitePath('/about')}>Discover FIODARK Ghana <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading">
            <div><p className="section-kicker">End-to-end support</p><h2>Freight services shaped around your cargo.</h2></div>
            <p>From documentation and clearance to transportation and delivery, our team coordinates the details that keep goods moving.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, image, title, text }) => (
              <article className="service-card" key={title}>
                <div className="service-card-image">
                  <img src={image} alt={`${title} service`} loading="lazy" />
                </div>
                <div className="service-card-body">
                  <div className="service-card-title"><Icon size={22} strokeWidth={1.6} /><h3>{title}</h3></div>
                  <p>{text}</p>
                  <a href={`${sitePath('/services')}?service=${encodeURIComponent(title)}#request-quote`} aria-label={`Request a quote for ${title}`}>View service <ChevronRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="why-us">
          <div className="why-panel">
            <p className="section-kicker section-kicker-light">Why FIODARK Ghana</p>
            <h2>Experienced guidance at every stage of the journey.</h2>
            <div className="why-list">
              <p><CheckCircle2 /> In-depth knowledge of Ghana's port and customs operations</p>
              <p><CheckCircle2 /> Practical solutions tailored to each shipment</p>
              <p><CheckCircle2 /> Long-standing relationships built on dependable service</p>
              <p><CheckCircle2 /> Professional leadership in shipping and logistics</p>
            </div>
          </div>
          <div className="why-visual">
            <img src={cargoHandlingImage} alt="Cargo handling team coordinating a shipment" loading="lazy" />
            <div className="why-visual-caption">
              <span>Local knowledge</span>
              <strong>Port, customs and delivery coordinated by one experienced team.</strong>
            </div>
          </div>
        </section>

        <section className="process section" id="process">
          <div className="section-heading process-heading">
            <div><p className="section-kicker">A clear process</p><h2>From request to final delivery.</h2></div>
            <p>One experienced team coordinates each stage and keeps your shipment moving.</p>
          </div>
          <div className="process-grid">
            {process.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div className="process-icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="quote home-quote" id="quote">
          <div>
            <p className="section-kicker section-kicker-light">Plan your next shipment</p>
            <h2>Tell us what needs to move.</h2>
          </div>
          <div>
            <p>Share the cargo type, origin, destination and timing. Our team will help you plan the right freight, clearance and delivery approach.</p>
            <a className="button button-white" href={`${sitePath('/services')}#request-quote`}>Start a quote <ArrowRight size={17} /></a>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  )
}

export default App
