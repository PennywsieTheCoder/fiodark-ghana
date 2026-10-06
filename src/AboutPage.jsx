import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Globe2,
  Ship,
  Target,
} from 'lucide-react'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
import aboutHeroImage from './assets/about-hero-v1.jpg'
import mosesDarkoPortrait from './assets/moses-darko-portrait-v1.png'
import seaFreightImage from './assets/service-sea-freight-v1.jpg'
import useScrollAnimations from './hooks/useScrollAnimations'
import { sitePath } from './utils/sitePath'

const objectives = [
  'To become a leading freight-forwarding agency in Ghana.',
  'To provide services that meet recognised standards and satisfy the requirements of our valued customers.',
  'To continuously improve through innovation and add value so clients can concentrate on their core business.',
]

const faqs = [
  {
    question: 'What services does FIODARK Ghana provide?',
    answer: 'We provide customs clearance, sea and air freight coordination, trucking, cargo handling, documentation support and consultancy for shipping, international trade and freight forwarding.',
  },
  {
    question: 'Do you handle both imports and exports?',
    answer: 'Yes. FIODARK Ghana supports importers and exporters with freight coordination, documentation, customs processes and transportation.',
  },
  {
    question: 'Can you assist with air freight?',
    answer: 'Yes. We coordinate air-freight shipments alongside our sea-freight and domestic transportation services.',
  },
  {
    question: 'Can FIODARK help with customs documentation?',
    answer: 'Yes. Our experience with local port and customs operations enables us to guide clients through the documentation and clearance process.',
  },
  {
    question: 'Do you provide trucking and final delivery?',
    answer: 'Yes. We arrange trucking and domestic freight to move cleared cargo towards its agreed destination.',
  },
  {
    question: 'How can I request a freight consultation or quotation?',
    answer: 'Email moses@fiodark-ghana.com or call +233 244 232 723 or +233 503 360 322 with your cargo details, route and expected timeline.',
  },
]

export default function AboutPage() {
  const pageRef = useScrollAnimations()

  return (
    <div className="site-shell about-page page-enter" id="top" ref={pageRef}>
      <PageHeader active="about" />
      <main>
        <section className="about-hero">
          <img className="page-hero-image" src={aboutHeroImage} alt="Ghanaian logistics professionals coordinating cargo operations at a container terminal" />
          <div className="page-hero-overlay" />
          <div className="about-hero-content">
            <p className="eyebrow"><span /> About FIODARK Ghana</p>
            <h1>Experience that keeps trade moving.</h1>
            <p>More than two decades of practical freight knowledge, dependable relationships and a commitment to service with distinction.</p>
          </div>
        </section>

        <section className="company-story section">
          <div className="story-intro">
            <p className="section-kicker">Our company</p>
            <h2>Rooted in Ghana.<br />Connected to global trade.</h2>
          </div>
          <div className="story-copy">
            <p>FIODARK Agencies was registered on 18 December 2001 and has more than 25 years of experience in the clearing industry. Today, the business operates publicly as FIODARK Ghana, supporting importers, exporters and organisations that require experienced freight and logistics guidance.</p>
            <p>With an in-depth understanding of local port and customs operations, we coordinate customs clearance, trucking and consultancy services across sea freight and air freight. Several reputable clients have worked with the company for more than 21 years.</p>
            <p>Our focus is simple: manage the movement, documentation and delivery of goods efficiently so clients can concentrate on their core business.</p>
            <div className="story-meta"><span>Ghanaian-owned</span><span>Sea · Air · Road</span><span>Import · Export</span></div>
          </div>
        </section>

        <section className="leadership-section" id="leadership">
          <div className="leadership-photo">
            <img src={mosesDarkoPortrait} alt="Moses Darko, FCILT, Managing Director of FIODARK Ghana" />
            <div className="leadership-photo-caption"><strong>Moses Darko</strong><span>FCILT · Managing Director</span></div>
            <div className="leadership-stat"><span>41</span><p>Years of experience in the shipping industry</p></div>
          </div>
          <div className="leadership-copy">
            <p className="section-kicker section-kicker-light">Experienced leadership</p>
            <h2>Managed by Moses Darko, FCILT.</h2>
            <p>Mr. Moses Darko is a Chartered Fellow of the Chartered Institute of Logistics and Transport. His career includes 30 years with Maritime Agencies (W/A) Ltd, including 15 years as General Manager, together with 25 years of freight-forwarding experience.</p>
            <div className="leadership-credentials">
              <span><Award /> Chartered Fellow, CILT</span>
              <span><BriefcaseBusiness /> Former General Manager</span>
              <span><Ship /> Shipping and freight specialist</span>
            </div>
          </div>
        </section>

        <section className="purpose-section section">
          <div className="purpose-card purpose-card-blue">
            <Target />
            <p className="section-kicker section-kicker-light">Our vision</p>
            <h2>To become the company of choice in freight services.</h2>
            <p>FIODARK Ghana aims to provide coordinated freight, husbandry and logistics services locally and internationally, earning clients' confidence through efficient delivery.</p>
          </div>
          <div className="purpose-card">
            <Globe2 />
            <p className="section-kicker">Our mission</p>
            <h2>Quality logistics built through partnership.</h2>
            <p>To provide top-quality freight solutions, transportation and logistics services through strategic partnerships that fulfil the needs of clients and employees.</p>
          </div>
        </section>

        <section className="objectives section">
          <div className="section-heading">
            <div><p className="section-kicker">What guides us</p><h2>Clear objectives. Consistent service.</h2></div>
            <p>Our standards are built around improvement, value and the satisfaction of every client we serve.</p>
          </div>
          <div className="objective-grid">
            {objectives.map((objective) => <article key={objective}><Check /><p>{objective}</p></article>)}
          </div>
        </section>

        <section className="activities-section">
          <div className="activities-visual">
            <img src={seaFreightImage} alt="Container vessel at an international cargo terminal" loading="lazy" />
          </div>
          <div className="activities-copy">
            <p className="section-kicker section-kicker-light">What we handle</p>
            <h2>Practical freight solutions from preparation to arrival.</h2>
            <p>FIODARK Ghana supports packaging, loading, transportation and the timely processing of goods. We track documentation and coordinate the requirements that help cargo move through ports and onward to delivery.</p>
            <p>Our team also advises on suitable containers and the conditions required to protect different goods and materials during freight and on arrival.</p>
            <ul>
              <li><Check /> Sea, air and domestic freight</li>
              <li><Check /> Transportation and logistics handling</li>
              <li><Check /> Documentation and customs clearance</li>
              <li><Check /> Container and cargo-condition guidance</li>
            </ul>
          </div>
        </section>

        <section className="faq-section section">
          <div className="faq-heading">
            <p className="section-kicker">Frequently asked questions</p>
            <h2>Useful answers before your shipment begins.</h2>
            <p>Have a question that is not covered here? Contact our team for guidance tailored to your cargo.</p>
          </div>
          <div className="faq-list">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><ChevronDown /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="quote about-quote">
          <div><p className="section-kicker section-kicker-light">Talk to our team</p><h2>Let experience guide your next shipment.</h2></div>
          <div><p>Share your cargo details and we will help you identify the right freight, clearance and transportation approach.</p><a className="button button-white" href={`${sitePath('/services')}#request-quote`}>Request a quote <ArrowRight size={17} /></a></div>
        </section>
      </main>
      <PageFooter />
    </div>
  )
}
