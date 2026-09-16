import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../data/site'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi! I'd like to know more about your plants and availability.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sage-dark text-cream shadow-lg shadow-black/40 transition-transform hover:scale-105 hover:bg-sage"
    >
      <MessageCircle size={26} />
    </a>
  )
}
