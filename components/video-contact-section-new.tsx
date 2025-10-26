"use client"

import { useEffect, useRef, useState } from "react"

export function VideoContactSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showReplay, setShowReplay] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [fadeOpacity, setFadeOpacity] = useState(0)

  const handleReplay = () => {
    setShowReplay(false)
    setFadeOpacity(0)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime
      
      // Fade to white in last 0.5 seconds
      if (timeLeft <= 0.5 && timeLeft > 0) {
        const opacity = 1 - (timeLeft / 0.5)
        setFadeOpacity(opacity)
      } else if (timeLeft > 0.5) {
        setFadeOpacity(0)
      }
    }

    const handleVideoEnd = () => {
      setFadeOpacity(1)
      setShowReplay(true)
    }

    const handleVideoError = () => {
      console.error('Video failed to load')
      setShowReplay(true)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('error', handleVideoError)
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleVideoEnd)
      video.removeEventListener('error', handleVideoError)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/vid/final.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        
        {/* White fade overlay (last 0.5s) */}
        <div 
          className="absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none"
          style={{ opacity: fadeOpacity }}
        />
        
        {/* Audio toggle button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Replay button */}
      {showReplay && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-40">
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
              <span className="text-slate-700 text-lg font-serif">Watch again</span>
            </div>
          </button>
        </div>
      )}
    </section>
  )
}
