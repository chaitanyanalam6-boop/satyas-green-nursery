import { ChevronDown, MapPin, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categories, nursery } from '../data/site'

export default function Header({ onOpenVisitModal }) {
  const [plantsOpen, setPlantsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-cream ${
      isActive ? 'text-sage border-b-2 border-sage pb-1' : 'text-cream-dim pb-1 border-b-2 border-transparent'
    }`

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/plants?q=${encodeURIComponent(query.trim())}`)
      setMobileOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <img src="/images/logo.png" alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-semibold text-cream">{nursery.name}</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => setPlantsOpen(true)}
            onMouseLeave={() => setPlantsOpen(false)}
          >
            <div className="flex items-center gap-1 pb-1 text-sm font-medium text-cream-dim">
              <Link to="/#categories" className="transition-colors hover:text-cream">
                Plants
              </Link>
              <button
                aria-label="Toggle plants menu"
                className="transition-colors hover:text-cream"
                onClick={() => setPlantsOpen((v) => !v)}
              >
                <ChevronDown size={14} />
              </button>
            </div>
            {plantsOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-line bg-panel p-2 shadow-xl">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/plants/${c.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-cream-dim hover:bg-panel-light hover:text-cream"
                    onClick={() => setPlantsOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
                <Link
                  to="/plants"
                  className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-sage hover:bg-panel-light"
                  onClick={() => setPlantsOpen(false)}
                >
                  View All Plants →
                </Link>
              </div>
            )}
          </div>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <Link to="/#visit" className="border-b-2 border-transparent pb-1 text-sm font-medium text-cream-dim transition-colors hover:text-cream">
            Contact
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden max-w-xs flex-1 items-center lg:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-line bg-panel px-4 py-2">
            <Search size={16} className="text-cream-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search plants..."
              className="w-full bg-transparent text-sm text-cream placeholder:text-cream-dim focus:outline-none"
            />
          </div>
        </form>

        <Link
          to="/contact"
          aria-label="Nursery location"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:text-cream lg:flex"
        >
          <MapPin size={18} />
        </Link>

        <button
          onClick={onOpenVisitModal}
          className="hidden shrink-0 rounded-full bg-sage-dark px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sage lg:block"
        >
          Visit Nursery
        </button>

        <button
          className="ml-auto rounded-full border border-line p-2 text-cream lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-line bg-ink px-4 pb-6 pt-2 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4 mt-2 flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2">
            <Search size={16} className="text-cream-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search plants..."
              className="w-full bg-transparent text-sm text-cream placeholder:text-cream-dim focus:outline-none"
            />
          </form>
          <div className="flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-2.5 text-cream-dim hover:bg-panel">
              Home
            </Link>
            <Link to="/#categories" onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-2.5 text-cream-dim hover:bg-panel">
              Plants
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/plants/${c.slug}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-2 text-sm text-cream-dim/80 hover:bg-panel"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-2.5 text-cream-dim hover:bg-panel">
              About
            </Link>
            <Link to="/#visit" onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-2.5 text-cream-dim hover:bg-panel">
              Contact
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false)
                onOpenVisitModal()
              }}
              className="mt-3 rounded-full bg-sage-dark px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              Visit Nursery
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
