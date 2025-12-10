"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Hero image - same as homepage carousel
import heroRadiologist from "@/public/hero/radiologist.png"

function MultiparametricMRIViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mriSequences = [
    {
      image: "/NEW/1.png",
      title: "Multiparametric MRI View 1",
      description: "Six different MRI sequences accessible for precision contouring - T2-weighted, ADC maps, diffusion, vascularity, and more"
    },
    {
      image: "/NEW/2.png",
      title: "Multiparametric MRI View 2",
      description: "Same anatomical plane, different sequences reveal different tissue characteristics for expert lesion identification"
    },
    {
      image: "/NEW/3.png",
      title: "Multiparametric MRI View 3",
      description: "Dr. Allen views all sequences simultaneously to identify targets with precision, creating detailed fusion plans"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mriSequences.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
        Multiparametric MRI Contouring: Six Views, One Volume
      </h2>
      <p className="text-center text-gray-700 text-sm mb-4 max-w-4xl mx-auto">
        <strong>Traditional approach:</strong> Surgeons review a single MRI scan and estimate biopsy targets.
      </p>
      <p className="text-center text-gray-700 text-sm mb-8 max-w-4xl mx-auto">
        <strong>With PCL:</strong> Dr. Allen accesses <strong>six different MRI sequence views</strong> of the same anatomical plane - T2-weighted, ADC, diffusion, vascularity patterns - to contour lesions with millimeter precision.
      </p>

      <div className="relative w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px]">
            {mriSequences.map((seq, idx) => (
              <div 
                key={idx} 
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                style={{ opacity: idx === currentIndex ? 1 : 0 }}
              >
                <Image
                  src={seq.image}
                  alt={seq.title}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            {mriSequences.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-12 bg-purple-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700 text-center">
              {mriSequences[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContouringVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const markers = [
    { time: 0, label: "Start" },
    { time: 35, label: "Contouring" },
    { time: 60, label: "Planning" },
    { time: 154, label: "Coordinates" }
  ]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const jumpToMarker = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-2xl blur-xl"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/u/contouring_dr_allen.mp4" type="video/mp4" />
        </video>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-between mb-2 px-1">
            {markers.map((marker) => (
              <button
                key={marker.time}
                onClick={() => jumpToMarker(marker.time)}
                className="text-[10px] text-white/70 hover:text-white transition-colors px-2 py-1 rounded bg-white/10 hover:bg-white/20"
              >
                {marker.label}
              </button>
            ))}
          </div>

          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer mb-3"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-emerald-400 transition-colors">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-emerald-400 transition-colors">
                {isMuted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                )}
              </button>
              <span className="text-white text-sm">{Math.floor(currentTime)}s / {Math.floor(duration)}s</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function BiopsyPlanPageNew() {
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

  // Calculate card opacity and transform based on scroll
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
            {/* Hero Image - Radiologist (same as carousel) */}
            <div className="absolute inset-0">
              <Image
                src={heroRadiologist}
                alt="Expert radiologist reviewing prostate MRI scans"
                fill
                className="object-cover"
                priority
                placeholder="blur"
              />
              {/* Gradient that fades as you scroll */}
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
                      Confidence in every{" "}
                      <span style={{ color: "var(--color-medical-green)" }}>contour.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                      Expert radiologist-led targeting plans delivered <strong>before your procedure day</strong>. 
                      No interpretation required—just millimeter-accurate coordinates ready to use.
                    </p>
                    
                    {/* Key Stat - Surgeon-focused */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                      <p className="text-sm text-gray-700">
                        <span className="text-2xl font-bold" style={{ color: "var(--color-medical-green)" }}>24-48hrs</span>{" "}
                        Plans delivered before your procedure day—<strong>walk in ready</strong>.
                      </p>
                    </div>

                    <Link
                      href="#expert-process"
                      onClick={(e) => { e.preventDefault(); scrollToSection('expert-process'); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                    >
                      See the process
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </Link>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link
                        href="/about/pcl"
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                      >
                        Meet Dr Clare Allen
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

        {/* Section 1: The Expert Process - with Video */}
        <section id="expert-process" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">Expert Radiology</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Dr Clare Allen's Contouring Process
                </h2>
                <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                  Watch our lead radiologist contour lesions in real-time. Using multiparametric MRI sequences, 
                  Dr Allen identifies and maps every target with millimeter precision—before your procedure day.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">20+ years prostate mpMRI expertise</p>
                      <p className="text-slate-400 text-sm">UCL Lead, PROMISE Trial lead radiologist</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Six MRI sequences analyzed</p>
                      <p className="text-slate-400 text-sm">T2, ADC, diffusion, vascularity patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Ready-to-use coordinates</p>
                      <p className="text-slate-400 text-sm">No interpretation needed in theatre</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Video Player */}
              <ContouringVideoPlayer />
            </div>
          </div>
        </section>

        {/* Section 2: MRI Viewer */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <MultiparametricMRIViewer />
          </div>
        </section>

        {/* Section 3: Dr Clare Allen Profile */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container-custom">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-green-200">
              <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
                Expert MRI Contouring by Dr Clare Allen
              </h2>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg">
                    <Image
                      src="/surgeons/ca.png"
                      alt="Dr Clare Allen"
                      width={300}
                      height={300}
                      className="w-full h-auto rounded-xl mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr Clare Allen</h3>
                    <p className="text-lg font-medium mb-2" style={{ color: "var(--color-medical-green)" }}>
                      Consultant Radiologist
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Oxford Graduate, UCL Uro-Radiology Lead</p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Background & Expertise</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Dr Allen qualified from Oxford and is the uro-radiology lead consultant at UCL. She has pioneered the use of mpMRI imaging for prostate cancer since 2000 and has led the establishment of reporting standards for prostate cancer imaging in the UK and internationally.
                      </p>
                      
                      {/* Research Evidence Box */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                        <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Key Publication</p>
                        <p className="text-sm text-gray-700">
                          <strong>Lead Radiologist - PROMIS Trial</strong> (The Lancet, 2017)<br/>
                          <em>"MP-MRI can reduce over-diagnosis of clinically insignificant prostate cancer AND improve detection of clinically significant cancer."</em>
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <p className="text-xs text-amber-600 font-semibold uppercase mb-1">Recent Research</p>
                        <p className="text-sm text-gray-700">
                          <strong>PRIME Trial</strong> (BMJ Open, 2023) - Biparametric vs Multiparametric MRI<br/>
                          <em>"In most patients we are unlikely to miss significant prostate cancer if we stop doing the contrast scan."</em>
                        </p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                      <p className="text-gray-700 text-sm italic mb-4">
                        "The fusion software allows me to view the T2, the dynamically enhanced and the high B value scans, plus the ADC map simultaneously. I can contour the targets using whichever images best show the lesion."
                      </p>
                      <p className="text-sm font-medium text-emerald-800">— Dr Clare Allen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3b: Dr Francesco Giganti - Quality Assurance Research */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-blue-400 font-semibold mb-2 uppercase tracking-wide text-sm">Quality Assurance Research</p>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Dr Francesco Giganti - MRI Quality Standards
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      Dr Giganti is a Consultant Radiologist and Associate Professor at UCL, whose research has established 
                      the international standards for prostate MRI quality and active surveillance monitoring.
                    </p>
                    
                    {/* PI-QUAL Evidence Box */}
                    <div className="bg-blue-900/50 rounded-lg p-4 border border-blue-500/30 mb-4">
                      <p className="text-xs text-blue-400 font-semibold uppercase mb-1">Creator - PI-QUAL Score</p>
                      <p className="text-sm text-slate-300">
                        <strong className="text-white">Prostate Imaging QUALity Score</strong> (European Urology Oncology, 2020)<br/>
                        <em>A standardized quality control scoring system for prostate MRI, developed from the PRECISION trial. 
                        Now used internationally to ensure diagnostic-quality imaging.</em>
                      </p>
                    </div>
                    
                    {/* PRECISE Evidence Box */}
                    <div className="bg-emerald-900/50 rounded-lg p-4 border border-emerald-500/30 mb-4">
                      <p className="text-xs text-emerald-400 font-semibold uppercase mb-1">Co-Developer - PRECISE Score</p>
                      <p className="text-sm text-slate-300">
                        <strong className="text-white">PRECISE Recommendations</strong> (Radiology, 2018)<br/>
                        <em>Standardized scoring for sequential MRI in active surveillance patients. Enables consistent 
                        monitoring of prostate cancer progression across institutions.</em>
                      </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Research Collaboration</p>
                      <p className="text-sm text-slate-300">
                        Dr Giganti and Dr Allen are <strong className="text-white">co-authors on multiple publications</strong>, 
                        including the Sequential PRECISE Software Program study (2018). Their combined expertise ensures 
                        every plan meets the highest quality standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Image
                    src="/surgeons/fg.png"
                    alt="Dr Francesco Giganti"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-xl mb-4"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">Dr Francesco Giganti</h3>
                  <p className="text-lg font-medium text-emerald-400 mb-2">
                    Radiologist & Associate Professor
                  </p>
                  <p className="text-sm text-slate-400 font-medium">University College London</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Planning Workflow */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>
              Virtual Grid Alignment & Target Planning
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/NEW/vritualprobe-biopsygrid.png"
                    alt="Virtual probe positioning with biopsy grid overlay"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Part A: Virtual Probe Positioning
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Dr. Allen positions a virtual ultrasound probe and biopsy grid in the MRI space. The cyan overlay shows the planned probe angle and grid coordinates.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border border-emerald-200">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Part B: MRI Fusion to Virtual Ultrasound
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The MRI-contoured targets are fused to the virtual ultrasound view. Green contours show planned biopsy targets ready to be matched on procedure day.
                  </p>
                  <div className="bg-emerald-100 rounded-lg p-3">
                    <p className="text-xs text-emerald-900 font-semibold">
                      This fusion plan is created days before your procedure. On the day, our Application Specialist loads this plan and matches it to live ultrasound.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/NEW/MRI_to-US_fusion.png"
                    alt="MRI targets fused to virtual ultrasound view"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why It Matters */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-emerald-900 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Expert Pre-Procedure Planning Matters</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Expert Radiologist Contouring</h3>
                <p className="text-sm text-blue-100">
                  Dr. Clare Allen - UK pioneer in mpMRI for prostate cancer - interprets multiparametric sequences with 20+ years of specialized expertise.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Virtual Fusion Pre-Alignment</h3>
                <p className="text-sm text-blue-100">
                  Targets aligned to virtual ultrasound probe and template grid BEFORE your procedure day - no rushing, no cognitive guesswork in theatre.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Ready-to-Use Targeting Plan</h3>
                <p className="text-sm text-blue-100">
                  Walk into theatre with precise coordinates already calculated. Your Application Specialist loads the plan - you proceed straight to sampling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              All Your Secretary Needs to Do Is Call Us
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We handle imaging transfer, expert contouring, virtual fusion planning, and on-site technical support. You walk into theatre with the plan ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all inline-block"
              >
                Get Started
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
