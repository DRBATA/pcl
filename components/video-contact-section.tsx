"use client"

import { useEffect, useRef, useState } from "react"

export function VideoContactSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<'video' | 'fade' | 'contact'>('video')
  const [opacity, setOpacity] = useState(1)

  const replayVideo = () => {
    setPhase('video')
    setOpacity(1)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // Start fade to white
      setPhase('fade')
      
      // Animate to white over 1 second
      let fadeProgress = 0
      const fadeInterval = setInterval(() => {
        fadeProgress += 0.02
        setOpacity(1 - fadeProgress)
        
        if (fadeProgress >= 1) {
          clearInterval(fadeInterval)
          // Show contact form
          setTimeout(() => {
            setPhase('contact')
            // Fade in contact form
            let fadeInProgress = 0
            const fadeInInterval = setInterval(() => {
              fadeInProgress += 0.02
              setOpacity(fadeInProgress)
              
              if (fadeInProgress >= 1) {
                clearInterval(fadeInInterval)
              }
            }, 20)
          }, 300)
        }
      }, 20)
    }

    const handleVideoError = () => {
      console.error('Video failed to load, skipping to contact form')
      setPhase('contact')
      setOpacity(1)
    }

    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('error', handleVideoError)
    return () => {
      video.removeEventListener('ended', handleVideoEnd)
      video.removeEventListener('error', handleVideoError)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Video phase */}
      {phase === 'video' && (
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hifvidsfrontpage/hifufin.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        </div>
      )}

      {/* White fade phase */}
      {phase === 'fade' && (
        <div className="absolute inset-0 bg-white" />
      )}

      {/* Contact form phase */}
      {phase === 'contact' && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-white px-8"
          style={{ opacity }}
        >
          <div className="max-w-2xl w-full space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900">
                Ready to <span className="italic text-emerald-600">Elevate</span> Your Practice?
              </h2>
              <p className="text-lg text-slate-600">
                Send us your secretary's details and we'll arrange everything
              </p>
            </div>

            <form className="space-y-6">
              {/* Surgeon details */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-slate-800 border-b border-slate-200 pb-2">
                  Your Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Your Title"
                    className="px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>

              {/* Secretary details */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-slate-800 border-b border-slate-200 pb-2">
                  Secretary Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Secretary Name"
                    className="px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Secretary Email"
                    className="px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Secretary Phone"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>

              {/* Additional info */}
              <div className="space-y-4">
                <textarea
                  placeholder="Any specific requirements or dates? (Optional)"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request Information
              </button>

              <p className="text-sm text-slate-500 text-center">
                We'll contact your secretary within 24 hours to arrange the details
              </p>

              {/* Replay video button */}
              <button
                type="button"
                onClick={replayVideo}
                className="w-full text-emerald-600 hover:text-emerald-700 font-medium py-2 transition-colors duration-300"
              >
                ← Watch Video Again
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
