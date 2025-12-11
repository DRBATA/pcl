"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Hero image - same as homepage carousel
import heroTheatre from "@/public/hero/section3_updated.png"

export default function HowItWorksPageNew() {
  // Parallax scroll state for vanishing card
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

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

  const processSteps = [
    {
      number: "01",
      title: "Book Our Service",
      description: "Your secretary calls to book. We handle scheduling, equipment logistics, and coordinate with your theatre team."
    },
    {
      number: "02", 
      title: "Imaging Transfer",
      description: "We securely receive patient MRI scans and Dr Clare Allen contours targets using multiparametric analysis."
    },
    {
      number: "03",
      title: "Plan Delivery",
      description: "Fusion-ready targeting plans delivered 24-48 hours before your procedure day. Walk in ready."
    },
    {
      number: "04",
      title: "Equipment Arrives",
      description: "Our Application Specialist arrives with all equipment—Sonablate, Nanoknife, MIM, or BK systems as needed."
    },
    {
      number: "05",
      title: "Theatre Support",
      description: "We manage fusion, grid alignment, and software. Your team focuses entirely on the patient."
    },
    {
      number: "06",
      title: "Clean Exit",
      description: "Equipment packed, theatre returned exactly as found. No storage, no maintenance, no capital burden."
    }
  ]

  return (
    <>
      <Header />
      <main className="overflow-y-auto">
        
        {/* Hero Section with Parallax Vanishing Card */}
        <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          <div className="relative flex-1 flex flex-col">
            {/* Hero Image - Theatre/Sonablate (same as carousel) */}
            <div className="absolute inset-0">
              <Image
                src={heroTheatre}
                alt="PCL Application Specialist with surgeon reviewing Sonablate system"
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
                    className="bg-white/70 backdrop-blur-md rounded-tr-3xl rounded-br-3xl p-6 md:p-8 shadow-xl transition-opacity duration-100 ml-0 sm:-ml-8"
                    style={{ 
                      opacity: cardOpacity,
                      transform: `translateY(-${cardTranslateY}px)`,
                      pointerEvents: cardOpacity < 0.3 ? 'none' : 'auto'
                    }}
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      Every list.{" "}
                      <span style={{ color: "var(--color-medical-green)" }}>Close to clockwork.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                      Our Application Specialists manage the <strong>fusion, grid alignment, and software</strong>—so 
                      your surgeon and team can focus entirely on the patient.
                    </p>
                    
                    {/* Key Stat - Theatre Manager focused */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                      <p className="text-sm text-gray-700">
                        <span className="text-2xl font-bold" style={{ color: "var(--color-medical-green)" }}>1,000+</span>{" "}
                        procedures supported annually—<strong>predictable, reliable, every time</strong>.
                      </p>
                    </div>

                    <Link
                      href="#process-steps"
                      onClick={(e) => { e.preventDefault(); scrollToSection('process-steps'); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                    >
                      See the process
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: Process Steps */}
        <section id="process-steps" className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined process makes it easy to access state-of-the-art equipment and expert support 
                without the burden of ownership.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
                >
                  <div className="text-5xl font-bold mb-4" style={{ color: "var(--color-medical-green)", opacity: 0.3 }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What We Bring */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">What We Bring to Your Theatre</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Sonablate</h3>
                <p className="text-sm text-slate-300">HIFU ablation system</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Nanoknife</h3>
                <p className="text-sm text-slate-300">IRE ablation system</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">MIM Software</h3>
                <p className="text-sm text-slate-300">Fusion planning</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">BK Systems</h3>
                <p className="text-sm text-slate-300">Ultrasound & biopsy</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-slate-300 text-lg">
                <strong className="text-white">No capital investment required.</strong> We bring everything, we take everything away.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2b: Surgeon Quote - Social Proof */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                <div className="text-emerald-400 text-5xl mb-4">"</div>
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-6 italic">
                  One of the major advantages of working with ProstateCare Ltd is how easy it is to book their service.
                  Their operations team reserve the equipment for us and then liaise directly with the private hospital. I
                  know they will be there on time and ready to start.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Consultant Urological Surgeon</p>
                    <p className="text-sm text-slate-400">Private Practice, London</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Promise */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
                We Arrive. We Run. We Leave.
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Your theatre exactly as we found it. No equipment storage. No maintenance schedules. 
                No training burden. Just reliable, expert support whenever you need it.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
                  <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>Zero</div>
                  <p className="text-gray-600">Capital investment</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
                  <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>Zero</div>
                  <p className="text-gray-600">Storage required</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
                  <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>Zero</div>
                  <p className="text-gray-600">Maintenance burden</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              See How Expert Planning Makes It Possible
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our seamless theatre operations start with expert radiologist planning. See how Dr Clare Allen's contouring creates the precision that powers every procedure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/biopsy-plan"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all inline-block"
              >
                See Biopsy Planning
              </Link>
              <Link
                href="/about/pcl"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-block"
              >
                About Our Team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
