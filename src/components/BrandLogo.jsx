import logoImage from '../assets/fiodark-logo-v1.png'
import { sitePath } from '../utils/sitePath'

export default function BrandLogo({ light = false }) {
  return (
    <a className={`logo ${light ? 'logo-light' : ''}`} href={sitePath('/')} aria-label="FIODARK Ghana home">
      <img src={logoImage} alt="FIODARK Agencies" />
    </a>
  )
}
