import { useEffect, useState } from 'react'
import { ArrowRight, Mail, MapPin, Phone, X } from 'lucide-react'

const serviceOptions = [
  'Sea Freight',
  'Air Freight',
  'Customs Clearance',
  'Haulage & Delivery',
  'Cargo Handling',
  'Trade Consultancy',
]

export default function QuoteRequestModal({ initialService = '', onClose }) {
  const [service, setService] = useState(initialService || serviceOptions[0])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  function prepareEmail(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Quote request - ${data.get('service')}`
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company') || 'Not provided'}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      `Service: ${data.get('service')}`,
      `Cargo type: ${data.get('cargo')}`,
      `Origin: ${data.get('origin') || 'Not provided'}`,
      `Destination: ${data.get('destination') || 'Not provided'}`,
      '',
      'Shipment details:',
      data.get('details'),
    ].join('\n')

    window.location.href = `mailto:moses@fiodark-ghana.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="quote-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
        <button className="quote-modal-close" type="button" aria-label="Close quote form" onClick={onClose}><X /></button>
        <div className="quote-modal-layout">
          <aside className="quote-modal-info">
            <p className="section-kicker section-kicker-light">Freight quotation</p>
            <h3>Plan your shipment with confidence.</h3>
            <p>Give us the essential cargo details and your completed request will open as an email for your review.</p>
            <div className="quote-modal-info-list">
              <p><Mail /><span>moses@fiodark-ghana.com</span></p>
              <p><Phone /><span>+233 244 232 723<br />+233 503 360 322</span></p>
              <p><MapPin /><span>Mataheko-Afienya, Ghana</span></p>
            </div>
            <span className="quote-info-orbit" aria-hidden="true" />
          </aside>
          <div className="quote-modal-main">
            <div className="quote-modal-head">
              <div><p className="section-kicker">Request a quote</p><h2 id="quote-modal-title">Tell us about your shipment.</h2></div>
            </div>
            <form className="quote-form" onSubmit={prepareEmail}>
              <label>Service<select name="service" value={service} onChange={(event) => setService(event.target.value)}>{serviceOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
              <label>Company <span>Optional</span><input name="company" type="text" autoComplete="organization" placeholder="Company name" /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+233" required /></label>
              <label>Cargo type<input name="cargo" type="text" placeholder="Container, machinery, general cargo" required /></label>
              <label>Origin <span>Optional</span><input name="origin" type="text" placeholder="Shipment origin" /></label>
              <label>Destination <span>Optional</span><input name="destination" type="text" placeholder="Final destination" /></label>
              <label className="quote-form-wide">Shipment details<textarea name="details" rows="4" placeholder="Quantity, weight, expected date and any special handling requirements" required /></label>
              <button className="quote-form-submit" type="submit">Submit <ArrowRight size={17} /></button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
