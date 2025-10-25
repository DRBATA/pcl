"use client"

import { useEffect, useState, useRef } from "react"

export function SimpleHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoTime, setVideoTime] = useState(0)

  // Single 26-second video with time-based text
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrame: number

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime
      setVideoTime(currentTime)

      // Slow down in last 2 seconds for 3D hologram reveal
      if (currentTime >= 24) {
        video.playbackRate = 0.5
      } else {
        video.playbackRate = 1.0
      }

      // Loop video
      if (currentTime >= 26) {
        video.currentTime = 0
        video.play()
      }

      animationFrame = requestAnimationFrame(handleTimeUpdate)
    }

    video.addEventListener('loadedmetadata', handleTimeUpdate)
    if (video.readyState >= 1) {
      handleTimeUpdate()
    }

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Scene 1 (0:00-0:07): "Stuck in 2D?" sequence
  // "stuck" appears at 1.5s, fades by 3s
  const s1_stuckProgress = Math.max(0, Math.min(1, (videoTime - 1.5) / 1))
  const s1_stuckOpacity = videoTime >= 1.5 && videoTime < 6.7 ? 
    (s1_stuckProgress < 0.8 ? s1_stuckProgress : 1 - Math.max(0, (videoTime - 3) / 3.7)) : 0
  const s1_stuckTranslateZ = 300 - s1_stuckProgress * 200
  const s1_stuckScale = 0.8 + s1_stuckProgress * 0.5

  // "in" appears at 2.5s
  const s1_inProgress = Math.max(0, Math.min(1, (videoTime - 2.5) / 1))
  const s1_inOpacity = videoTime >= 2.5 && videoTime < 6.7 ? 
    (s1_inProgress < 0.8 ? s1_inProgress : 1 - Math.max(0, (videoTime - 3.5) / 3.2)) : 0
  const s1_inTranslateZ = 500 - s1_inProgress * 400
  const s1_inScale = 0.5 + s1_inProgress * 0.8

  // "2D?" appears at 3.5s, fades out before 7s transition
  const s1_twoDProgress = Math.max(0, Math.min(1, (videoTime - 3.5) / 1))
  const s1_twoDOpacity = videoTime >= 3.5 && videoTime < 6.7 ? 
    (videoTime < 5.5 ? 1 : 1 - (videoTime - 5.5) / 1.2) : 0
  const s1_twoDScale = 1.5 + Math.max(0, (videoTime - 5.5) * 0.3)
  const s1_twoDTranslateZ = videoTime > 5.5 ? -(videoTime - 5.5) * 300 : 0

  // Scene 2 (0:07-0:12): Women talking - fade in after transition
  const s2_line1Opacity = videoTime >= 7.3 && videoTime < 11.7 ? 
    Math.min(1, (videoTime - 7.3) / 0.5) * (1 - Math.max(0, (videoTime - 11.7) / 0.3)) : 0
  const s2_line2Opacity = videoTime >= 8 && videoTime < 11.7 ? 
    Math.min(1, (videoTime - 8) / 0.5) * (1 - Math.max(0, (videoTime - 11.7) / 0.3)) : 0
  const s2_line3Opacity = videoTime >= 8.7 && videoTime < 11.7 ? 
    Math.min(1, (videoTime - 8.7) / 0.5) * (1 - Math.max(0, (videoTime - 11.7) / 0.3)) : 0

  // Scene 3 (0:12-0:21): Cognitive - wondering + variability
  const s3_line1Opacity = videoTime >= 12.3 && videoTime < 20.7 ? 
    Math.min(1, (videoTime - 12.3) / 0.8) : 0
  const s3_line2Opacity = videoTime >= 14 && videoTime < 20.7 ? 
    Math.min(1, (videoTime - 14) / 1) * (1 - Math.max(0, (videoTime - 20.7) / 0.3)) : 0

  // Scene 4 (0:21-0:26): Precision - fade in after transition
  const s4_unparalleledOpacity = videoTime >= 21.3 ? Math.min(1, (videoTime - 21.3) / 0.5) : 0
  const s4_precisionOpacity = videoTime >= 22 ? Math.min(1, (videoTime - 22) / 0.8) : 0
  const s4_precisionScale = 1 + Math.max(0, (videoTime - 22) * 0.1)

  // Mobile video positioning - adjust focus per scene
  const getObjectPosition = () => {
    if (videoTime < 7) return '30% center' // Scene 1: ultrasound left
    if (videoTime < 12) return '30% center' // Scene 2: person left
    if (videoTime < 21) return 'center center' // Scene 3: screen center
    return '70% center' // Scene 4: 3D hologram right
  }

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: getObjectPosition() }}
        >
          <source src="/vid/hero-full-26s.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Text overlays */}
      <div 
        className="relative z-10 h-full flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div className="relative text-center text-white w-full" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* SCENE 1 (0:00-0:07): "Stuck in 2D?" */}
          <div
            className="absolute text-7xl md:text-9xl lg:text-[12rem] font-serif font-light text-white whitespace-nowrap"
            style={{
              transform: `translate3d(-50%, -180px, ${s1_stuckTranslateZ}px) scale(${s1_stuckScale})`,
              opacity: s1_stuckOpacity,
              transformOrigin: 'center center',
              left: '50%',
              top: '50%',
              transition: 'opacity 0.3s ease-out',
            }}
          >
            stuck
          </div>

          <div
            className="absolute text-5xl md:text-7xl lg:text-9xl font-serif font-light text-white whitespace-nowrap"
            style={{
              transform: `translate3d(-50%, -50%, ${s1_inTranslateZ}px) scale(${s1_inScale})`,
              opacity: s1_inOpacity,
              transformOrigin: 'center center',
              left: '50%',
              top: '50%',
              transition: 'opacity 0.3s ease-out',
            }}
          >
            in
          </div>

          <div
            className="absolute text-8xl md:text-[10rem] lg:text-[14rem] font-serif font-bold text-white whitespace-nowrap"
            style={{
              transform: `translate3d(-50%, 0%, ${s1_twoDTranslateZ}px) scale(${s1_twoDScale})`,
              opacity: s1_twoDOpacity,
              transformOrigin: 'center center',
              left: '50%',
              top: '50%',
              transition: 'opacity 0.3s ease-out',
            }}
          >
            2D?
          </div>

          {/* SCENE 2 (0:07-0:12): Women talking */}
          <div className="space-y-6 text-center px-8">
            <div className="text-4xl md:text-6xl lg:text-7xl font-serif font-light italic" style={{ opacity: s2_line1Opacity }}>
              staff can be
            </div>
            <div className="text-5xl md:text-7xl lg:text-8xl font-serif font-light" style={{ opacity: s2_line2Opacity }}>
              unfamiliar with
            </div>
            <div className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold" style={{ opacity: s2_line3Opacity }}>
              rarely used kit
            </div>
          </div>

          {/* SCENE 3 (0:12-0:21): Cognitive sampling */}
          <div className="space-y-8 text-center px-8">
            <div className="text-4xl md:text-6xl lg:text-7xl font-serif font-light italic" style={{ opacity: s3_line1Opacity }}>
              wondering about
            </div>
            <div style={{ opacity: s3_line2Opacity }}>
              <div className="text-5xl md:text-7xl lg:text-8xl font-serif font-light">
                intraobserver variability?*
              </div>
            </div>
          </div>

          {/* SCENE 4 (0:21-0:26): MRI/US Fusion */}
          <div className="absolute left-4 md:left-16 lg:left-24 top-1/4 space-y-4 text-left max-w-2xl">
            <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-light" style={{ opacity: s4_unparalleledOpacity }}>
              Get ready for unparalleled
            </div>
            
            <div 
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold"
              style={{ 
                opacity: s4_precisionOpacity,
                transform: `scale(${s4_precisionScale})`,
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              precision
            </div>
          </div>

        </div>
      </div>

      {/* Cognitive bias link - always visible in bottom right corner */}
      <div className="absolute bottom-8 right-8 z-20">
        <a 
          href="https://pjuonline.com/index.php/pju/article/view/58?articlesBySimilarityPage=3" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm text-white underline hover:text-white/80 transition-colors"
        >
          *cognitive bias link
        </a>
      </div>
    </section>
  )
}
