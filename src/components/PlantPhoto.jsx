const PALETTES = [
  ['#1f3d29', '#3f6b45'],
  ['#20402e', '#4c8a52'],
  ['#173327', '#357a5c'],
  ['#25402a', '#5a9a5f'],
]

function paletteFor(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTES[hash % PALETTES.length]
}

export default function PlantPhoto({ seed = 'plant', src, alt = '', className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`object-cover ${className}`}
      />
    )
  }

  const [from, to] = paletteFor(seed)
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="text-5xl opacity-90" role="img" aria-label="">
        🌿
      </span>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
    </div>
  )
}
