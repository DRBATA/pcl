"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function ServicesPageNew() {
  const [currentReportView, setCurrentReportView] = useState(0)

  const reportViews = [
    { image: "biopsy/left.png" },
    { image: "biopsy/posterior-anterior.png" },
    { image: "biopsy/right.png" },
    { image: "biopsy/a.png" },
    { image: "biopsy/view.png" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReportView((prev) => (prev + 1) % reportViews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const header = document.querySelector('header')
      const headerHeight = header?.getBoundingClientRect().height || 80
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: sectionTop - headerHeight, behavior: 'smooth' })
    }
  }

  const processSteps = [
    {
      number: "01",
      title: "Easy Booking",
      description: "Contact our operations team to reserve equipment. We liaise directly with your hospital to coordinate scheduling.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Pre-Procedure Planning",
      description: "Our radiologists review MRI scans and create detailed biopsy plans using specialist contouring software. Plans are ready before procedure day.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Equipment Delivery & Setup",
      description: "Our team arrives on-site with all equipment, performs setup and safety checks. Everything is ready when you need it.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    {
      number: "04",
      title: "On-Site Support",
      description: "Application Specialists remain present throughout procedures, managing fusion software and providing real-time technical guidance.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "05",
      title: "Post-Procedure Reporting",
      description: "Detailed graphic reports showing biopsy tracking and results, helping patients understand their diagnosis and treatment options.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "06",
      title: "Equipment Disassembly",
      description: "Our team handles all equipment disassembly and removal. No maintenance costs or storage requirements for your facility.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
  ]

  return (
    <>
      <Header />
      <main className="overflow-y-auto">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          <div className="relative flex-1 flex flex-col">
            <div className="absolute inset-0">
              <Image
                src="/hero/theatre_one.png"
                alt="Modern operating theatre with PCL equipment and specialist support"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            <div className="relative h-full flex items-center py-8 pt-28 sm:py-12 sm:pt-32">
              <div className="container-custom">
                <div className="max-w-2xl">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--color-medical-green)" }}>
                      Fully Managed Theatre Support
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      The list runs.{" "}
                      <span style={{ color: "var(--color-medical-green)" }}>You don't worry.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                      A dedicated <strong>applications specialist</strong> manages the fusion, grid alignment, 
                      and software—so your surgeon and team can focus entirely on the patient.
                    </p>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                      <p className="text-sm text-gray-700">
                        We arrive, we run, we leave your theatre{" "}
                        <strong style={{ color: "var(--color-medical-green)" }}>exactly as we found it.</strong>
                      </p>
                    </div>

                    <Link
                      href="#how-it-works"
                      onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                    >
                      See how a list runs
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: Your Theatre, Our Specialist - DARK */}
        <section id="how-it-works" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 border-t border-emerald-600/30">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <Image
                      src="/hero/section3.png"
                      alt="PCL specialist guiding surgeon through fusion software"
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Right: Text */}
                <div>
                  <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">On-Site Excellence</p>
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Your theatre. Our specialist. Every time.
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    Our Application Specialists are the backbone of every procedure. They manage the <strong className="text-white">technical 
                    complexity</strong> so your surgeon can focus on what matters—the patient.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Fusion software management</p>
                        <p className="text-slate-400 text-sm">Real-time image alignment and calibration</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Equipment expertise</p>
                        <p className="text-slate-400 text-sm">Sonablate, Nanoknife, MIM, BK ultrasound systems</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">1,000+ cases per year</p>
                        <p className="text-slate-400 text-sm">Experience you can rely on</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-slate-300 text-sm italic">
                      "One of the major advantages of working with ProstateCare Ltd is how easy it is to book their service. 
                      I know they will be there on time and ready to start."
                    </p>
                    <p className="text-emerald-400 text-sm mt-2 font-medium">— Consultant Urologist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Process Steps - LIGHT */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 border-t border-gray-200">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="font-semibold mb-2 uppercase tracking-wide text-sm" style={{ color: "var(--color-medical-green)" }}>
                  The Process
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our streamlined process makes it easy to access <strong>state-of-the-art equipment</strong> and 
                  expert support without the burden of ownership.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                      <span className="text-4xl font-bold opacity-20" style={{ color: "var(--color-medical-green)" }}>
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Services Images Strip */}
        <section className="bg-white py-12 overflow-hidden border-t border-gray-200">
          <div className="flex gap-6 animate-scroll-left">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 flex-shrink-0">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                  <div
                    key={`${setIndex}-${num}`}
                    className="relative w-[400px] h-[300px] flex-shrink-0 rounded-3xl overflow-hidden"
                  >
                    <Image
                      src={`/ss${num}.jpg`}
                      alt={`Service showcase ${num}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: What We Provide - DARK */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 border-t border-emerald-600/30">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">On the Day Support</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-emerald-400 mb-6">What We Provide</h3>
                  <ul className="space-y-4 text-slate-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Application Specialists on-site throughout procedure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Real-time fusion software management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Technical guidance and troubleshooting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Biopsy tracking and documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-blue-400 mb-6">Post-Procedure</h3>
                  <ul className="space-y-4 text-slate-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Detailed graphic reports provided</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Biopsy tracking visualization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Patient-friendly result documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Complete equipment disassembly and removal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Targeting Report Preview - LIGHT */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 border-t border-gray-200">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-8 border border-emerald-200 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                    Your Targeting Accuracy Report
                  </h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        After each procedure, surgeons receive a detailed report showing{" "}
                        <strong>exactly how well they met their targets</strong>—quantifying accuracy, 
                        documenting sampling coverage, and providing objective evidence of diagnostic quality.
                      </p>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        This visualisation also provides <strong>clear reassurance for patients</strong>, 
                        demonstrating that the precise area of concern has been accurately sampled.
                      </p>
                      <Link
                        href="/about/targeting-accuracy-report"
                        className="inline-flex items-center gap-2 font-medium"
                        style={{ color: "var(--color-medical-green)" }}
                      >
                        See the full report
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden shadow-lg border border-emerald-200">
                      <div className="relative w-full h-[400px] bg-white">
                        {reportViews.map((view, idx) => (
                          <div
                            key={idx}
                            className="absolute inset-0 transition-opacity duration-1000"
                            style={{ opacity: idx === currentReportView ? 1 : 0 }}
                          >
                            <Image
                              src={view.image}
                              alt={`Targeting Report View ${idx + 1}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ))}
                        
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {reportViews.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentReportView(idx)}
                              className={`h-2 rounded-full transition-all ${
                                idx === currentReportView ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                              }`}
                              aria-label={`View ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-green-900 to-emerald-800 py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-green-100 mb-8">
                Contact our operations team to book your service and experience the ProstateCare Ltd difference.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Book a Call <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
