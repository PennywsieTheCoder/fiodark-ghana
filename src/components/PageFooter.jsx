import { Mail, MapPin, Phone } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { sitePath } from '../utils/sitePath'

export default function PageFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand"><BrandLogo light /><p>Freight forwarding, customs clearance, transportation and logistics consultancy backed by decades of Ghanaian industry experience.</p><p className="footer-location"><MapPin size={15} /> Vocrown Street, Mataheko-Afienya, Ghana</p></div>
        <div><h3>Company</h3><a href={sitePath('/')}>Home</a><a href={sitePath('/about')}>About us</a><a href={sitePath('/contact')}>Contact</a><a href={sitePath('/privacy')}>Privacy</a></div>
        <div><h3>Services</h3><a href={sitePath('/services')}>Sea freight</a><a href={sitePath('/services')}>Air freight</a><a href={sitePath('/services')}>Customs clearance</a><a href={sitePath('/services')}>Haulage & delivery</a></div>
        <div><h3>Contact</h3><a href="mailto:moses@fiodark-ghana.com"><Mail size={15} /> moses@fiodark-ghana.com</a><a href="tel:+233244232723"><Phone size={15} /> +233 244 232 723</a><a href="tel:+233503360322"><Phone size={15} /> +233 503 360 322</a></div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal"><span>© 2026 FIODARK Ghana</span><span>Service with distinction · Registered as Fiodark Agencies</span></div>
        <div className="footer-powered" aria-label="Powered by SYNTI">
          <span>Powered by</span>
          <span className="footer-powered-logo" aria-hidden="true"><img src={sitePath('/synti-logo.png')} alt="" /></span>
        </div>
      </div>
    </footer>
  )
}
