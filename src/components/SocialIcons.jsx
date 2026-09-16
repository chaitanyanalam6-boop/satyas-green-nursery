export function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 8.5s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.3 5 12 5 12 5s-4.3 0-7.1.2c-.4.1-1.3.1-2.1 1C2.2 6.9 2 8.5 2 8.5S1.8 10.4 1.8 12.3v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1C7.1 21.4 12 21.5 12 21.5s4.3 0 7.1-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.7-.2-3.7Z" />
      <path d="m10 9.5 5 2.7-5 2.7z" fill="currentColor" stroke="none" />
    </svg>
  )
}
