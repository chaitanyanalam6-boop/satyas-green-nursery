import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import VisitAvailabilityModal from './components/VisitAvailabilityModal'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Plants from './pages/Plants'
import CategoryDetail from './pages/CategoryDetail'
import PlantDetail from './pages/PlantDetail'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [visitModalOpen, setVisitModalOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (!showSplash) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [showSplash])

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <ScrollToTop />
      <Header onOpenVisitModal={() => setVisitModalOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:slug" element={<CategoryDetail />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <VisitAvailabilityModal open={visitModalOpen} onClose={() => setVisitModalOpen(false)} />
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
    </div>
  )
}
