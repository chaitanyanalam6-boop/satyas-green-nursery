import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerLinks, gmailLink, mapsLink, nursery } from '../data/site'
import { InstagramIcon, YoutubeIcon } from './SocialIcons'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="" className="h-10 w-10 object-contain" />
              <span className="font-display text-base font-semibold text-cream">{nursery.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">{nursery.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Map"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-panel-light text-cream-dim hover:text-cream"
              >
                <MapPin size={16} />
              </a>
              <a
                href={nursery.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-panel-light text-cream-dim hover:text-cream"
              >
                <InstagramIcon size={16} />
              </a>
              <a href={nursery.social.youtube} aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-panel-light text-cream-dim hover:text-cream">
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream-dim">Categories</h4>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/plants/${c.slug}`} className="text-sm text-cream-dim hover:text-sage">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream-dim">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((c) => (
                <li key={c.label}>
                  <Link to={c.to} className="text-sm text-cream-dim hover:text-sage">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream-dim">Nursery Location</h4>
            <div className="space-y-4 text-sm text-cream-dim">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-sage" />
                <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="hover:text-sage">
                  {nursery.location.line1}
                  <br />
                  {nursery.location.line2}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-sage" />
                <span>{nursery.phones.join(', ')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-sage" />
                <a href={gmailLink()} target="_blank" rel="noopener noreferrer" className="hover:text-sage">
                  {nursery.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-cream-dim sm:flex-row">
          <p>© {new Date().getFullYear()} {nursery.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-sage">Terms of Service</Link>
            <Link to="/contact" className="hover:text-sage">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
