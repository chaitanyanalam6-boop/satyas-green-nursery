import { ArrowRight, Award, Headset, Leaf, Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import BestsellerCarousel from '../components/BestsellerCarousel'
import PlantPhoto from '../components/PlantPhoto'
import { categories, features, nursery, testimonials, visitCards, whatsappLink } from '../data/site'

const featureIcons = [Leaf, Truck, Award, Headset]

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <BestsellersSection />
      <WhyUsSection />
      <VisitSection />
      <TestimonialsSection />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/hero-greenhouse.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(13,25,18,0.97) 0%, rgba(13,25,18,0.88) 35%, rgba(13,25,18,0.55) 65%, rgba(13,25,18,0.35) 100%), linear-gradient(0deg, rgba(13,25,18,0.6) 0%, transparent 30%)',
        }}
      />
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          Kadiyam · India's Plant Paradise
        </p>
        <h1 className="max-w-2xl font-display text-5xl font-semibold leading-[1.1] text-cream sm:text-6xl">
          Bring Nature Home
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
          Premium indoor & outdoor plants and organic care, nurtured with love and grown right here
          in Kadiyam, then delivered straight to your doorstep.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/plants"
            className="flex items-center gap-2 rounded-full bg-sage-dark px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-sage"
          >
            Explore Varieties <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function CategoriesSection() {
  return (
    <section id="categories" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          Curated Collections
        </p>
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
          Explore Our Nursery Categories
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-dim">
          Everything you need to cultivate your own botanical paradise, delivered fresh to your
          doorstep.
        </p>
      </div>
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
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/90 text-ink transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function BestsellersSection() {
  return (
    <section className="border-y border-line bg-panel py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            Nursery Favorites
          </p>
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            Our Bestselling Plants
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-dim">
            Drag or swipe through the showcase — each plant lifts, tilts and settles as you go.
          </p>
        </div>
      </div>
      <BestsellerCarousel />
    </section>
  )
}

function WhyUsSection() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          {nursery.name}
        </p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
          Why Satya's Green Nursery
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-cream-dim">
          Rooted in Kadiyam, India's largest nursery belt, Satya's Green Nursery brings four
          generations of horticultural passion to every plant we grow. From rare exotics to
          everyday greens, each sapling is nurtured with care.
        </p>
      </div>
      <div className="divide-y divide-line">
        {features.map((f, i) => {
          const Icon = featureIcons[i]
          return (
            <div key={f.title} className="flex items-start gap-5 py-5 first:pt-0 last:pb-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-panel-light text-sage">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="font-semibold text-cream">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cream-dim">{f.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function VisitSection() {
  return (
    <section id="visit" className="scroll-mt-20 border-y border-line bg-panel py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            Seamless Nursery Experience
          </p>
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            Planning Your Visit to Satya's Green Nursery
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-dim">
            Everything you need for a smooth nursery visit — from directions to plant prep.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {visitCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-line bg-panel-light p-6">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sage">
                <Leaf size={18} />
              </span>
              <h3 className="font-display text-lg font-semibold text-cream">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">{card.description}</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                {card.linkLabel} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-sage-dark/90 px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15">
              <Headset size={18} className="text-cream" />
            </span>
            <p className="font-semibold text-cream">
              24/7 Plant Care & Support Line: +91 {nursery.primaryPhone}
            </p>
          </div>
          <a
            href={whatsappLink("Hi! I'd like to talk to someone about visiting the nursery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-cream/10"
          >
            Call or WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">Reviews</p>
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
          What Our Customers Say
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-dim">
          Join thousands of delighted plant parents who have transformed their homes with us.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl border border-line bg-panel-light p-6">
            <div className="mb-4 flex gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed text-cream-dim">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-dark text-sm font-semibold text-cream">
                {t.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-cream">{t.name}</p>
                <p className="text-xs text-cream-dim">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
