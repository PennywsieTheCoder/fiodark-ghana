import { useState } from 'react'
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import QuoteRequestModal from './components/QuoteRequestModal'
import useScrollAnimations from './hooks/useScrollAnimations'
import contactHeroImage from './assets/contact-hero-v1.jpg'

const contactFaqs = [
  ['How can I contact FIODARK Ghana?', 'Email moses@fiodark-ghana.com or call +233 244 232 723 or +233 503 360 322.'],
  ['Where is the FIODARK Ghana office located?', 'The office is at PR/NP/069, Vocrown Street, behind Melcom Stores, Mataheko-Afienya, Ghana.'],
  ['What details should I include when making an enquiry?', 'Include your name, preferred contact details, the service you need and a short description of your shipment or question.'],
  ['Can I request a quotation through the website?', 'Yes. Use the Request a Quote button to complete the shipment form. Your details will open in an email addressed to our team for review before you send it.'],
  ['Can I visit the office to discuss a shipment?', 'Yes. We recommend calling ahead so the appropriate team member is available to discuss your requirements.'],
]

export default function ContactPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const pageRef = useScrollAnimations()

  function prepareContactEmail(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Website enquiry - ${data.get('subject')}`
    const body = [`Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Phone: ${data.get('phone') || 'Not provided'}`, `Subject: ${data.get('subject')}`, '', 'Message:', data.get('message')].join('\n')
    window.location.href = `mailto:moses@fiodark-ghana.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="site-shell contact-page page-enter" ref={pageRef}>
      <PageHeader active="contact" />
      <main>
        <section className="inner-hero contact-hero">
          <img className="page-hero-image" src={contactHeroImage} alt="A Ghanaian logistics adviser helping a client plan an international shipment" />
          <div className="page-hero-overlay" />
          <div><p className="eyebrow"><span /> Contact FIODARK Ghana</p><h1>Let us plan the next movement together.</h1><p>Speak with our team about freight forwarding, customs clearance, trucking or logistics consultancy.</p></div>
          <div className="contact-hero-action"><p>Ready with your shipment details?</p><button className="button button-red" type="button" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={17} /></button></div>
        </section>

        <section className="contact-details-grid section">
          <article><Mail /><span>Email</span><h2>Send us the details.</h2><a href="mailto:moses@fiodark-ghana.com">moses@fiodark-ghana.com</a></article>
          <article><Phone /><span>Call</span><h2>Speak with our team.</h2><a href="tel:+233244232723">+233 244 232 723</a><a href="tel:+233503360322">+233 503 360 322</a></article>
          <article><MapPin /><span>Visit</span><h2>Find us in Afienya.</h2><p>PR/NP/069, Vocrown Street,<br />Behind Melcom Stores,<br />Mataheko-Afienya, Ghana</p><a href="https://www.google.com/maps/search/?api=1&query=Vocrown+Street+Mataheko+Afienya+Ghana" target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={14} /></a></article>
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
              <form className="contact-form" onSubmit={prepareContactEmail}>
                <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label>Phone number <span>Optional</span><input name="phone" type="tel" autoComplete="tel" placeholder="+233" /></label>
                <label>Subject<input name="subject" type="text" placeholder="How can we help?" required /></label>
                <label>Message<textarea name="message" rows="5" placeholder="Write your message" required /></label>
                <button type="submit">Submit <ArrowRight size={17} /></button>
              </form>
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
