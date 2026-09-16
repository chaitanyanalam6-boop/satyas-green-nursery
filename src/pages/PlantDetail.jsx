import { MessageCircle, Phone } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PlantCard } from './Plants'
import PlantPhoto from '../components/PlantPhoto'
import { callLink, categories, plants, whatsappLink } from '../data/site'

export default function PlantDetail() {
  const { id } = useParams()
  const plant = plants.find((p) => p.id === id)

  if (!plant) return <Navigate to="/plants" replace />

  const category = categories.find((c) => c.slug === plant.category)
  const related = plants.filter((p) => p.category === plant.category && p.id !== plant.id).slice(0, 3)

  const message = plant.subtitle
    ? `Hi! I'm interested in the ${plant.name} (${plant.subtitle}). Could you tell me about availability and price?`
    : `Hi! I'm interested in the ${plant.name}. Could you tell me about availability and price?`

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to={`/plants/${plant.category}`} className="text-sm font-semibold text-sage">
        ← {category?.name}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <PlantPhoto seed={plant.id} src={plant.image} alt={plant.name} className="aspect-square w-full rounded-2xl" />

        <div>
          <h1 className="font-display text-4xl font-semibold text-cream">{plant.name}</h1>
          {plant.subtitle && <p className="mt-1 text-lg italic text-cream-dim">{plant.subtitle}</p>}
          <p className="mt-6 text-lg leading-relaxed text-cream-dim">{plant.details}</p>

          <div className="mt-8 rounded-2xl border border-line bg-panel-light p-6">
            <p className="text-sm text-cream-dim">
              Prices and availability vary by size and season. Message us for current stock and
              rates.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-sage-dark px-5 py-3 text-sm font-semibold text-cream hover:bg-sage"
              >
                <MessageCircle size={16} /> Enquire on WhatsApp
              </a>
              <a
                href={callLink()}
                className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-cream hover:border-sage"
              >
                <Phone size={16} /> Call Nursery
              </a>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-cream">
            More from {category?.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PlantCard key={p.id} plant={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
