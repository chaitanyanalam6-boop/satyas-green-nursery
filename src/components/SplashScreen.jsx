import { useEffect, useMemo } from 'react'
import { nursery } from '../data/site'

const VISIBLE_MS = 2000
const EXIT_MS = 600

function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${8 + ((i * 137) % 84)}%`,
    top: `${35 + ((i * 71) % 60)}%`,
    duration: 4 + (i % 5),
    delay: (i % 8) * 0.6,
  }))
}

export default function SplashScreen({ onDone }) {
  const particles = useMemo(() => makeParticles(14), [])

  useEffect(() => {
    const timer = setTimeout(onDone, VISIBLE_MS + EXIT_MS)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink"
      style={{ animation: `splash-exit ${EXIT_MS}ms ease ${VISIBLE_MS}ms forwards` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(79,138,82,0.25), transparent 60%)',
        }}
      />

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-sage"
          style={{
            left: p.left,
            top: p.top,
            opacity: 0,
            animation: `splash-rise ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}

      <div className="relative flex h-44 w-44 items-center justify-center rounded-full">
        <div
          className="absolute inset-0 rounded-full bg-sage/20 blur-2xl"
          style={{ animation: 'splash-glow-pulse 2.4s ease-in-out infinite' }}
        />

        {/* Diagonal light sweep across the circle as the logo resolves into focus */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <div
            className="absolute left-1/2 top-1/2 h-[340px] w-8 bg-white/20 blur-md"
            style={{ animation: 'splash-sweep 0.7s ease-in-out 0.3s both' }}
          />
        </div>

        {/* Outer solid circle boundary */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage/25" />
        {/* Inner dashed circle boundary */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sage/20" />

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px]"
          style={{ animation: 'splash-orbit 16s linear infinite' }}
        >
          {[0, 90, 180, 270].map((deg, i) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${deg}deg) translateX(100px)` }}
            >
              <span
                className={`block h-2.5 w-2.5 ${i % 2 === 0 ? 'bg-gold' : 'bg-sage-light'}`}
                style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(45deg)' }}
              />
            </span>
          ))}
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px]"
          style={{ animation: 'splash-orbit 24s linear infinite reverse' }}
        >
          {[45, 135, 225, 315].map((deg, i) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${deg}deg) translateX(120px)` }}
            >
              <span
                className={`block h-2 w-2 ${i % 2 === 0 ? 'bg-sage-light' : 'bg-gold'}`}
                style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(45deg)' }}
              />
            </span>
          ))}
        </div>

        <img
          src="/images/logo.png"
          alt={nursery.name}
          className="relative h-32 w-32 object-contain"
          style={{ animation: 'splash-grow 0.45s ease forwards' }}
        />
      </div>

      <h1
        className="mt-6 text-center font-display text-2xl tracking-[0.15em] text-cream sm:text-3xl"
        style={{ animation: 'splash-fade-up 0.5s ease 0.35s both' }}
      >
        {nursery.name.toUpperCase()}
      </h1>
      <p
        className="mt-2 text-center text-xs tracking-[0.25em] text-cream-dim"
        style={{ animation: 'splash-fade-up 0.5s ease 0.5s both' }}
      >
        KADIYAM'S FINEST GREEN NURSERY
      </p>

      <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-panel-light">
        <div
          className="h-full bg-gradient-to-r from-sage-dark to-gold"
          style={{ animation: 'splash-bar 1.5s ease 0.2s both' }}
        />
      </div>
      <p className="mt-3 text-[10px] tracking-[0.3em] text-cream-dim">GROWING...</p>
    </div>
  )
}
