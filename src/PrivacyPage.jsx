import { Mail, ShieldCheck } from 'lucide-react'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import useScrollAnimations from './hooks/useScrollAnimations'

export default function PrivacyPage() {
  const pageRef = useScrollAnimations()

  return (
    <div className="site-shell privacy-page page-enter" ref={pageRef}>
      <PageHeader />
      <main>
        <section className="privacy-hero">
          <div>
            <p className="section-kicker section-kicker-light">Privacy at FIODARK Ghana</p>
            <h1>How we handle your information.</h1>
            <p>This notice explains what we collect when you contact us or request a freight quotation, how we use it and the choices available to you.</p>
          </div>
          <ShieldCheck aria-hidden="true" />
        </section>

        <section className="privacy-content section">
          <aside>
            <p className="section-kicker">Privacy notice</p>
            <strong>Effective 7 October 2026</strong>
            <p>FIODARK Ghana, registered as Fiodark Agencies, is responsible for the personal information described in this notice.</p>
            <a href="mailto:moses@fiodark-ghana.com"><Mail /> moses@fiodark-ghana.com</a>
          </aside>

          <div className="privacy-sections">
            <section>
              <h2>Information we collect</h2>
              <p>When you submit an enquiry or quotation request, we may collect your name, company, email address, telephone number and the information you provide about your enquiry or shipment. Quotation details may include the requested service, cargo type, origin, destination, expected date, estimated weight and handling requirements.</p>
              <p>Our security providers may also process limited technical information, such as your IP address, browser and device signals, to identify automated or abusive submissions.</p>
            </section>

            <section>
              <h2>How we use your information</h2>
              <p>We use the information to review and respond to enquiries, prepare or discuss freight quotations, coordinate requested services, maintain relevant business records and protect our forms and systems against misuse. We do not use website form submissions to send unrelated marketing messages.</p>
            </section>

            <section>
              <h2>Who processes the information</h2>
              <p>Website submissions are processed by Formspree and delivered to FIODARK Ghana by email. Cloudflare Turnstile processes security signals to confirm that submissions are made by legitimate visitors. These providers may process information outside Ghana under their own safeguards and privacy terms.</p>
              <div className="privacy-links"><a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">Formspree privacy policy</a><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare privacy policy</a></div>
              <p>We may also disclose information where required by law or where reasonably necessary to establish, exercise or defend a legal claim.</p>
            </section>

            <section>
              <h2>Retention and security</h2>
              <p>We retain enquiry and quotation information only for as long as reasonably necessary to respond, provide requested services, maintain appropriate business records or meet legal obligations. Notification emails may remain in FIODARK Ghana’s protected business mailbox where operationally necessary.</p>
              <p>We use access controls, encrypted services, form verification and domain restrictions to reduce unauthorized access and abusive submissions. No internet service can guarantee absolute security, so please do not submit passwords, payment-card details, identification documents or other highly sensitive information through these forms.</p>
            </section>

            <section>
              <h2>Your choices and rights</h2>
              <p>Subject to applicable law, you may ask whether we hold personal information about you and request access, correction or deletion. We may need enough information to verify your identity and locate the relevant record before acting on a request.</p>
              <p>Send privacy requests to <a href="mailto:moses@fiodark-ghana.com">moses@fiodark-ghana.com</a>. You may also contact Ghana’s <a href="https://dataprotection.org.gh/" target="_blank" rel="noreferrer">Data Protection Commission</a> for information about data-protection rights.</p>
            </section>

            <section>
              <h2>Cookies and local storage</h2>
              <p>This website does not currently use advertising or analytics cookies. It stores your light or dark theme preference in your browser. Cloudflare Turnstile may use necessary browser and device signals to provide fraud and abuse protection.</p>
            </section>

            <section>
              <h2>Updates to this notice</h2>
              <p>We may update this notice when our website, service providers or data-handling practices change. The effective date above will be revised when a material update is published.</p>
            </section>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  )
}
