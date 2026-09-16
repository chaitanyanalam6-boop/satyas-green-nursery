import { ArrowRight, Lock, Phone, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { nursery, whatsappLink } from '../data/site'

export default function VisitAvailabilityModal({ open, onClose }) {
  const [plantName, setPlantName] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    const parts = [`Hi! I'd like to check availability for "${plantName || 'a plant'}" before visiting.`]
    if (visitDate) parts.push(`Preferred visit date: ${visitDate}.`)
    if (phone) parts.push(`My phone number is ${phone}.`)
    window.open(whatsappLink(parts.join(' ')), '_blank', 'noopener,noreferrer')
    setPlantName('')
    setVisitDate('')
    setPhone('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-line bg-panel p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:text-cream"
        >
          <X size={16} />
        </button>

        <p className="text-center font-display text-sm italic text-cream-dim">{nursery.name}</p>
        <h2 className="mt-2 text-center font-display text-2xl font-semibold text-cream">
          Check Plant Availability
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm text-cream-dim">
          Enter the plant name to check availability before your visit.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream-dim">Plant Name</label>
            <div className="relative">
              <input
                required
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="e.g., Amaryllis Lily"
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 pr-10 text-sm text-cream placeholder:text-cream-dim/60 focus:border-sage focus:outline-none"
              />
              <Search size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cream-dim" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream-dim">Preferred Visit Date</label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 focus:border-sage focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream-dim">Your Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-lg border border-line bg-ink px-4 py-3 pr-10 text-sm text-cream placeholder:text-cream-dim/60 focus:border-sage focus:outline-none"
              />
              <Phone size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cream-dim" />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-sage-dark px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-sage"
          >
            Check Availability <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-cream-dim">
          <Lock size={12} /> We value your privacy. No spam, just real-time updates.
        </p>
      </div>
    </div>
  )
}
