import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { callLink, mapsLink, nursery, whatsappLink } from '../data/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const text = `Hi, I'm ${form.name || 'a customer'}.\n${form.message}\n(Phone: ${form.phone || 'not provided'})`
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          Get In Touch
        </p>
        <h1 className="font-display text-4xl font-semibold text-cream">Visit or Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl text-cream-dim">
          Reach out for plant availability, bulk landscaping orders, or directions to the nursery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel-light p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sage">
              <MapPin size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-cream">Nursery Location</h3>
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm leading-relaxed text-cream-dim hover:text-sage"
              >
                {nursery.location.line1}
                <br />
                {nursery.location.line2}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel-light p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sage">
              <Phone size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-cream">Call Us</h3>
              <p className="mt-1 text-sm leading-relaxed text-cream-dim">
                {nursery.phones.map((p) => (
                  <a key={p} href={callLink(p)} className="block hover:text-sage">
                    {p}
                  </a>
                ))}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel-light p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sage">
              <Mail size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-cream">Email</h3>
              <a href={`mailto:${nursery.email}`} className="mt-1 block text-sm text-cream-dim hover:text-sage">
                {nursery.email}
              </a>
            </div>
          </div>

          <a
            href={whatsappLink("Hi! I'd like to know more about your plants and visiting the nursery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-sage-dark px-6 py-4 text-sm font-semibold text-cream hover:bg-sage"
          >
            <MessageCircle size={18} /> Chat With Us on WhatsApp
          </a>

          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Nursery location map"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${nursery.location.lat},${nursery.location.lng}&z=16&output=embed`}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel-light p-6 sm:p-8">
          <h3 className="font-display text-2xl font-semibold text-cream">Send an Enquiry</h3>
          <p className="mt-2 text-sm text-cream-dim">
            Fill this in and it opens as a WhatsApp message to our team — no account needed.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream-dim">
                Name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 focus:border-sage focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream-dim">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 focus:border-sage focus:outline-none"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream-dim">
                Message
              </label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 focus:border-sage focus:outline-none"
                placeholder="Tell us what you're looking for..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-sage-dark px-6 py-3.5 text-sm font-semibold text-cream hover:bg-sage"
            >
              Send via WhatsApp
            </button>
            {sent && (
              <p className="text-center text-sm text-sage">
                Opened WhatsApp in a new tab — just hit send there to reach us.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
