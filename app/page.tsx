"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

// Hero images with blur placeholders
import heroReportSharing from "@/public/hero/report_sharing_2.png"
import heroRadiologist from "@/public/hero/radiologist.png"
import heroTheatre from "@/public/hero/theatre_one.png"
import heroHarley from "@/public/hero/harley.png"
import { useState, useEffect, useRef } from "react"

// Animated counter component
function CountUp({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function HomePageNew() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      id: "report",
      image: heroReportSharing,
      headline: "The moment they see",
      headlineAccent: "what you see.",
      subline: "3D reports that turn complex diagnostics into clear, confident decisions your patients can understand.",
      cta: "See a patient-ready report",
      ctaLink: "/about/targeting-accuracy-report",
      scrollTarget: "section-report",
      position: "left" as const
    },
    {
      id: "radiology",
      image: heroRadiologist,
      headline: "Confidence in every",
      headlineAccent: "contour.",
      subline: "Expert radiologist-led targeting plans delivered before your procedure day.",
      cta: "Meet our radiologists",
      ctaLink: "/services/biopsy-plan",
      scrollTarget: "section-radiology",
      position: "right" as const
    },
    {
      id: "theatre",
      image: heroTheatre,
      headline: "Your theatre. Our specialist.",
      headlineAccent: "Every time.",
      subline: "A dedicated applications specialist manages the fusion and software—so your team can focus on the patient.",
      cta: "See how a list runs",
      ctaLink: "/services",
      scrollTarget: "section-theatre",
      position: "left" as const
    },
    {
      id: "prestige",
      image: heroHarley,
      headline: "What the great centres",
      headlineAccent: "already do.",
      subline: "Expert mpMRI contouring, fusion biopsy and 3D reports—delivered as a fully managed service on your site.",
      cta: "See our track record",
      ctaLink: "/about/pcl",
      scrollTarget: "section-prestige",
      position: "left" as const
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 80
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <main className="overflow-y-auto">
        
        {/* Hero Carousel */}
        <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          {/* Background Images */}
          {heroSlides.map((slide, idx) => (
            <div key={slide.id} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: idx === currentSlide ? 1 : 0 }}>
              <Image src={slide.image} alt="" fill className="object-cover" priority placeholder="blur" />
              <div className={`absolute inset-0 ${slide.position === 'right' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/70 via-black/50 to-transparent`} />
            </div>
          ))}

          {/* Content - Cromwell-style positioning (switches left/right per slide) */}
          <div className="absolute bottom-20 left-0 right-0">
            <div className="container-custom">
              <div className={`max-w-xl transition-all duration-500 ${heroSlides[currentSlide].position === 'right' ? 'ml-auto' : ''}`}>
                {/* Glassmorphic texture + Cromwell shape - More translucent per John's request */}
                <div className={`bg-white/50 backdrop-blur-md p-8 md:p-10 shadow-2xl border border-white/40 transition-all duration-500 ${
                  heroSlides[currentSlide].position === 'right' 
                    ? 'rounded-tl-3xl rounded-bl-3xl mr-0 sm:-mr-8' 
                    : 'rounded-tr-3xl rounded-br-3xl ml-0 sm:-ml-8'
                }`}>
                  {heroSlides.map((slide, idx) => (
                    <div key={slide.id} className={`transition-opacity duration-500 ${idx === currentSlide ? 'block' : 'hidden'}`}>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {slide.headline}{" "}
                        <span style={{ color: "var(--color-medical-green)" }}>{slide.headlineAccent}</span>
                      </h1>
                      <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">{slide.subline}</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href={slide.ctaLink} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                          {slide.cta}
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                        <button onClick={() => scrollToSection(slide.scrollTarget)} className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 bg-white/50 text-gray-700 font-semibold rounded-lg hover:bg-white/80 transition-all">
                          Learn more
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Carousel Dots */}
                  <div className="flex gap-2 mt-8">
                    {heroSlides.map((_, idx) => (
                      <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`} aria-label={`Slide ${idx + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bounce Arrow - targets current slide's section */}
          <button onClick={() => scrollToSection('hospital-logos')} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll to section">
            <svg className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Hospital Logos Strip - Scrolling Marquee on light background */}
        <section id="hospital-logos" className="bg-gray-50 overflow-hidden border-t border-gray-200">
          <div className="relative flex items-center h-20">
            {/* First set of logos */}
            <div className="flex animate-marquee items-center gap-12 pr-12">
              <Image src="/hero/HCA_logo_transparnt.png" alt="HCA Healthcare" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
              <Image src="/hero/spire_logo_transparnt.png" alt="Spire Healthcare" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
              <Image src="/hero/circle_logo_transparent.png" alt="Circle Health Group" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
              <Image src="/hero/liv_harley_trans.png" alt="Liv Hospital Harley Street" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0 invert" />
              <Image src="/hero/newfos_log_transparnt.png" alt="The New Foscote Hospital" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex animate-marquee items-center gap-12 pr-12" aria-hidden="true">
              <Image src="/hero/HCA_logo_transparnt.png" alt="HCA Healthcare" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
              <Image src="/hero/spire_logo_transparnt.png" alt="Spire Healthcare" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
              <Image src="/hero/circle_logo_transparent.png" alt="Circle Health Group" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
              <Image src="/hero/liv_harley_trans.png" alt="Liv Hospital Harley Street" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0 invert" />
              <Image src="/hero/newfos_log_transparnt.png" alt="The New Foscote Hospital" width={180} height={70} className="h-14 w-auto object-contain flex-shrink-0" />
            </div>
          </div>
        </section>

        {/* Section 1: Report - Curved edge image */}
        <section id="section-report" className="relative bg-white overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Curved image container - bleeds left, curved right edge */}
            <div className="relative h-[400px] lg:h-auto">
              <Image 
                src="/hero/report_welcome.png" 
                alt="Consultant discussing results with patient" 
                fill 
                className="object-cover object-[center_30%]"
              />
            </div>
            {/* Text content */}
            <div className="flex items-center py-16 lg:py-20 px-8 lg:px-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="max-w-lg">
                <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">Patient Communication</p>
                <h2 className="text-4xl font-bold text-white mb-6">Where precision meets understanding.</h2>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">When your patient can see their prostate mapped in 3D—with every lesion, every biopsy core visualized—the consultation transforms. <strong className="text-white">85% of patients</strong> report better understanding. More importantly, they trust the plan.</p>
                <Link href="/about/targeting-accuracy-report" className="inline-flex items-center gap-2 font-medium text-emerald-400 hover:text-emerald-300">
                  Explore the full report <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            </div>
          </div>
          <button onClick={() => scrollToSection('section-radiology')} className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"><svg className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></button>
        </section>

        {/* Section 2: Radiology - Mirrored curved edge (image right, curved left edge) */}
        <section id="section-radiology" className="relative bg-white overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Text content */}
            <div className="flex items-center py-16 lg:py-20 px-8 lg:px-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
              <div className="max-w-lg ml-auto">
                <p className="font-semibold mb-2 uppercase tracking-wide text-sm" style={{ color: "var(--color-medical-green)" }}>Expert Radiology</p>
                <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>Confidence in every contour.</h2>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">Every mpMRI is read by a subspecialist prostate radiologist—including <strong>Dr Clare Allen</strong>, lead radiologist on the landmark PROMISE Trial. Your cases receive the same scrutiny as a teaching hospital MDT.</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium">PROMISE Trial</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">PI-QUAL Score</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">UCL Lead</span>
                </div>
                <Link href="/services/biopsy-plan" className="inline-flex items-center gap-2 font-medium" style={{ color: "var(--color-medical-green)" }}>
                  See how we plan your cases <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            </div>
            {/* Curved image container - bleeds right, curved left edge */}
            <div className="relative h-[400px] lg:h-auto">
              <Image 
                src="/hero/trainee_radiologist_MDT.png" 
                alt="MDT review session" 
                fill 
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>
          <button onClick={() => scrollToSection('section-theatre')} className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"><svg className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></button>
        </section>

        {/* Section 3: Theatre */}
        <section id="section-theatre" className="relative bg-white overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Image */}
            <div className="relative h-[400px] lg:h-auto">
              <Image 
                src="/hero/section3.png" 
                alt="PCL specialist guiding surgeon" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Text content */}
            <div className="flex items-center py-16 lg:py-20 px-8 lg:px-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="max-w-lg">
                <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">Theatre Support</p>
                <h2 className="text-4xl font-bold text-white mb-6">Your theatre. Our specialist. Every time.</h2>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">Our Application Specialists manage the <strong className="text-white">fusion, grid alignment, and software</strong>—so your surgeon and team can focus entirely on the patient. We arrive, we run, we leave your theatre exactly as we found it.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 1,000+ cases supported per year</li>
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Sonablate, Nanoknife, MIM, BK systems</li>
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> No capital investment required</li>
                </ul>
                <Link href="/services" className="inline-flex items-center gap-2 font-medium text-emerald-400 hover:text-emerald-300">
                  See how it works <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            </div>
          </div>
          <button onClick={() => scrollToSection('section-prestige')} className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"><svg className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></button>
        </section>

        {/* Section 4: Prestige/Stats - with animated counters */}
        <section id="section-prestige" className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 border-t border-gray-200">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <p className="font-semibold mb-2 uppercase tracking-wide text-sm" style={{ color: "var(--color-medical-green)" }}>Our Track Record</p>
              <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>Proven across the UK's leading centres</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                <p className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  <CountUp end={100} prefix="~" />
                </p>
                <p className="text-gray-600">Surgeons</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                <p className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  <CountUp end={95} prefix="~" />
                </p>
                <p className="text-gray-600">Hospitals</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                <p className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  <CountUp end={6} suffix="+" />
                </p>
                <p className="text-gray-600">Major Hospital Groups</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                <p className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  <CountUp end={4095} duration={2500} />
                </p>
                <p className="text-gray-600">Procedures (2023-25)</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/about/pcl" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                About Prostate Care Limited <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-green-900 to-emerald-800 py-20">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to elevate your prostate service?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Contact our team to discuss how we can support your practice with precision diagnostics and expert clinical support.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Get in Touch <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
