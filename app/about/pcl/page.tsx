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

  // Technician setup images for "Who Delivers" section (from ss*.jpg files)
  const technicianImages = [
    "/ss2.jpg",
    "/ss4.jpg", 
    "/ss5.jpg"
  ]
  const [currentTechImage, setCurrentTechImage] = useState(0)

  // Team portraits (responsive - portrait on mobile, landscape on desktop)
  const [isMobile, setIsMobile] = useState(false)
  const teamImages = isMobile
    ? [
        "/team/portrait/team_portrait_1.png",
        "/team/portrait/team_portrait_2.png",
        "/team/portrait/team_portrait_3.png",
        "/team/portrait/team_portrait_4.png",
        "/team/portrait/team_portrait_5.png"
      ]
    : [
        "/team/landscape/team_landscape_1.png",
        "/team/landscape/team_landscape_2.png",
        "/team/landscape/team_landscape_3.png",
        "/team/landscape/team_landscape_4.png",
        "/team/landscape/team_landscape_5.png"
      ]
  const [currentTeamImage, setCurrentTeamImage] = useState(0)

  // Scrolling images for procedures strip
  const serviceImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

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

  // Detect mobile for responsive team images
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-cycle technician images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechImage((prev) => (prev + 1) % technicianImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [technicianImages.length])

  // Auto-cycle team portraits
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamImage((prev) => (prev + 1) % teamImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [teamImages.length])

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
                    className="bg-white/70 backdrop-blur-md rounded-tr-3xl rounded-br-3xl p-6 md:p-8 shadow-xl transition-opacity duration-100 ml-0 sm:-ml-8"
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

        {/* Section 3: Clinical Excellence - WHO PLANS */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-emerald-600 font-semibold mb-2 uppercase tracking-wide text-sm">Clinical Excellence</p>
              <h2 className="text-3xl font-bold text-gray-900">Who Plans Your Procedures</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Expert radiologists whose expertise feeds directly into every fusion plan
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Dr Clare Allen */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-200">
                    <Image
                      src="/surgeons/ca.png"
                      alt="Dr Clare Allen"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h3>
                    <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Consultant Uroradiologist
                    </p>
                    <p className="text-sm text-gray-600">MBBS (Oxford) | GMC: 3108389</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Clare qualified from Oxford (MBBS, 1985) and is the uro-radiology lead consultant at University College London. She has pioneered the use of mpMRI for prostate cancer since 2000.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Lead radiologist on the <strong>PROMISE Trial</strong> which proved the efficacy of mpMRI for prostate cancer globally.
                  </p>
                </div>
              </div>

              {/* Dr Francesco Giganti */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200">
                    <Image
                      src="/surgeons/fg.png"
                      alt="Dr Francesco Giganti"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Dr Francesco Giganti</h3>
                    <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Radiologist & Associate Professor UCL
                    </p>
                    <p className="text-sm text-gray-600">University College London</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Dr Francesco Giganti's research involves the application of MRI in prostate cancer. During his PhD at UCL, he conducted research on the application of MRI in patients on active surveillance for prostate cancer (<strong>PRECISE score</strong>) and on tools to improve MRI quality (<strong>PI-QUAL score</strong>).
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/services/biopsy-plan"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                See the biopsy planning process
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Operational Excellence - WHO DELIVERS */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">Operational Excellence</p>
              <h2 className="text-3xl font-bold">Who Delivers in Theatre</h2>
              <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
                Application Specialists who work WITH the radiologist's plan to ensure seamless execution
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-emerald-400">On-Site Application Specialists</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Our Application Specialists are the backbone of every procedure. Their meticulous training spans <strong className="text-white">Sonablate, Nanoknife, and MIM MRI/Ultrasound Fusion Software</strong> platforms, as well as theatre equipment systems including Civco Biopsy Hardware and BK Trans-rectal Ultrasound.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  With experience across more than <strong className="text-white">1,000+ cases each year</strong>, our team sets up your chosen sampling equipment, guides the initial image alignment and calibration of the MRI fusion overlay—allowing you to focus better on the patient.
                </p>
              </div>

              {/* Technician Setup Images - 3 images cycling */}
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                {technicianImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: idx === currentTechImage ? 1 : 0 }}
                  >
                    <Image
                      src={img}
                      alt={`Technician setup ${idx + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                ))}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {technicianImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentTechImage ? 'w-8 bg-emerald-500' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Spirit Section - Between Technicians and Admin */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Building Team Spirit</h3>
              <p className="text-gray-600">In and out of theatre</p>
            </div>
            <div className="relative w-full h-[400px] md:h-[500px] max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg">
              {teamImages.map((img, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: idx === currentTeamImage ? 1 : 0 }}
                >
                  <Image
                    src={img}
                    alt={`Team ${idx + 1}`}
                    fill
                    className="object-contain bg-white"
                  />
                </div>
              ))}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {teamImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentTeamImage ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Coordination - WHO MAKES IT SEAMLESS */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-emerald-600 font-semibold mb-2 uppercase tracking-wide text-sm">Seamless Coordination</p>
              <h2 className="text-3xl font-bold text-gray-900">Who Makes It All Work</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Admin and logistics that ENABLE the clinical work—so all your secretary needs to do is call us
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Coordination & Administration */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                  Coordination & Administration
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>All your secretary needs to do is call us.</strong> Our coordination team handles imaging transfer, schedules Dr Allen's contouring, arranges on-site specialist deployment, and ensures everything is ready before you step into theatre.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  After the procedure, they coordinate the post-procedure targeting accuracy report—delivering complete documentation to support your clinical records.
                </p>
              </div>

              {/* Parker Transport */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8 border border-orange-200">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/logos/parker&sonstransport.gif"
                    alt="Parker & Son Transport"
                    width={120}
                    height={50}
                    className="h-12 w-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-orange-700">
                  Equipment Transport & Logistics
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>Parker Medical Transport</strong> handles the complex logistics of ferrying our precision equipment—including 6DOF stepper systems, ultrasound units, cradles, and calibration tools—safely to your location and back.
                </p>
                <p className="text-sm text-gray-500 italic">
                  Note: MRI images and planning data are transferred digitally via secure cloud-based systems—not by physical transport.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Services Images Strip */}
        <section className="py-8 bg-slate-100 overflow-hidden">
          <div className="flex gap-6 animate-scroll-left">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 flex-shrink-0">
                {serviceImages.map((num) => (
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
                href="/about/clinician-experience"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all inline-block"
              >
                Meet Our Clinicians
              </Link>
              <Link
                href="/about/equipment-services"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-block"
              >
                See Our Equipment
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
