import { useEffect, useState } from 'react'
import { useForm } from '@formspree/react'
import { AlertCircle, ArrowRight, CheckCircle2, Mail, MapPin, Phone, X } from 'lucide-react'
import { FormCombobox, ModernDateInput } from './FormControls'
import TurnstileField from './TurnstileField'

const serviceOptions = [
  'Sea Freight',
  'Air Freight',
  'Customs Clearance',
  'Haulage & Delivery',
  'Cargo Handling',
  'Trade Consultancy',
]

const cargoOptions = [
  'Containerised cargo',
  'General cargo',
  'Machinery and equipment',
  'Vehicles',
  'Perishable goods',
  'Raw materials',
  'Personal effects',
]

export default function QuoteRequestModal({ initialService = '', onClose }) {
  const [service, setService] = useState(initialService || serviceOptions[0])
  const [quoteVerified, setQuoteVerified] = useState(false)
  const [quoteVerificationReset, setQuoteVerificationReset] = useState(0)
  const [quoteState, submitQuote, resetQuote] = useForm('mqpeeyly')
  const today = new Date().toISOString().slice(0, 10)

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

  useEffect(() => {
    if (quoteState.errors) {
      setQuoteVerified(false)
      setQuoteVerificationReset((current) => current + 1)
    }
  }, [quoteState.errors])

  const startAnotherRequest = () => {
    setQuoteVerified(false)
    resetQuote()
  }

  return (
    <div className="quote-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
        <button className="quote-modal-close" type="button" aria-label="Close quote form" onClick={onClose}><X /></button>
        <div className="quote-modal-layout">
          <aside className="quote-modal-info">
            <p className="section-kicker section-kicker-light">Freight quotation</p>
            <h3>Plan your shipment with confidence.</h3>
            <p>Give us the essential cargo details and submit your request directly to our team for review.</p>
            <div className="quote-modal-info-list">
              <p><Mail /><span>moses@fiodark-ghana.com</span></p>
              <p><Phone /><span>+233 244 232 723<br />+233 503 360 322</span></p>
              <p><MapPin /><span>Mataheko-Afienya, Ghana</span></p>
            </div>
            <span className="quote-info-orbit" aria-hidden="true" />
          </aside>
          <div className="quote-modal-main">
            {quoteState.succeeded ? <div className="form-success quote-form-success" role="status" aria-live="polite">
              <CheckCircle2 />
              <p className="section-kicker">Request received</p>
              <h3 id="quote-modal-title">Your shipment details have been submitted.</h3>
              <p>Thank you. The FIODARK Ghana team will review your request and contact you using the details provided.</p>
              <div className="form-success-actions"><button type="button" onClick={startAnotherRequest}>Submit another request</button></div>
            </div> : <><div className="quote-modal-head">
              <div><p className="section-kicker">Request a quote</p><h2 id="quote-modal-title">Tell us about your shipment.</h2></div>
            </div>
            <form className="quote-form" onSubmit={submitQuote}>
              <input type="hidden" name="subject" value={`New ${service} quotation request`} readOnly />
              <div className="quote-field"><span className="field-label">Service</span><FormCombobox ariaLabel="Service" editable={false} name="Service requested" options={serviceOptions} placeholder="Choose a service" value={service} onValueChange={setService} /></div>
              <label><span className="field-label">Full name</span><input name="name" type="text" autoComplete="name" placeholder="Your name" minLength={2} maxLength={80} required /></label>
              <label><span className="field-label">Company <em>Optional</em></span><input name="company" type="text" autoComplete="organization" placeholder="Company name" maxLength={100} /></label>
              <label><span className="field-label">Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={120} required /></label>
              <label><span className="field-label">Phone number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+233" pattern="[+0-9() -]{7,20}" title="Enter a valid phone number using 7 to 20 digits and common phone symbols." required /></label>
              <div className="quote-field"><span className="field-label">Cargo type</span><FormCombobox ariaLabel="Cargo type" name="Cargo type" options={cargoOptions} placeholder="Choose or type cargo type" required /></div>
              <label><span className="field-label">Origin <em>Optional</em></span><input name="Shipment origin" type="text" placeholder="Enter shipment origin" maxLength={120} /></label>
              <label><span className="field-label">Destination <em>Optional</em></span><input name="Shipment destination" type="text" placeholder="Enter final destination" maxLength={120} /></label>
              <div className="quote-field"><span className="field-label">Expected shipment date <em>Optional</em></span><ModernDateInput name="Expected shipment date" min={today} /></div>
              <label><span className="field-label">Estimated weight <em>Optional</em></span><input name="Estimated weight" type="text" placeholder="e.g. 8,500 kg" maxLength={60} /></label>
              <label className="quote-form-wide"><span className="field-label">Shipment details</span><textarea name="Shipment details" rows="4" placeholder="Quantity, dimensions and any special handling requirements" minLength={10} maxLength={2500} required /></label>
              <TurnstileField onVerify={setQuoteVerified} resetSignal={quoteVerificationReset} />
              {quoteState.errors && <p className="form-error quote-form-wide" role="alert"><AlertCircle /> We couldn’t submit your request. Please check the details and try again.</p>}
              <button className="quote-form-submit" type="submit" disabled={quoteState.submitting || !quoteVerified}>{quoteState.submitting ? 'Sending…' : 'Submit'} {!quoteState.submitting && <ArrowRight size={17} />}</button>
            </form></>}
          </div>
        </div>
      </section>
    </div>
  )
}
