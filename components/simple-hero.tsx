"use client"

import { useEffect, useState, useRef } from "react"

export function SimpleHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsActive(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Cross-fade videos with smooth loop
  useEffect(() => {
    const video1 = video1Ref.current
    const video2 = video2Ref.current
    if (!video1 || !video2) return

    // Set playback speed to half (0.5x)
    video1.playbackRate = 0.5
    video2.playbackRate = 0.5

    const fadeDuration = 1.5 // 1.5 second cross-fade
    let animationFrame: number

    const handleTimeUpdate = () => {
      const currentVideo = activeVideo === 1 ? video1 : video2
      const nextVideo = activeVideo === 1 ? video2 : video1
      const duration = currentVideo.duration

      if (!duration) return

      const timeRemaining = duration - currentVideo.currentTime

      // Start cross-fade near the end
      if (timeRemaining <= fadeDuration && timeRemaining > 0) {
        const fadeProgress = 1 - (timeRemaining / fadeDuration)
        
        // Fade out current, fade in next
        currentVideo.style.opacity = String(1 - fadeProgress)
        nextVideo.style.opacity = String(fadeProgress)

        // Start next video if not already playing
        if (nextVideo.paused) {
          nextVideo.currentTime = 0
          nextVideo.play()
        }
      } else if (timeRemaining <= 0) {
        // Switch active video
        setActiveVideo(activeVideo === 1 ? 2 : 1)
        currentVideo.pause()
        currentVideo.currentTime = 0
      }

      animationFrame = requestAnimationFrame(handleTimeUpdate)
    }

    video1.addEventListener('loadedmetadata', () => {
      handleTimeUpdate()
    })

    if (video1.readyState >= 1) {
      handleTimeUpdate()
    }

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [activeVideo])

  // Calculate subtle transforms based on mouse position
  // Convergence point is bottom-right area, words move toward it
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  
  // Distance from center to mouse (normalized)
  const distX = (mousePos.x - centerX) / centerX
  const distY = (mousePos.y - centerY) / centerY
  const distance = Math.sqrt(distX * distX + distY * distY)
  
  // Subtle movement: words converge slightly as mouse moves away
  const convergeFactor = Math.min(distance * 0.05, 0.15) // Max 15% movement
  
  // Fade based on distance: fade out when mouse is far down-right
  const fadeThreshold = 0.7
  const discoverOpacity = distance > fadeThreshold ? Math.max(0.3, 1 - (distance - fadeThreshold) * 1.5) : 1
  const precisionOpacity = distance > fadeThreshold + 0.1 ? Math.max(0.3, 1 - (distance - fadeThreshold - 0.1) * 1.5) : 1
  
  // Scale: subtle zoom toward convergence point
  const scale = 1 - convergeFactor * 0.3

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Video background with cross-fade */}
      <div className="absolute inset-0">
        {/* Video 1 */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: activeVideo === 1 ? 1 : 0 }}
        >
          <source src="/vid/kitbeingsetup.mp4" type="video/mp4" />
        </video>
        
        {/* Video 2 */}
        <video
          ref={video2Ref}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: activeVideo === 2 ? 1 : 0 }}
        >
          <source src="/vid/kitbeingsetup.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Hero content - bottom left with mouse-reactive transforms */}
      <div className="relative z-10 h-full flex items-end px-8 pb-16 lg:px-16 lg:pb-24">
        <div className="text-left text-white relative">
          {/* Huge "Precision" text - converges down-right */}
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-[0.2em] leading-none text-white ml-[4rem] md:ml-[6rem] lg:ml-[6rem] transition-all duration-500 ease-out"
            style={{
              transform: `translate(${convergeFactor * 20}px, ${convergeFactor * 10}px) scale(${scale})`,
              opacity: precisionOpacity,
            }}
          >
            Precision
          </h1>
          
          {/* "Discover" positioned above - converges toward focal point */}
          <p 
            className="absolute text-2xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.3em] text-white/80 top-[-4rem] md:top-[-5rem] lg:top-[-6rem] left-[4.5rem] md:left-[6.5rem] lg:left-[6.5rem] transition-all duration-500 ease-out"
            style={{
              transform: `translate(${convergeFactor * 15}px, ${convergeFactor * 8}px) scale(${scale})`,
              opacity: discoverOpacity * 0.8,
            }}
          >
            Discover
          </p>
        </div>
      </div>
    </section>
  )
}
