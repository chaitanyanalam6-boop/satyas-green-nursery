import { Search } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { PlantCard } from './Plants'
import { categories, plants } from '../data/site'

const ALL_SLUG = 'all-plants-accessories'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function CategoryDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const category = categories.find((c) => c.slug === slug)
  const isAll = slug === ALL_SLUG

  if (!category) return <Navigate to="/plants" replace />

  const items = isAll ? plants.filter((p) => p.category !== ALL_SLUG) : plants.filter((p) => p.category === slug)

  // For the aggregate "all plants" view, group by real category name.
  // For a normal category page, group by its own subcategories.
  const groups = new Map()
  for (const p of items) {
    const key = isAll ? categories.find((c) => c.slug === p.category)?.name || '' : p.subcategory || ''
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(p)
  }
  const ungrouped = groups.get('') || []
  const named = isAll
    ? categories.filter((c) => c.slug !== ALL_SLUG).map((c) => [c.name, groups.get(c.name) || []]).filter(([, list]) => list.length > 0)
    : [...groups.entries()].filter(([key]) => key !== '')

  const sidebarJumps = isAll
    ? categories.filter((c) => c.slug !== ALL_SLUG).map((c) => c.name)
    : [...new Set(items.map((p) => p.subcategory).filter(Boolean))]

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) navigate(`/plants?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/plants" className="text-sm font-semibold text-sage">
        ← All Categories
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2.5">
            <Search size={15} className="text-cream-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search plants..."
              className="w-full bg-transparent text-sm text-cream placeholder:text-cream-dim focus:outline-none"
            />
          </form>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cream-dim">Categories</p>
          <nav className="space-y-1">
            {categories.map((c) => {
              const active = c.slug === slug
              const jumps = active ? sidebarJumps : []
              return (
                <div key={c.slug}>
                  <Link
                    to={`/plants/${c.slug}`}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      active ? 'bg-panel-light font-semibold text-sage' : 'text-cream-dim hover:bg-panel hover:text-cream'
                    }`}
                  >
                    {c.name}
                  </Link>
                  {jumps.length > 0 && (
                    <div className="ml-3 mt-1 space-y-1 border-l border-line pl-3">
                      {jumps.map((sc) => (
                        <a
                          key={sc}
                          href={`#${slugify(sc)}`}
                          className="block py-1 text-sm text-cream-dim hover:text-sage"
                        >
                          {sc}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        <div>
          <h1 className="font-display text-4xl font-semibold text-cream">{category.name}</h1>
          <p className="mt-3 max-w-xl text-cream-dim">{category.blurb}</p>

          {items.length === 0 ? (
            <p className="mt-10 text-cream-dim">
              New varieties in this collection are being added soon.{' '}
              <Link to="/contact" className="text-sage underline">
                Contact us
              </Link>{' '}
              to check current stock.
            </p>
          ) : (
            <>
              <p className="mb-8 mt-6 text-sm text-cream-dim">
                Showing {items.length} plant{items.length === 1 ? '' : 's'}{isAll ? ' across our full catalog.' : ' in this collection.'}
              </p>
              <div className="space-y-14">
                {ungrouped.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ungrouped.map((p) => (
                      <PlantCard key={p.id} plant={p} />
                    ))}
                  </div>
                )}
                {named.map(([groupName, groupItems]) => (
                  <div key={groupName} id={slugify(groupName)} className="scroll-mt-24">
                    <h2 className="mb-6 font-display text-2xl font-semibold text-cream">{groupName}</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {groupItems.map((p) => (
                        <PlantCard key={p.id} plant={p} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
