import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PlantPhoto from '../components/PlantPhoto'
import { categories, plants } from '../data/site'

export default function Plants() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => {
    if (!query.trim()) return null
    const q = query.trim().toLowerCase()
    return plants.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q),
    )
  }, [query])

  function handleSubmit(e) {
    e.preventDefault()
    setSearchParams(query.trim() ? { q: query.trim() } : {})
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          Our Full Range
        </p>
        <h1 className="font-display text-4xl font-semibold text-cream">All Plants & Categories</h1>
        <p className="mx-auto mt-3 max-w-xl text-cream-dim">
          Browse by category, or search our full catalog directly.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-line bg-panel px-4 py-3">
          <Search size={16} className="text-cream-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search plants..."
            className="w-full bg-transparent text-sm text-cream placeholder:text-cream-dim focus:outline-none"
          />
        </form>
      </div>

      {results ? (
        <div>
          <p className="mb-6 text-sm text-cream-dim">
            {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
          </p>
          {results.length === 0 ? (
            <p className="text-cream-dim">
              No matching plants. Try a different search, or{' '}
              <Link to="/contact" className="text-sage underline">
                ask us directly
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((p) => (
                <PlantCard key={p.id} plant={p} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/plants/${c.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line"
            >
              <PlantPhoto seed={c.slug} src={c.image} alt={c.name} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="font-display text-base font-semibold text-cream">{c.name}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/90 text-ink">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function PlantCard({ plant }) {
  return (
    <Link
      to={`/plant/${plant.id}`}
      className="group rounded-2xl border border-line bg-panel-light p-5 transition-transform hover:-translate-y-1"
    >
      <PlantPhoto seed={plant.id} src={plant.image} alt={plant.name} className="mb-4 h-36 w-full rounded-xl" />
      <h3 className="font-display text-lg font-semibold text-cream">{plant.name}</h3>
      {plant.subtitle && <p className="text-sm italic text-cream-dim">{plant.subtitle}</p>}
      <p className="mt-2 text-sm leading-relaxed text-cream-dim">{plant.description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
        <span className="flex h-5 w-5 items-center justify-center rounded border border-sage text-xs">+</span>
        View details
      </span>
    </Link>
  )
}
