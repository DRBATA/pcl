"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function TargetingAccuracyReportPage() {
  // Carousel states for each section
  const [section2CurrentView, setSection2CurrentView] = useState(0)
  const [section3CurrentView, setSection3CurrentView] = useState(0)
  const [section4CurrentView, setSection4CurrentView] = useState(0)

  // Section 2 carousel images
  const section2Images = [
    { image: "/targetting/section2_image_a.png" },
    { image: "/targetting/section2_image_b.png" },
  ]

  // Section 3 carousel images (existing biopsy images)
  const section3Images = [
    { image: "/biopsy/view.png" },
    { image: "/biopsy/left.png" },
    { image: "/biopsy/posterior-anterior.png" },
    { image: "/biopsy/right.png" },
    { image: "/biopsy/a.png" },
  ]

  // Section 4 carousel images
  const section4Images = [
    { image: "/targetting/section4_image_a.png" },
    { image: "/targetting/section4_image_b.png" },
    { image: "/targetting/section4_image_c.png" },
  ]

  // Auto-cycle for Section 2
  useEffect(() => {
    const interval = setInterval(() => {
      setSection2CurrentView((prev) => (prev + 1) % section2Images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle for Section 3
  useEffect(() => {
    const interval = setInterval(() => {
      setSection3CurrentView((prev) => (prev + 1) % section3Images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle for Section 4
  useEffect(() => {
    const interval = setInterval(() => {
      setSection4CurrentView((prev) => (prev + 1) % section4Images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionNumber: number) => {
    const section = document.querySelector(`section:nth-of-type(${sectionNumber})`)
    if (section) {
      const header = document.querySelector('header')
      const headerHeight = header?.getBoundingClientRect().height || 80
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <Header />
      <main className="overflow-y-auto">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          <div className="relative flex-1 flex flex-col">
            {/* Hero Image */}
            <div className="absolute inset-0">
              <Image
                src="/reassuring/public.png"
                alt="Targeting Accuracy Report"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative h-full flex items-center py-8 pt-28 sm:py-12 sm:pt-32">
              <div className="container-custom">
                <div className="max-w-4xl text-left text-white">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                    Targeting Accuracy Report
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 leading-relaxed drop-shadow-md">
                    Comprehensive visualization from pre-biopsy planning to post-procedure reporting
                  </p>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
                    Bridging imaging and surgical decision-making with precision diagnostic tools
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection(2)}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <div className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
          
          {/* Green bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: Pre-Biopsy Plan - DARK */}
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center pt-20 pb-10 border-t border-emerald-600/30">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    Pre-Biopsy Plan
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    Once our secretaries have liaised with the location where the MRI was completed and received those images, our radiologist contours the lesions for biopsy or treatment and this initial report is populated by MIM software.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    This summary gives surgeons immediate, actionable insight from the MRI without the need for radiologic interpretation. It distills complex imaging data into precise anatomical and functional cues—showing where the key lesions are, how aggressive they appear, and how gland size or PSA density might influence the operative plan. By bridging imaging and surgical decision-making, it allows faster, more confident choices on nerve preservation, margin planning, and target selection, ensuring the MRI directly informs the craft of surgery rather than sitting in the background as a radiology report.
                  </p>
                </div>

                {/* Right: Static Image */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="relative w-full h-[500px] bg-white">
                    <Image
                      src="/targetting/section1_image_a.png"
                      alt="Pre-Biopsy MRI Plan"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Scroll to next section arrow */}
              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => scrollToSection(3)}
                  className="animate-bounce cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Scroll to next section"
                >
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Surgical Decision Support - LIGHT */}
        <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center pt-20 pb-32 border-t border-gray-200">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                    Surgical Decision Support
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This summary gives surgeons immediate, actionable insight from the MRI without the need for radiologic interpretation. It distills complex imaging data into precise anatomical and functional cues—showing where the key lesions are, how aggressive they appear, and how gland size or PSA density might influence the operative plan.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Faster, more confident surgical decisions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Informed nerve preservation and margin planning</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Precision target selection</span>
                    </div>
                  </div>
                </div>

                {/* Right: Carousel */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="relative w-full h-[500px] bg-white">
                    {section2Images.map((view, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: idx === section2CurrentView ? 1 : 0 }}
                      >
                        <Image
                          src={view.image}
                          alt={`Surgical Decision Support View ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                    
                    {/* Progress Dots */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {section2Images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSection2CurrentView(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === section2CurrentView ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                          }`}
                          aria-label={`View ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection(4)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <svg className="w-6 h-6 opacity-60" style={{ color: "var(--color-medical-green)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* Section 3: 3D Biopsy Visualization - DARK */}
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center pt-20 pb-10 border-t border-emerald-600/30">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    3D Biopsy Visualization
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    Three dimensional visualisation of prostate contour, biopsy location and depth is provided to the surgeons.
                  </p>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">What You're Seeing</h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>First image:</strong> Contours overlaid onto theatre grid (calibrated on ultrasound), prostate contour, lesions outlined in red and yellow, with a numbering system showing biopsies taken in order</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>Following images:</strong> 3D markers showing where the surgeon biopsied on each lesion</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right: Carousel */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="relative w-full h-[500px] bg-white">
                    {section3Images.map((view, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: idx === section3CurrentView ? 1 : 0 }}
                      >
                        <Image
                          src={view.image}
                          alt={`3D Biopsy Visualization ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                    
                    {/* Progress Dots */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {section3Images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSection3CurrentView(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === section3CurrentView ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                          }`}
                          aria-label={`View ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll to next section arrow */}
              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => scrollToSection(5)}
                  className="animate-bounce cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Scroll to next section"
                >
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Ultrasound Fusion - LIGHT */}
        <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center pt-20 pb-20 border-t border-gray-200">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Left: Text */}
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                    Ultrasound Fusion in Action
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    US captures with overlaid prostate contours for biopsy locations with the fusion in place.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These real-time visualizations show what surgeons see during the procedure—ultrasound images with precise MRI-derived contours overlaid, ensuring accurate targeting throughout the biopsy process.
                  </p>
                </div>

                {/* Right: Carousel */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="relative w-full h-[500px] bg-white">
                    {section4Images.map((view, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: idx === section4CurrentView ? 1 : 0 }}
                      >
                        <Image
                          src={view.image}
                          alt={`Ultrasound Fusion View ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                    
                    {/* Progress Dots */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {section4Images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSection4CurrentView(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === section4CurrentView ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                          }`}
                          aria-label={`View ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center bg-gradient-to-br from-green-900 to-emerald-800 text-white rounded-2xl p-12">
                <h3 className="text-3xl font-bold mb-4">Experience Precision Diagnostics</h3>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Contact our operations team to learn more about our targeting accuracy reports and comprehensive biopsy services.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
