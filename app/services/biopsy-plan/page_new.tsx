"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

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
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
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

function MultiparametricMRIViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mriSequences = [
    { image: "/NEW/1.png", title: "View 1", description: "Six different MRI sequences accessible for precision contouring" },
    { image: "/NEW/2.png", title: "View 2", description: "Same anatomical plane, different sequences reveal different tissue characteristics" },
    { image: "/NEW/3.png", title: "View 3", description: "All sequences viewed simultaneously to identify targets with precision" }
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
        Multiparametric MRI: Six Views, One Volume
      </h2>
      <p className="text-center text-gray-700 text-sm mb-8 max-w-4xl mx-auto">
        Our radiologists access <strong>six different MRI sequence views</strong> of the same anatomical plane—T2-weighted, 
        ADC, diffusion, vascularity patterns—to contour lesions with millimeter precision.
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
                <Image src={seq.image} alt={seq.title} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            {mriSequences.map((_, idx) => (
              <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-12 bg-purple-600' : 'w-2 bg-gray-300'}`} />
            ))}
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700 text-center">{mriSequences[currentIndex].description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BiopsyPlanPageNew() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const header = document.querySelector('header')
      const headerHeight = header?.getBoundingClientRect().height || 80
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: sectionTop - headerHeight, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <main className="overflow-y-auto">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          <div className="relative flex-1 flex flex-col">
            <div className="absolute inset-0">
              <Image
                src="/hero/radiologist_at_desk.png"
                alt="Expert radiologist reviewing prostate MRI scans"
                fill
                className="object-cover object-right"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div className="relative h-full flex items-center py-8 pt-28 sm:py-12 sm:pt-32">
              <div className="container-custom">
                <div className="max-w-2xl">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--color-medical-green)" }}>
                      Subspecialist Prostate Radiology
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      Expert eyes on{" "}
                      <span style={{ color: "var(--color-medical-green)" }}>every scan.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                      Your mpMRI read and contoured by <strong>PROMISE Trial radiologists</strong>—the landmark study 
                      that proved MRI efficacy for prostate cancer worldwide.
                    </p>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold" style={{ color: "var(--color-medical-green)" }}>Big-centre radiology quality</span>{" "}
                        delivered as part of a seamless mobile service.
                      </p>
                    </div>

                    <Link
                      href="#meet-radiologists"
                      onClick={(e) => { e.preventDefault(); scrollToSection('meet-radiologists'); }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Meet our radiologists
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
            onClick={() => scrollToSection('meet-radiologists')}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: Meet the Radiologists - DARK */}
        <section id="meet-radiologists" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 border-t border-emerald-600/30">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">World-Class Expertise</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Confidence in every contour
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Your cases receive the same scrutiny as a <strong className="text-white">teaching hospital MDT</strong>. 
                  Big-centre quality, delivered wherever you operate.
                </p>
              </div>

              {/* Radiologist Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Dr Clare Allen */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500/30 flex-shrink-0">
                      <Image src="/surgeons/ca.png" alt="Dr Clare Allen" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Dr Clare Allen</h3>
                      <p className="text-emerald-400 font-medium mb-2">Consultant Uroradiologist</p>
                      <p className="text-slate-400 text-sm">MBBS (Oxford) | UCL Uro-Radiology Lead</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 text-slate-300 text-sm">
                    <p>
                      <strong className="text-white">Lead radiologist on the PROMISE Trial</strong>—the landmark study 
                      that proved mpMRI efficacy for prostate cancer globally.
                    </p>
                    <p>Pioneered mpMRI for prostate cancer since 2000. Established UK and international reporting standards.</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">PROMISE Trial</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">UCL Lead</span>
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">25+ Years</span>
                  </div>
                </div>

                {/* Dr Francesco Giganti */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/30 flex-shrink-0">
                      <Image src="/fg.png" alt="Dr Francesco Giganti" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Dr Francesco Giganti</h3>
                      <p className="text-blue-400 font-medium mb-2">Radiologist & Associate Professor</p>
                      <p className="text-slate-400 text-sm">University College London</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 text-slate-300 text-sm">
                    <p>
                      <strong className="text-white">Developed PI-QUAL and PRECISE scores</strong>—now used globally 
                      to assess MRI quality and active surveillance protocols.
                    </p>
                    <p>PhD research on MRI applications in prostate cancer at UCL.</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">PI-QUAL Score</span>
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">PRECISE Score</span>
                    <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">UCL</span>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Watch: Expert Contouring in Action</h3>
                <div className="max-w-4xl mx-auto">
                  <ContouringVideoPlayer />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: MRI Viewer - LIGHT */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 border-t border-gray-200">
          <div className="container-custom">
            <MultiparametricMRIViewer />
          </div>
        </section>

        {/* Section 3: The Planning Workflow - DARK */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 border-t border-emerald-600/30">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wide text-sm">The Process</p>
                <h2 className="text-4xl font-bold text-white mb-4">Virtual Grid Alignment & Target Planning</h2>
              </div>

              {/* Part A */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                    <Image src="/NEW/vritualprobe-biopsygrid.png" alt="Virtual probe positioning" width={1200} height={800} className="w-full h-auto" />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Part A: Virtual Probe Positioning</h3>
                    <p className="text-slate-300 mb-4">
                      The radiologist positions a virtual ultrasound probe and biopsy grid in the MRI space, 
                      showing planned probe angle and grid coordinates for systematic sampling.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex gap-2"><span className="text-emerald-400">•</span> Green outline = Prostate boundary from MRI</li>
                      <li className="flex gap-2"><span className="text-cyan-400">•</span> Cyan overlay = Virtual probe and biopsy grid</li>
                      <li className="flex gap-2"><span className="text-blue-400">•</span> Grid pattern = Systematic sampling coordinates</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Part B */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Part B: MRI Fusion to Virtual Ultrasound</h3>
                    <p className="text-slate-300 mb-4">
                      MRI-contoured targets are fused to the virtual ultrasound view. Green contours show planned 
                      biopsy targets ready to be matched on procedure day.
                    </p>
                    <div className="bg-emerald-600/20 rounded-lg p-3 border border-emerald-500/30">
                      <p className="text-xs text-emerald-300 font-semibold">
                        This fusion plan is created days before your procedure. On the day, our Application Specialist loads 
                        this plan and matches it to live ultrasound.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                    <Image src="/NEW/MRI_to-US_fusion.png" alt="MRI to ultrasound fusion" width={1200} height={800} className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - LIGHT */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 border-t border-gray-200">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                The plan you'd design for yourself, done for you
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                All your secretary needs to do is call us. We handle imaging transfer, expert contouring, 
                virtual fusion planning, and on-site technical support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Request a sample plan
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/services/mr-us-fusion-biopsy"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Learn about fusion biopsy
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
