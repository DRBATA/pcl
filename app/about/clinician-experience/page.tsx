"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

export default function PartnersPage() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clinicians = [
    {
      name: "Dr Clare Allen",
      title: "Consultant Uroradiologist",
      image: "/surgeons/ca.png",
      hasQuote: false
    },
    {
      name: "Dr Francesco Giganti",
      title: "Radiologist & Associate Professor",
      image: "/surgeons/fg.png",
      hasQuote: false
    },
    {
      name: "Mr Marc Laniado",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/ml.png",
      hasQuote: true,
      quote: "The Prostate Care team take all the fuss out of fusion. Without having to do any extra preparation, I am able to provide the highest standard of prostate biopsy service for my patients. The Application Specialists bring the fusion software and the pre-prepared biopsy plans with them and manage the software throughout the procedure. They are a pleasure to work with."
    },
    {
      name: "Mr Raj Nigam",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/rn.png",
      hasQuote: true,
      quote: "The Application Specialists are a highly professional team. An accurate fusion is vital for the procedure and their expertise in achieving this is invaluable. The biopsies are tracked and a graphic report is provided, which helps the patients understand their diagnosis and treatment options."
    },
    {
      name: "Mr Tim Dudderidge",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/td.png",
      hasQuote: false
    },
    {
      name: "Mr Alan Doherty",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/ad.png",
      hasQuote: true,
      quote: "I have been fortunate to work with Prostate Care for the last 10 years. It is a good general rule that if you want to be excellent at something, work with excellent people. I have always been impressed by their commitment to providing the best in care, no matter the service. For example, they invest considerable resources in acquiring state-of-the-art software that enables MRI imaging to be processed and presented in a way that supports precision diagnostics—such as MRI fusion-targeted prostate biopsies—and precision therapies, including High Intensity Focused Ultrasound (HIFU) and Nanoknife procedures. Their complex equipment is always maintained and operated by highly trained and experienced technicians. Without their expertise, these sophisticated procedures would not be performed to such a high standard. I share their passion for outstanding patient outcomes, and I am deeply grateful for their steadfast behind-the-scenes support. One instance that stands out was when their team went above and beyond to ensure seamless coordination during a particularly challenging case, which resulted in an excellent patient outcome."
    },
    {
      name: "Mr Peter Cooke",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/pc.png",
      hasQuote: true,
      quote: "I have been working with Prostate Care for almost 7 years. They provide an excellent, flexible service and technical support. The specialist MRI review and mapping has undoubtedly increased my cancer detection rates, with greater biopsy accuracy and many previously unreported abnormalities identified. Patient experience and feedback has been very good. A pleasure to work with."
    },
    {
      name: "Mr Christopher Ogden",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/co.png",
      hasQuote: false
    },
    {
      name: "Professor Richard Hindley",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/rh.png",
      hasQuote: true,
      quote: "The Prostate Care contouring service is what makes the difference. All I need to do is ask my secretary to book the service and the Prostate Care operations team arrange for the patient MRI scans to be transferred via IEP, ready for contouring by Dr Clare Allen. This, in my opinion, is the optimal standard of care for my private patients."
    },
    {
      name: "Professor Prasanna Sooriakumaran",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/ps.png",
      hasQuote: false
    },
    {
      name: "Mr Leye Ajayi",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/la.png",
      hasQuote: false
    },
    {
      name: "Mr Christopher Anderson",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/ca2.png",
      hasQuote: false
    },
    {
      name: "Mr Mark Lynch",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/ml2.png",
      hasQuote: false
    },
    {
      name: "Mr Martin Nuttall",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/mn.png",
      hasQuote: false
    },
    {
      name: "Mrs Alice O'Leary",
      title: "Consultant Urological Surgeon",
      image: "/favicon.ico",
      hasQuote: false
    },
    {
      name: "Mr Benjamin Lamb",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/bl.png",
      hasQuote: false
    },
    {
      name: "Professor Prabhaker Rajan",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/pr.png",
      hasQuote: false
    }
  ]

  // Get only clinicians with quotes for cycling
  const cliniciansWithQuotes = clinicians.filter(c => c.hasQuote)

  // Function to scroll to center the active clinician
  const scrollToActiveClinician = (clinicianName: string) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const clinicianIndex = clinicians.findIndex(c => c.name === clinicianName)
    
    // Calculate scroll position (each clinician is ~112px wide including gap: 96px circle + 16px gap)
    const itemWidth = 112
    const targetScroll = clinicianIndex * itemWidth - (container.clientWidth / 2) + (itemWidth / 2)
    
    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    })
  }

  // Handle user scroll - pause auto-behavior
  const handleUserScroll = () => {
    setIsPaused(true)
    
    // Clear existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
    
    // Resume after 10 seconds of no scrolling
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  // Auto-cycle through clinicians with quotes
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cliniciansWithQuotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, cliniciansWithQuotes.length])

  const activeClinician = cliniciansWithQuotes[activeIndex]

  // Auto-scroll to active clinician when activeIndex changes
  useEffect(() => {
    if (!isPaused && activeClinician) {
      scrollToActiveClinician(activeClinician.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused])

  const handleClinicianClick = (clinician: typeof clinicians[0]) => {
    if (!clinician.hasQuote) return
    
    const quoteIndex = cliniciansWithQuotes.findIndex(c => c.name === clinician.name)
    if (quoteIndex !== -1) {
      setActiveIndex(quoteIndex)
      scrollToActiveClinician(clinician.name)
      setIsPaused(true)
      
      // Scroll quote into view after a brief delay to allow carousel to center
      setTimeout(() => {
        const quoteSection = document.querySelector('[data-quote-section]')
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Add an offset upwards (negative moves up, positive moves down)
    setTimeout(() => {
      const offset = window.innerWidth < 768 ? -100 : -350
      window.scrollBy({ top: offset, behavior: 'smooth' })
    }, 400) // small delay lets the first scroll finish
        }
      }, 300)
      
      // Clear existing timeout
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
      
      // Resume after 10 seconds
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false)
      }, 10000)
    }
  }

  return (
    <>
      <Header />
      <main className="pb-10">
        
        {/* Hero Section with Parallax */}
        <section 
          ref={sectionRef}
          className="relative text-white overflow-hidden min-h-screen flex flex-col"
        >
          {/* Parallax Background */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 z-0"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/team.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
                opacity: 0.4
              }}
            />
          </motion.div>

          {/* Gradient Overlay - Darker for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-slate-900/85 z-5"></div>

          {/* Content */}
          <div className="relative flex-1 flex flex-col justify-center z-10 pt-4">
            <div className="container-custom pb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Clinician Experience
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Trusted by leading urological surgeons across the UK. We provide the technical expertise and support that allows you to focus on what matters most - delivering exceptional patient care.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Clinicians Horizontal Scroll - At Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pb-6">
            <div className="container-custom">
              <div 
                ref={scrollContainerRef}
                onScroll={handleUserScroll}
                className="flex gap-4 overflow-x-auto pb-4 px-4 scroll-smooth bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#10b981 #e5e7eb'
                }}
              >
                {clinicians.map((clinician) => {
                  const isActive = activeClinician && activeClinician.name === clinician.name
                  
                  return (
                    <motion.div
                      key={clinician.name}
                      onClick={() => handleClinicianClick(clinician)}
                      className={`flex-shrink-0 flex flex-col items-center transition-all duration-300 py-4 ${
                        clinician.hasQuote ? 'cursor-pointer hover:scale-105' : 'cursor-default opacity-75'
                      }`}
                      whileHover={clinician.hasQuote ? { scale: 1.05 } : {}}
                    >
                      <div 
                        className={`relative w-20 h-20 rounded-full overflow-hidden transition-all duration-500 ${
                          isActive 
                            ? 'ring-4 ring-emerald-400 ring-offset-2 ring-offset-white/50 shadow-2xl shadow-emerald-500/50 scale-110' 
                            : clinician.hasQuote 
                              ? 'ring-2 ring-white/50 hover:ring-emerald-300' 
                              : 'ring-2 ring-white/30'
                        }`}
                      >
                        <Image
                          src={clinician.image}
                          alt={clinician.name}
                          fill
                          className="object-cover"
                        />
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-emerald-500/20"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <p className="text-[10px] font-semibold text-white text-center mt-2 w-20 drop-shadow-md">
                        {clinician.name}
                      </p>
                      <p className="text-[8px] text-white/80 text-center w-20 drop-shadow-md">
                        {clinician.title}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom py-16">

          {/* Active Quote Display */}
          {activeClinician && (
            <motion.section
              key={activeClinician.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-xl mt-6"
              data-quote-section
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border-l-4 border-emerald-500 shadow-md mb-6">
                  <svg className="w-10 h-10 text-emerald-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 leading-relaxed text-base lg:text-lg italic">
                    "{activeClinician.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-emerald-200">
                      <Image
                        src={activeClinician.image}
                        alt={activeClinician.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{activeClinician.name}</p>
                      <p className="text-sm font-medium text-emerald-600">{activeClinician.title}</p>
                    </div>
                  </div>

                  {/* Progress Dots */}
                  <div className="hidden md:flex gap-2">
                    {cliniciansWithQuotes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveIndex(idx)
                          setIsPaused(true)
                          setTimeout(() => setIsPaused(false), 10000)
                        }}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`View testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* The Complete Service Package: Equipment & Logistics */}
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white rounded-2xl p-12 border-4 border-amber-600 mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
              The Complete Technical Package
            </h2>
            <p className="text-center text-lg mb-8 max-w-4xl mx-auto leading-relaxed">
              Our Application Specialists handle the <strong>complex technical setup, equipment calibration, and real-time support</strong> so you can focus entirely on clinical decision-making and patient care.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-500">
                <h3 className="text-xl font-bold mb-4 text-amber-300">What We Handle For You</h3>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Equipment logistics</strong> - Nationwide delivery, setup, disassembly for every procedure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Precision calibration</strong> - 6-degree-of-freedom positioning, probe alignment, field matching</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Real-time technical support</strong> - Software optimization, hardware management, fusion accuracy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Sterile technique support</strong> - Draping, probe preparation, maintaining aseptic field</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-500">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">Our Service Values</h3>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Meticulous attention to detail</strong> - Every setup verified, every target confirmed, every core documented</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Partnership approach</strong> - Supporting your clinical excellence with technical expertise</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Technical expertise</strong> - Years of experience with fusion software, ultrasound physics, MRI interpretation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Consistent reliability</strong> - On-time, every time, with comprehensive preparation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-lg p-6 border border-white/30">
              <p className="text-center font-semibold text-lg mb-2">
                Why Surgeons Choose to Work With Us
              </p>
              <p className="text-center text-sm text-gray-200">
                Our team's specialized expertise in equipment logistics, technical troubleshooting, and precision calibration means you can concentrate on what you do best - clinical judgment and patient outcomes. We handle the complexity, you deliver exceptional care.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
