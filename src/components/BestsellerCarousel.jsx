import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { bestsellers } from '../data/site'
import PlantPhoto from './PlantPhoto'

const CARD_WIDTH = 260
const GAP = 32
const STEP = CARD_WIDTH + GAP
const SPEED_PX_PER_SEC = 30
const REPEAT = 3
const DRAG_THRESHOLD = 6
const MIN_SCALE = 0.9
const MAX_LIFT_PX = 8
const TILT_RANGE_PX = 420
const BASE_PHOTO_TILT_DEG = 9
const SNAP_EASE = 0.16
const SNAP_DONE_PX = 0.5

export default function BestsellerCarousel() {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const photoRefs = useRef([])
  const dotRefs = useRef([])
  const totalWidth = STEP * bestsellers.length
  const items = Array.from({ length: REPEAT }, () => bestsellers).flat()

  const state = useRef({
    offset: totalWidth,
    dragging: false,
    dragged: false,
    pointerStartX: 0,
    dragStartOffset: 0,
    snapTarget: null,
    rafId: null,
    lastTime: null,
  }).current

  useEffect(() => {
    function applyTransforms() {
      const display = totalWidth + (((state.offset % totalWidth) + totalWidth) % totalWidth)
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-display}px,0,0)`
      }
      const containerWidth = containerRef.current?.offsetWidth || 0
      const centerX = containerWidth / 2

      let nearestIndex = 0
      let nearestDist = Infinity

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const cardCenter = i * STEP + CARD_WIDTH / 2 - display
        const dist = cardCenter - centerX
        if (Math.abs(dist) < nearestDist) {
          nearestDist = Math.abs(dist)
          nearestIndex = i
        }
        const norm = Math.max(-1, Math.min(1, dist / TILT_RANGE_PX))
        const scale = 1 - Math.abs(norm) * (1 - MIN_SCALE)
        const lift = (1 - Math.abs(norm)) * MAX_LIFT_PX
        el.style.transform = `translateY(${-lift}px) scale(${scale})`
        el.style.zIndex = String(Math.round((1 - Math.abs(norm)) * 100))

        const photoEl = photoRefs.current[i]
        if (photoEl) {
          const sign = i % 2 === 0 ? -1 : 1
          const angle = sign * BASE_PHOTO_TILT_DEG * Math.abs(norm)
          photoEl.style.transform = `rotate(${angle}deg)`
        }
      })

      const activeDot = nearestIndex % bestsellers.length
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        dot.style.width = i === activeDot ? '24px' : '6px'
        dot.style.backgroundColor = i === activeDot ? 'var(--color-sage)' : 'rgba(244,241,232,0.35)'
      })
    }

    function frame(time) {
      if (state.lastTime == null) state.lastTime = time
      const dt = (time - state.lastTime) / 1000
      state.lastTime = time

      if (state.snapTarget != null) {
        state.offset += (state.snapTarget - state.offset) * SNAP_EASE
        if (Math.abs(state.snapTarget - state.offset) < SNAP_DONE_PX) {
          state.offset = state.snapTarget
          state.snapTarget = null
        }
      } else if (!state.dragging) {
        state.offset += SPEED_PX_PER_SEC * dt
      }

      applyTransforms()
      state.rafId = requestAnimationFrame(frame)
    }

    state.rafId = requestAnimationFrame(frame)
    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId)
      state.lastTime = null
    }
  }, [state, totalWidth])

  function handlePointerDown(e) {
    state.dragging = true
    state.dragged = false
    state.snapTarget = null
    state.pointerStartX = e.clientX
    state.dragStartOffset = state.offset
    state.pointerId = e.pointerId
  }

  function handlePointerMove(e) {
    if (!state.dragging) return
    const dx = e.clientX - state.pointerStartX
    if (!state.dragged && Math.abs(dx) > DRAG_THRESHOLD) {
      state.dragged = true
      // Only capture once a real drag is confirmed, so a plain click on a
      // card/dot still lands on its own element instead of the container.
      e.currentTarget.setPointerCapture(state.pointerId)
    }
    if (state.dragged) {
      state.offset = state.dragStartOffset - dx
    }
  }

  function handlePointerUp() {
    state.dragging = false
  }

  function handleClickCapture(e) {
    if (state.dragged) {
      e.preventDefault()
      e.stopPropagation()
      state.dragged = false
    }
  }

  function goToDot(index) {
    const containerWidth = containerRef.current?.offsetWidth || 0
    const centerX = containerWidth / 2
    const display = totalWidth + (((state.offset % totalWidth) + totalWidth) % totalWidth)
    const middleItemIndex = bestsellers.length + index
    const displayTarget = middleItemIndex * STEP + CARD_WIDTH / 2 - centerX

    let delta = displayTarget - display
    if (delta > totalWidth / 2) delta -= totalWidth
    if (delta < -totalWidth / 2) delta += totalWidth

    state.snapTarget = state.offset + delta
  }

  return (
    <div
      ref={containerRef}
      className="relative cursor-grab overflow-hidden px-4 py-10 active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
      style={{ touchAction: 'pan-y' }}
    >
      <div ref={trackRef} className="flex items-start gap-8 will-change-transform" style={{ width: 'max-content' }}>
        {items.map((plant, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="shrink-0 select-none will-change-transform"
            style={{ width: CARD_WIDTH }}
          >
            <Link to={`/plant/${plant.id}`} draggable={false} className="block">
              <div
                ref={(el) => (photoRefs.current[i] = el)}
                className="relative z-0 aspect-square overflow-hidden rounded-2xl border-4 border-panel-light shadow-xl shadow-black/40 will-change-transform"
              >
                <PlantPhoto seed={plant.id} src={plant.image} alt={plant.name} className="h-full w-full" />
              </div>
              <div className="relative z-10 mt-[-28px] rounded-2xl border border-line bg-panel-light px-5 pb-5 pt-5 shadow-lg shadow-black/20">
                <h3 className="font-display text-lg font-semibold text-cream">{plant.name}</h3>
                {plant.subtitle && <p className="text-sm italic text-cream-dim">{plant.subtitle}</p>}
                <p className="mt-2 text-sm leading-relaxed text-cream-dim">{plant.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                  <span className="flex h-5 w-5 items-center justify-center rounded border border-sage text-xs">+</span>
                  View details
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-panel to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-panel to-transparent"
        aria-hidden="true"
      />

      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          {bestsellers.map((plant, i) => (
            <button
              key={plant.id}
              ref={(el) => (dotRefs.current[i] = el)}
              onClick={() => goToDot(i)}
              aria-label={`Go to ${plant.name}`}
              className="h-1.5 w-1.5 rounded-full transition-all"
              style={{ backgroundColor: 'rgba(244,241,232,0.35)' }}
            />
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-xs text-cream-dim">
          <ArrowRight size={12} /> Drag to explore
        </p>
      </div>
    </div>
  )
}
