"use client"

import { useEffect, useState, useRef } from "react"

export function SimpleHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoTime, setVideoTime] = useState(0)
  const [showReplay, setShowReplay] = useState(false)

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

      // Show replay button at end, pause video
      if (currentTime >= 25.8 && !showReplay) {
        setShowReplay(true)
        video.pause()
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
  }, [showReplay])

  const handleReplay = () => {
    const video = videoRef.current
    if (!video) return
    setShowReplay(false)
    video.currentTime = 0
    video.play()
  }

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
          
          {/* SCENE 1 (0:00-0:07): "We Bring Fusion Biopsy To Your Theatre" - 3D Staggered */}
<div
  className="absolute text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white whitespace-nowrap"
  style={{
    transform: `translate3d(-50%, -120px, ${s1_stuckTranslateZ}px) scale(${s1_stuckScale})`,
    opacity: s1_stuckOpacity,
    transformOrigin: 'center center',
    left: '50%',
    top: '50%',
    transition: 'opacity 0.3s ease-out',
  }}
>
  WE BRING
</div>

<div
  className="absolute text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white whitespace-nowrap"
  style={{
    transform: `translate3d(-45%, -50px, ${s1_inTranslateZ}px) scale(${s1_inScale})`,
    opacity: s1_inOpacity,
    transformOrigin: 'center center',
    left: '50%',
    top: '50%',
    transition: 'opacity 0.3s ease-out',
  }}
>
  MRI/US FUSION BIOPSY
</div>

<div
  className="absolute text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white whitespace-nowrap"
  style={{
    transform: `translate3d(-45%, 20px, ${s1_twoDTranslateZ}px) scale(${s1_twoDScale})`,
    opacity: s1_twoDOpacity,
    transformOrigin: 'center center',
    left: '50%',
    top: '50%',
    transition: 'opacity 0.3s ease-out',
  }}
>
TO YOUR THEATRE
</div>

          {/* SCENE 2 (0:07-0:12): Women talking */}
          <div className="absolute bottom-24 left-0 right-0 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto space-y-3 md:space-y-4 lg:space-y-6">
              <div className="text-3xl md:text-5xl lg:text-6xl font-serif font-light italic break-words" style={{ opacity: s2_line1Opacity }}>
                No need for
              </div>
              <div className="text-4xl md:text-6xl lg:text-7xl font-serif font-light break-words" style={{ opacity: s2_line2Opacity }}>
                expensive equipment
              </div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold break-words" style={{ opacity: s2_line3Opacity }}>
                or training
              </div>
            </div>
          </div>

          {/* SCENE 3 (0:12-0:21): Cognitive sampling */}
          <div className="space-y-8 text-center px-8">
            <div className="text-4xl md:text-6xl lg:text-7xl font-serif font-light italic" style={{ opacity: s3_line1Opacity }}>
              we manage the 
            </div>
            <div style={{ opacity: s3_line2Opacity }}>
              <div className="text-5xl md:text-7xl lg:text-8xl font-serif font-light">
                technical complexity
              </div>
            </div>
          </div>

          {/* SCENE 4 (0:21-0:26): MRI/US Fusion */}
          <div className="absolute left-4 md:left-16 lg:left-24 top-1/4 space-y-4 text-left max-w-2xl">
            <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-light" style={{ opacity: s4_unparalleledOpacity }}>
              You get unmatched
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

      {/* Replay button with spinner logo - appears at end */}
      {showReplay && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <button
            onClick={handleReplay}
            className="group relative transition-transform hover:scale-110 active:scale-95"
            aria-label="Replay video"
          >
            {/* Logo spinner */}
            <div className="relative w-32 h-32">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 120 120"
                style={{ transform: 'rotate(-90deg)' }}
              >
                {/* Gray circle with wedge gaps */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="14"
                  strokeLinecap="butt"
                  strokeDasharray="150 30"
                  className="animate-spin-slow"
                  style={{ animationDuration: '3s' }}
                />
              </svg>
              
              {/* Green circle at 45° */}
              <svg
                className="absolute"
                style={{
                  width: '58px',
                  height: '58px',
                  left: 'calc(50% + 26.5px)',
                  top: 'calc(50% - 63px)',
                }}
                viewBox="0 0 58 58"
              >
                <circle
                  cx="29"
                  cy="29"
                  r="24"
                  fill="white"
                  stroke="#059669"
                  strokeWidth="8"
                />
              </svg>

              {/* Replay icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white group-hover:text-emerald-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>

            {/* Text hint */}
            <div className="mt-4 text-center">
              <span className="text-white text-lg font-serif">Watch again</span>
            </div>
          </button>
        </div>
      )}
    </section>
  )
}
