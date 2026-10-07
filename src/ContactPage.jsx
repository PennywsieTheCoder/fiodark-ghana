import { useEffect, useState } from 'react'
import { useForm } from '@formspree/react'
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import QuoteRequestModal from './components/QuoteRequestModal'
import TurnstileField from './components/TurnstileField'
import useScrollAnimations from './hooks/useScrollAnimations'
import contactHeroImage from './assets/contact-hero-v1.jpg'
import { sitePath } from './utils/sitePath'

const contactFaqs = [
  ['How can I contact FIODARK Ghana?', 'Email moses@fiodark-ghana.com or call +233 244 232 723 or +233 503 360 322.'],
  ['Where is the FIODARK Ghana office located?', 'The office is at PR/NP/069, Vocrown Street, behind Melcom Stores, Mataheko-Afienya, Ghana.'],
  ['What details should I include when making an enquiry?', 'Include your name, preferred contact details, the service you need and a short description of your shipment or question.'],
  ['Can I request a quotation through the website?', 'Yes. Use the Request a Quote button to submit your shipment details securely through the website. Our team will receive the request by email.'],
  ['Can I visit the office to discuss a shipment?', 'Yes. We recommend calling ahead so the appropriate team member is available to discuss your requirements.'],
]

export default function ContactPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [contactVerified, setContactVerified] = useState(false)
  const [contactVerificationReset, setContactVerificationReset] = useState(0)
  const [contactState, submitContact, resetContact] = useForm('xdeaawdd')
  const pageRef = useScrollAnimations()

  useEffect(() => {
    if (contactState.errors) {
      setContactVerified(false)
      setContactVerificationReset((current) => current + 1)
    }
  }, [contactState.errors])

  const startAnotherMessage = () => {
    setContactVerified(false)
    resetContact()
  }

  return (
    <div className="site-shell contact-page page-enter" ref={pageRef}>
      <PageHeader active="contact" />
      <main>
        <section className="about-hero contact-hero">
          <img className="page-hero-image" src={contactHeroImage} alt="A Ghanaian logistics adviser helping a client plan an international shipment" />
          <div className="page-hero-overlay" />
          <div className="about-hero-content contact-hero-content"><p className="eyebrow"><span /> Contact FIODARK Ghana</p><h1>Let us plan the next movement together.</h1><p>Speak with our team about freight forwarding, customs clearance, trucking or logistics consultancy.</p><button className="button button-red" type="button" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={17} /></button></div>
        </section>

        <section className="contact-details-grid section">
          <article><div className="contact-card-icon"><Mail /></div><span>Email</span><h2>Send us the details.</h2><a className="contact-card-action" href="mailto:moses@fiodark-ghana.com">moses@fiodark-ghana.com <ArrowRight size={14} /></a></article>
          <article><div className="contact-card-icon"><Phone /></div><span>Call</span><h2>Speak with our team.</h2><div className="contact-phone-list"><a href="tel:+233244232723">+233 244 232 723</a><a href="tel:+233503360322">+233 503 360 322</a></div></article>
          <article><div className="contact-card-icon"><MapPin /></div><span>Visit</span><h2>Find us in Afienya.</h2><p>PR/NP/069, Vocrown Street,<br />Behind Melcom Stores,<br />Mataheko-Afienya, Ghana</p><a className="contact-card-action" href="https://www.google.com/maps/search/?api=1&query=Vocrown+Street+Mataheko+Afienya+Ghana" target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={14} /></a></article>
        </section>

        <section className="contact-form-section" id="general-enquiry">
          <div className="contact-form-intro"><p className="section-kicker">General enquiry</p><h2>Get in touch with FIODARK Ghana.</h2><p>Ask a general question or tell us how our team can help. For shipment pricing, use the dedicated quotation form.</p></div>
          <div className="contact-form-card">
            <aside className="contact-form-info">
              <p className="section-kicker section-kicker-light">Contact information</p>
              <h3>Let’s move your plans forward.</h3>
              <p>Reach our team directly or leave your details and continue the conversation by email.</p>
              <div className="contact-form-info-list">
                <a href="tel:+233244232723"><Phone /> <span>+233 244 232 723<br />+233 503 360 322</span></a>
                <a href="mailto:moses@fiodark-ghana.com"><Mail /> <span>moses@fiodark-ghana.com</span></a>
                <p><MapPin /> <span>Vocrown Street,<br />Mataheko-Afienya, Ghana</span></p>
              </div>
              <span className="contact-info-orbit" aria-hidden="true" />
            </aside>
            <div className="contact-form-pane">
              {contactState.succeeded ? <div className="form-success" role="status" aria-live="polite">
                <CheckCircle2 />
                <p className="section-kicker">Message received</p>
                <h3>Thank you for contacting FIODARK Ghana.</h3>
                <p>Your enquiry has been submitted successfully. Our team will review the details and respond using the contact information you provided.</p>
                <button type="button" onClick={startAnotherMessage}>Send another message</button>
              </div> : <form className="contact-form" onSubmit={submitContact}>
                <label><span className="field-label">Full name</span><input name="name" type="text" autoComplete="name" placeholder="Enter your full name" minLength={2} maxLength={80} required /></label>
                <label><span className="field-label">Email address</span><input name="email" type="email" autoComplete="email" placeholder="name@example.com" maxLength={120} required /></label>
                <label><span className="field-label">Phone number <em>Optional</em></span><input name="phone" type="tel" autoComplete="tel" placeholder="+233 00 000 0000" pattern="[+0-9() -]{7,20}" title="Enter a valid phone number using 7 to 20 digits and common phone symbols." /></label>
                <label><span className="field-label">Subject</span><input name="subject" type="text" placeholder="What would you like help with?" minLength={3} maxLength={120} required /></label>
                <label><span className="field-label">Message</span><textarea name="message" rows="5" placeholder="Tell us about your enquiry or shipment" minLength={10} maxLength={2000} required /></label>
                <TurnstileField onVerify={setContactVerified} resetSignal={contactVerificationReset} />
                <p className="form-privacy-notice">We use these details only to respond to your enquiry. Please review our <a href={sitePath('/privacy')}>privacy notice</a>.</p>
                {contactState.errors && <p className="form-error" role="alert"><AlertCircle /> We couldn’t send your message. Please check the details and try again.</p>}
                <button type="submit" disabled={contactState.submitting || !contactVerified}>{contactState.submitting ? 'Sending…' : 'Submit'} {!contactState.submitting && <ArrowRight size={17} />}</button>
              </form>}
            </div>
          </div>
        </section>

        <section className="faq-section section page-faq">
          <div className="faq-heading"><p className="section-kicker">Contact FAQ</p><h2>Getting in touch with FIODARK.</h2><p>Important contact and visit information before you reach out.</p></div>
          <div className="faq-list">{contactFaqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><ChevronDown /></summary><p>{answer}</p></details>)}</div>
        </section>
      </main>
      <PageFooter />
      {quoteOpen && <QuoteRequestModal onClose={() => setQuoteOpen(false)} />}
    </div>
  )
}
