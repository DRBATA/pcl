"use client"
import { Header } from "@/components/header"
import { SimpleHero } from "@/components/simple-hero"
// import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ServicesColumns } from "@/components/services-columns"
import { CollectionStrip } from "@/components/collection-strip"
import { VideoContactSection } from "@/components/video-contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <Header />
      
      {/* Section 1: Hero with video */}
      <div className="h-screen snap-start snap-always relative">
        <SimpleHero />
        
        {/* Explore chevron - positioned over hero section */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <button
            onClick={() => {
              const main = document.querySelector('main')
              if (main) {
                main.scrollBy({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })
              }
            }}
            className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 pointer-events-auto"
            aria-label="Scroll to next section"
          >
            <span className="text-white/60 text-xs font-light uppercase tracking-widest group-hover:text-white transition-colors">
              Explore
            </span>
            <svg
              className="w-6 h-6 text-white/80 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Section 2: HIFU Cards */}
      <div className="min-h-screen snap-start snap-always bg-background pt-28 relative">
        <FeaturedProducts />
        
        {/* Explore chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <button
            onClick={() => {
              const main = document.querySelector('main')
              if (main) {
                main.scrollBy({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })
              }
            }}
            className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 pointer-events-auto"
            aria-label="Scroll to next section"
          >
            <span className="text-slate-600/60 text-xs font-light uppercase tracking-widest group-hover:text-slate-900 transition-colors">
              Explore
            </span>
            <svg
              className="w-6 h-6 text-slate-600/80 group-hover:text-slate-900 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Section 3: Services Columns */}
      <div className="min-h-screen snap-start snap-always relative">
        <ServicesColumns />
        
        {/* Explore chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <button
            onClick={() => {
              const main = document.querySelector('main')
              if (main) {
                main.scrollBy({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })
              }
            }}
            className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 pointer-events-auto"
            aria-label="Scroll to next section"
          >
            <span className="text-slate-600/60 text-xs font-light uppercase tracking-widest group-hover:text-slate-900 transition-colors">
              Explore
            </span>
            <svg
              className="w-6 h-6 text-slate-600/80 group-hover:text-slate-900 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Section 4: Video to Contact */}
      <div className="h-screen snap-start snap-always">
        <VideoContactSection />
      </div>
      
      {/* Footer */}
      <div className="snap-start">
        <Footer />
      </div>
    </main>
  )
}
