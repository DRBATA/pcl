"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function TargetingAccuracyReportPageNew() {
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

  // Auto-cycle carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setSection2CurrentView((prev) => (prev + 1) % section2Images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSection3CurrentView((prev) => (prev + 1) % section3Images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSection4CurrentView((prev) => (prev + 1) % section4Images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
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
            {/* Hero Image - Report Welcome */}
            <div className="absolute inset-0">
              <Image
                src="/hero/report_welcome.png"
                alt="Consultant discussing results with patient"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative h-full flex items-center py-8 pt-28 sm:py-12 sm:pt-32">
              <div className="container-custom">
                <div className="max-w-2xl">
                  {/* Overlay Card */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      The moment they see{" "}
                      <span style={{ color: "var(--color-medical-green)" }}>what you see.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                      3D reports that turn <strong>complex diagnostics</strong> into{" "}
                      <strong>clear, confident decisions</strong> your patients can understand.
                    </p>
                    
                    {/* Key Stat */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                      <p className="text-sm text-gray-700">
                        <span className="text-2xl font-bold" style={{ color: "var(--color-medical-green)" }}>85%</span>{" "}
                        of patients report <strong>better understanding</strong> when visual aids are used in consultations.
                      </p>
                    </div>

                    <Link
                      href="#how-it-works"
                      onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                    >
                      See how it works
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: The Problem We Solve - DARK */}
        <section id="how-it-works" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center pt-20 pb-10 border-t border-emerald-600/30">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div>
                  <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">Before the Procedure</p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    The plan they can see
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    Once our team receives the MRI images, our radiologist contours the lesions for biopsy or treatment. 
                    This initial report gives surgeons <strong className="text-white">immediate, actionable insight</strong> without 
                    the need for radiologic interpretation.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Precise lesion location</p>
                        <p className="text-slate-400 text-sm">Where the key lesions are and how aggressive they appear</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Surgical planning cues</p>
                        <p className="text-slate-400 text-sm">Gland size and PSA density to influence the operative plan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Faster decisions</p>
                        <p className="text-slate-400 text-sm">Confident choices on nerve preservation, margin planning, and target selection</p>
                      </div>
                    </div>
                  </div>
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

              {/* Scroll arrow */}
              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => scrollToSection('decision-support')}
                  className="animate-bounce cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Scroll to next section"
                >
                  <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Decision Support - LIGHT */}
        <section id="decision-support" className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center pt-20 pb-32 border-t border-gray-200">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div>
                  <p className="font-semibold mb-2 uppercase tracking-wide text-sm" style={{ color: "var(--color-medical-green)" }}>During Consultation</p>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                    Faster decisions. Clearer choices.
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    This summary distills complex imaging data into <strong>precise anatomical and functional cues</strong>—showing 
                    where the key lesions are, how aggressive they appear, and how gland size or PSA density might influence the operative plan.
                  </p>
                  
                  {/* Evidence Box */}
                  <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm mb-6">
                    <p className="text-sm text-gray-600 mb-2">Research shows:</p>
                    <p className="text-gray-800">
                      Structured visual reports cut <strong>repeat consultations from 85% to 19%</strong> by enabling 
                      surgeons to pinpoint details accurately the first time.
                    </p>
                  </div>

                  <div className="space-y-3">
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
                      <span className="text-gray-700">Precision target selection with visual confirmation</span>
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
          
          <button 
            onClick={() => scrollToSection('3d-visualization')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <svg className="w-6 h-6 opacity-60" style={{ color: "var(--color-medical-green)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* Section 3: 3D Biopsy Visualization - DARK */}
        <section id="3d-visualization" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center pt-20 pb-10 border-t border-emerald-600/30">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div>
                  <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">Post-Procedure</p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    Every lesion. Every core. Fully mapped.
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    Three-dimensional visualisation of prostate contour, biopsy location and depth is provided to the surgeons—and 
                    crucially, can be <strong className="text-white">shared with patients</strong>.
                  </p>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">What the report shows</h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong className="text-white">Prostate contour</strong> with lesions outlined in red and yellow</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong className="text-white">Numbered biopsy cores</strong> showing order of sampling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong className="text-white">3D markers</strong> showing exact biopsy locations on each lesion</span>
                      </li>
                    </ul>
                  </div>

                  {/* Patient Trust Box */}
                  <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl p-4 border border-emerald-500/30">
                    <p className="text-emerald-300 text-sm">
                      <strong>Patient benefit:</strong> Patients who see visual aids report <strong>higher trust</strong> in 
                      their treatment plan and feel <strong>more confident</strong> asking questions.
                    </p>
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

              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => scrollToSection('fusion-in-action')}
                  className="animate-bounce cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Scroll to next section"
                >
                  <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Ultrasound Fusion - LIGHT */}
        <section id="fusion-in-action" className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center pt-20 pb-20 border-t border-gray-200">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Left: Text */}
                <div>
                  <p className="font-semibold mb-2 uppercase tracking-wide text-sm" style={{ color: "var(--color-medical-green)" }}>Real-Time Precision</p>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                    Visible proof of accuracy
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    Ultrasound captures with overlaid prostate contours show the <strong>fusion in action</strong>—what 
                    surgeons see during the procedure, with MRI-derived contours ensuring accurate targeting.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    These real-time visualizations demonstrate that every biopsy can be <strong>directly correlated</strong> with 
                    its histopathology result for complete transparency.
                  </p>

                  {/* Clinician Partners Link */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-gray-800 font-semibold mb-2">Meet our clinical team</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Expert radiologists and dedicated support specialists working together to deliver exceptional care.
                    </p>
                    <Link 
                      href="/about/pcl"
                      className="inline-flex items-center gap-2 font-medium"
                      style={{ color: "var(--color-medical-green)" }}
                    >
                      View clinician partners
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
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
                <h3 className="text-3xl font-bold mb-4">See a patient-ready report</h3>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Contact our team to see how our targeting accuracy reports can transform your patient consultations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    Request a sample report
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/services/mr-us-fusion-biopsy"
                    className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Learn about fusion biopsy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
