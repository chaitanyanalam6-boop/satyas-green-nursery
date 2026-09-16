import { Flower2, Headset, Leaf, Lightbulb, ShieldCheck, Truck } from 'lucide-react'
import { nursery } from '../data/site'

const stats = [
  { value: '500+', label: 'Plant Varieties' },
  { value: '4 Gen', label: 'Nursery Legacy' },
  { value: '100%', label: 'Organic Soil Mix' },
]

const services = [
  {
    icon: Lightbulb,
    title: 'Comprehensive Plant Supply',
    description:
      'A wide catalog spanning fruit-bearing trees, flowering shrubs, avenue and shade trees, palms, exotic indoor foliage, bonsai, topiary, and medicinal or aromatic herbs.',
  },
  {
    icon: Flower2,
    title: 'Bulk & Wholesale Flora Distribution',
    description:
      'Large-quantity supply and logistical handling for commercial landscapers, real estate developments, urban avenues, and farmhouses.',
  },
  {
    icon: Leaf,
    title: 'Specialized Shade House Cultivation',
    description:
      'Acclimatization and propagation of sensitive indoor exotics and ornamental species under controlled microclimates.',
  },
  {
    icon: Headset,
    title: 'Horticultural Consultation & Plant Care',
    description:
      'Expert guidance on plant selection, soil nutrition, organic pest management, and post-planting maintenance.',
  },
  {
    icon: Truck,
    title: 'Nationwide Shipping & Direct Delivery',
    description:
      'Carefully packed, transit-safe handling of live plants directly from our Kadiyam fields to client doorsteps.',
  },
]

export default function About() {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <Legacy />
      <Services />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img src="/images/about-fields.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(13,25,18,0.9) 0%, rgba(13,25,18,0.7) 45%, rgba(13,25,18,0.45) 100%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          Rooted in Tradition, Nurtured with Care
        </p>
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          About {nursery.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream-dim">
          Learn about our journey from the fertile soil of Kadiyam to greening thousands of homes
          and projects across India.
        </p>
      </div>
    </section>
  )
}

function WhoWeAre() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            Who We Are
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            Dedicated to Greener Livelihoods
          </h2>
          <p className="mt-5 leading-relaxed text-cream-dim">
            {nursery.name} is dedicated to nurturing nature in every household and commercial
            space. Rooted in the rich agricultural soil of Kadiyam Mandal—widely celebrated as
            India's nursery capital—the nursery combines traditional horticultural wisdom with
            modern cultivation standards to supply premium plants, organic gardening essentials,
            and professional green solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-sage">{s.value}</p>
                <p className="text-sm text-cream-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <img
          src="/images/about-foliage.jpg"
          alt="Foliage inside a misty greenhouse"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  )
}

function Legacy() {
  return (
    <section className="border-y border-line bg-panel py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <img
            src="/images/about-workers.jpg"
            alt="Nursery workers tending saplings under shade netting"
            className="aspect-[4/3] w-full rounded-2xl object-cover lg:order-1"
          />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Our Legacy
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              Our Roots & Heritage
            </h2>
            <p className="mt-5 leading-relaxed text-cream-dim">
              Founded as a family enterprise under Eeli Dandu Babu & Sons (Sri Veera Venkata
              Satyanarayana Nursery), our legacy spans generations of dedicated farming and plant
              breeding along the Kadiyapulanka belt. What started as a local passion for quality
              cultivation has evolved into an expansive nursery operation, delivering healthy flora
              directly from the fertile Godavari region to gardens, urban homes, and large-scale
              infrastructure projects across the country.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-panel-light p-4">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-sage" />
              <p className="text-sm text-cream-dim">
                Honoring generations of farmers who transformed Kadiyam into India's largest plant
                paradise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
          What We Offer
        </p>
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
          Our Core Services & Offerings
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-dim">
          Discover the specialized horticultural solutions we deliver nationwide.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.title} className="rounded-2xl border border-line bg-panel-light p-6">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sage">
                <Icon size={20} />
              </span>
              <h3 className="font-display text-lg font-semibold text-cream">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">{s.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
