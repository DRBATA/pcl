"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Hero image - same as homepage carousel
import heroHarley from "@/public/hero/harley.png"

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = target / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function AboutPCLPageNew() {
  // Parallax scroll state for vanishing card
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const [currentTeamImage, setCurrentTeamImage] = useState(0)

  const clinicalTeamImages = [
    { image: "/surgeons/jk.png", name: "John Kelly", role: "Managing Director" },
    { image: "/surgeons/ca.png", name: "Dr Clare Allen", role: "Lead Radiologist" },
    { image: "/surgeons/aa.png", name: "Adam Anderson", role: "Application Specialist" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamImage((prev) => (prev + 1) % clinicalTeamImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [clinicalTeamImages.length])

  const cardOpacity = Math.max(0, 1 - scrollY / 300)
  const cardTranslateY = Math.min(scrollY * 0.3, 100)
  const gradientOpacity = Math.max(0.3, 0.7 - scrollY / 500)

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
        
        {/* Hero Section with Parallax Vanishing Card */}
        <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          <div className="relative flex-1 flex flex-col">
            {/* Hero Image - Harley Street (same as carousel) */}
            <div className="absolute inset-0">
              <Image
                src={heroHarley}
                alt="Prestigious Harley Street medical centre"
                fill
                className="object-cover"
                priority
                placeholder="blur"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent transition-opacity duration-100"
                style={{ opacity: gradientOpacity }}
              />
            </div>

            {/* Hero Content - Parallax vanishing card */}
            <div className="absolute bottom-16 left-0 right-0">
              <div className="container-custom">
                <div className="max-w-xl">
                  <div 
                    className="bg-white rounded-tr-3xl rounded-br-3xl p-8 md:p-10 shadow-xl transition-opacity duration-100 ml-0 sm:-ml-8"
                    style={{ 
                      opacity: cardOpacity,
                      transform: `translateY(-${cardTranslateY}px)`,
                      pointerEvents: cardOpacity < 0.3 ? 'none' : 'auto'
                    }}
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      What the great centres{" "}
                      <span style={{ color: "var(--color-medical-green)" }}>already do.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                      Expert mpMRI contouring, fusion biopsy and 3D reports—delivered as a 
                      <strong> fully managed service</strong> on your site.
                    </p>
                    
                    {/* Key Stat - Director focused */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                      <p className="text-sm text-gray-700">
                        <span className="text-2xl font-bold" style={{ color: "var(--color-medical-green)" }}>20+ years</span>{" "}
                        enabling <strong>precision diagnostics</strong> at the UK's leading centres.
                      </p>
                    </div>

                    <Link
                      href="#track-record"
                      onClick={(e) => { e.preventDefault(); scrollToSection('track-record'); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                    >
                      See our track record
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </Link>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                      >
                        Partner with us
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: Track Record Stats */}
        <section id="track-record" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-emerald-600 font-semibold mb-2 uppercase tracking-wide text-sm">Our Track Record</p>
              <h2 className="text-4xl font-bold text-gray-900">Proven Across the UK's Leading Centres</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  ~<AnimatedCounter target={100} />
                </div>
                <p className="text-gray-600">Surgeons</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  ~<AnimatedCounter target={95} />
                </div>
                <p className="text-gray-600">Hospitals</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  <AnimatedCounter target={6} suffix="+" />
                </div>
                <p className="text-gray-600">Major Hospital Groups</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  <AnimatedCounter target={4095} />
                </div>
                <p className="text-gray-600">Procedures (2023-25)</p>
              </div>
            </div>

            {/* Hospital logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <Image src="/hero/HCA_logo_transparnt.png" alt="HCA Healthcare" width={120} height={50} className="h-10 w-auto object-contain" />
              <Image src="/hero/spire_logo_transparnt.png" alt="Spire Healthcare" width={120} height={50} className="h-10 w-auto object-contain" />
              <Image src="/hero/circle_logo_transparent.png" alt="Circle Health" width={120} height={50} className="h-10 w-auto object-contain" />
              <Image src="/hero/liv_harley_trans.png" alt="Liv Hospital" width={120} height={50} className="h-10 w-auto object-contain invert" />
              <Image src="/hero/newfos_log_transparnt.png" alt="New Foscote" width={120} height={50} className="h-10 w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* Section 2: Mission Statement */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-200">
                <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
                  Our Mission
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                  For over 20 years, Prostate Care Limited has enabled <strong>precision diagnostics and nuanced care</strong> for 
                  prostate cancer patients. We support urological surgeons with state-of-the-art equipment and top-level clinical 
                  planning to achieve the most reliable diagnostics and treatments.
                </p>
                <p className="text-emerald-700 font-semibold text-xl italic text-center">
                  "Precision Diagnostics and Nuanced Care" — our guiding principle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Choose PCL */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Prostate Care Limited</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Clinical Support</h3>
                <p className="text-sm text-slate-300">
                  Application Specialists handle setup, fusion alignment, and real-time guidance throughout procedures
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Radiologist-Led Contouring</h3>
                <p className="text-sm text-slate-300">
                  Specialist prostate MRI interpretation and target delineation by Dr Clare Allen
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Fully Managed Service</h3>
                <p className="text-sm text-slate-300">
                  No capital investment, no storage, no maintenance—we bring everything and take it away
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Team */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>
              Our Clinical Team
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Team Image Carousel */}
                  <div className="relative h-[400px]">
                    {clinicalTeamImages.map((member, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: idx === currentTeamImage ? 1 : 0 }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    ))}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {clinicalTeamImages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentTeamImage ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Team Info */}
                  <div>
                    <div className="transition-opacity duration-500">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {clinicalTeamImages[currentTeamImage].name}
                      </h3>
                      <p className="text-lg font-medium mb-4" style={{ color: "var(--color-medical-green)" }}>
                        {clinicalTeamImages[currentTeamImage].role}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Our team combines decades of clinical expertise with hands-on operational excellence. 
                      From expert MRI contouring to real-time theatre support, we're with you at every step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Join the UK's Leading Centres
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Partner with Prostate Care Limited and offer your patients the same standard of care trusted by 95+ hospitals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all inline-block"
              >
                Partner With Us
              </Link>
              <Link
                href="/services/how-it-works"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-block"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
