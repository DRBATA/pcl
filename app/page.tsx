"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { SimpleHero } from "@/components/simple-hero"
// import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ServicesColumns } from "@/components/services-columns"
import { CollectionStrip } from "@/components/collection-strip"
import { VideoContactSection } from "@/components/video-contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [showWarning, setShowWarning] = useState(true)

  return (
    <>
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

    {/* Healthcare Professional Warning Overlay */}
    {showWarning && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        
        {/* Animated medical cross pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-emerald-400 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/3 w-16 h-16 border-2 border-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-2xl mx-auto px-8 text-center">
          {/* Medical Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <svg
                className="w-24 h-24 text-emerald-400 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
            Healthcare Professionals
            <span className="block text-3xl md:text-4xl text-emerald-400 mt-2 font-light">Only</span>
          </h1>

          {/* Message */}
          <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed font-light">
            This site is intended for healthcare professionals only
          </p>
          
          <p className="text-base text-slate-400 mb-12 max-w-lg mx-auto">
            By continuing, you confirm that you are a healthcare professional with appropriate qualifications to access this content.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setShowWarning(false)}
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-lg font-medium rounded-full shadow-2xl shadow-emerald-900/50 hover:shadow-emerald-900/80 hover:scale-105 transition-all duration-300"
          >
            <span>I Confirm</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
          </button>

          {/* Disclaimer */}
          <p className="mt-8 text-xs text-slate-500 italic">
            Not intended for patient use or general public access
          </p>
        </div>
      </div>
    )}
    </>
  )
}
