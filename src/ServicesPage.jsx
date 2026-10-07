import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Container,
  FileCheck2,
  Globe2,
  Plane,
  Ship,
  Truck,
} from 'lucide-react'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import QuoteRequestModal from './components/QuoteRequestModal'
import useScrollAnimations from './hooks/useScrollAnimations'
import servicesHeroImage from './assets/services-hero-v1.jpg'
import seaFreightImage from './assets/service-sea-freight-v1.jpg'
import airFreightImage from './assets/service-air-freight-v1.jpg'
import customsClearanceImage from './assets/service-customs-clearance-v1.jpg'
import haulageImage from './assets/service-haulage-v1.jpg'
import cargoHandlingImage from './assets/service-cargo-handling-v1.jpg'
import tradeConsultancyImage from './assets/service-trade-consultancy-v1.jpg'

const detailedServices = [
  {
    icon: Ship,
    image: seaFreightImage,
    title: 'Sea Freight',
    intro: 'Coordinated movement for import and export cargo through international sea routes.',
    points: ['Containerised and general cargo', 'Import and export coordination', 'Documentation and port support'],
  },
  {
    icon: Plane,
    image: airFreightImage,
    title: 'Air Freight',
    intro: 'Responsive air-cargo coordination for shipments where time and careful handling matter.',
    points: ['Time-sensitive shipments', 'Import and export cargo', 'Airport and documentation coordination'],
  },
  {
    icon: FileCheck2,
    image: customsClearanceImage,
    title: 'Customs Clearance',
    intro: 'Experienced assistance through Ghanaian customs requirements and local port processes.',
    points: ['Clearance documentation', 'Port and customs coordination', 'Import and export guidance'],
  },
  {
    icon: Truck,
    image: haulageImage,
    title: 'Haulage & Delivery',
    intro: 'Domestic transportation solutions that move cargo from the port towards its final destination.',
    points: ['Port-to-destination trucking', 'Cargo movement coordination', 'Timely domestic delivery support'],
  },
  {
    icon: Container,
    image: cargoHandlingImage,
    title: 'Cargo Handling',
    intro: 'Practical support for packaging, loading and selecting suitable container conditions.',
    points: ['Packaging and loading guidance', 'Container recommendations', 'Special cargo considerations'],
  },
  {
    icon: Globe2,
    image: tradeConsultancyImage,
    title: 'Trade Consultancy',
    intro: 'Professional direction for organisations navigating shipping, freight and international trade.',
    points: ['Shipping and freight advice', 'International trade guidance', 'Logistics planning support'],
  },
]

const serviceFaqs = [
  ['Which freight service is right for my shipment?', 'The right option depends on your cargo, origin, destination, budget and required delivery timeline. Share those details through the quote form and our team will advise you.'],
  ['Does FIODARK Ghana handle both sea and air freight?', 'Yes. We coordinate sea-freight and air-freight shipments for importers and exporters.'],
  ['Can you assist with customs clearance only?', 'Yes. Customs clearance and documentation support can be requested as a standalone service based on your shipment requirements.'],
  ['Do you transport cargo after it clears the port?', 'Yes. Our haulage and domestic freight services can coordinate movement from the port towards the agreed destination.'],
  ['What information should I provide for a quotation?', 'Provide the service needed, cargo type, approximate quantity or weight, origin, destination, expected date and any special handling requirements.'],
  ['Can you advise on containers and packaging?', 'Yes. FIODARK Ghana provides guidance on packaging, loading and suitable container conditions for different types of goods.'],
]

export default function ServicesPage() {
  const [quoteService, setQuoteService] = useState(null)
  const pageRef = useScrollAnimations()

  useEffect(() => {
    if (window.location.hash === '#request-quote') {
      const requestedService = new URLSearchParams(window.location.search).get('service')
      setQuoteService(requestedService || 'Sea Freight')
    }
  }, [])

  return (
    <div className="site-shell services-page page-enter" ref={pageRef}>
      <PageHeader active="services" />
      <main>
        <section className="inner-hero services-hero">
          <img className="page-hero-image" src={servicesHeroImage} alt="Integrated sea, air and road freight operations at a container terminal" />
          <div className="page-hero-overlay" />
          <div><p className="eyebrow"><span /> Our services</p><h1>Every detail coordinated. Every movement considered.</h1><p>Integrated freight, clearance, transportation and advisory services shaped around the requirements of your cargo.</p></div>
        </section>

        <section className="services-intro section">
          <div><p className="section-kicker">End-to-end freight support</p><h2>Choose the service your shipment needs.</h2></div>
          <p>Each quotation begins with your cargo details. Select a service below and the request form will open with your choice already filled in.</p>
        </section>

        <section className="detailed-service-grid">
          {detailedServices.map(({ icon: Icon, image, title, intro, points }) => (
            <article className="detailed-service-card" key={title}>
              <div className="detailed-service-image"><img src={image} alt={`${title} operations`} /></div>
              <div className="detailed-service-content">
                <div className="detailed-service-top"><Icon /></div>
                <h2>{title}</h2>
                <p>{intro}</p>
                <ul>{points.map((point) => <li key={point}><Check /> {point}</li>)}</ul>
                <button type="button" onClick={() => setQuoteService(title)}>Request a quote <ArrowRight size={17} /></button>
              </div>
            </article>
          ))}
        </section>

        <section className="service-quote-band" id="request-quote">
          <div><p className="section-kicker section-kicker-light">Not sure where to start?</p><h2>Not sure which service fits your cargo?</h2><p className="conversion-copy">Share the route, cargo type and timeline. We’ll recommend the right freight and clearance approach.</p></div>
          <button className="button button-white" type="button" onClick={() => setQuoteService('Trade Consultancy')}>Get a recommendation <ArrowRight size={17} /></button>
        </section>

        <section className="faq-section section page-faq">
          <div className="faq-heading"><p className="section-kicker">Services FAQ</p><h2>Before you request a quote.</h2><p>These answers cover the most common questions about our freight and cargo services.</p></div>
          <div className="faq-list">{serviceFaqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><ChevronDown /></summary><p>{answer}</p></details>)}</div>
        </section>
      </main>
      <PageFooter />
      {quoteService && <QuoteRequestModal initialService={quoteService} onClose={() => setQuoteService(null)} />}
    </div>
  )
}
