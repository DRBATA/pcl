"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface FusionVideoPlayerProps {
  musicPath?: string
}

export function FusionVideoPlayer({ musicPath }: FusionVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const videos = [
    { src: "/u/fusion/fusion.mp4", name: "Fusion" },
    { src: "/u/margin/adding_magins.mp4", name: "Adding Margins" }
  ]

  // Customizable markers - EDIT THESE!
  const markers = [
    // Video 1: Fusion
    { time: 0, label: "Start Fusion", videoIndex: 0 },
    { time: 5, label: "Alignment", videoIndex: 0 },
    { time: 17, label: "Targeting", videoIndex: 0 },
    // Video 2: Margins
    { time: 0, label: "Start Margin", videoIndex: 1 },
    { time: 4, label: "Adding Margins", videoIndex: 1 },
    { time: 15, label: "Verification", videoIndex: 1 }
  ]

  useEffect(() => {
    const video = videoRef.current
    const audio = audioRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    
    const handleVideoEnd = () => {
      if (currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1)
        setCurrentTime(0)
      } else {
        setCurrentVideoIndex(0)
        setCurrentTime(0)
      }
    }
    
    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', handleVideoEnd)

    // Sync music
    if (audio && video && !isMuted && isPlaying) {
      if (audio.paused) {
        audio.play().catch(() => {})
      }
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', handleVideoEnd)
    }
  }, [currentVideoIndex, isPlaying, isMuted])

  const togglePlay = () => {
    const video = videoRef.current
    const audio = audioRef.current
    
    if (video) {
      if (isPlaying) {
        video.pause()
        audio?.pause()
      } else {
        video.play()
        if (audio && !isMuted) {
          audio.play().catch(() => {})
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    const audio = audioRef.current
    
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
      
      if (audio) {
        if (!isMuted) {
          audio.pause()
        } else if (isPlaying) {
          audio.play().catch(() => {})
        }
      }
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const jumpToMarker = (time: number, videoIndex: number) => {
    if (currentVideoIndex !== videoIndex) {
      setCurrentVideoIndex(videoIndex)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = time
          setCurrentTime(time)
        }
      }, 100)
    } else if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const skipToNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1)
      setCurrentTime(0)
    } else {
      setCurrentVideoIndex(0)
      setCurrentTime(0)
    }
  }

  const skipToPrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1)
      setCurrentTime(0)
    } else {
      setCurrentVideoIndex(videos.length - 1)
      setCurrentTime(0)
    }
  }

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.log('Fullscreen failed:', err)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const currentMarkers = markers.filter(m => m.videoIndex === currentVideoIndex)

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl blur-xl"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full h-auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videos[currentVideoIndex].src} type="video/mp4" />
        </video>

        {/* Background Music */}
        {musicPath && (
          <audio ref={audioRef} loop>
            <source src={musicPath} type="audio/mpeg" />
          </audio>
        )}

        {/* Video Label */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="text-white text-sm font-medium">
            {videos[currentVideoIndex].name} ({currentVideoIndex + 1}/{videos.length})
          </span>
        </div>

        {/* Custom Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Markers */}
          <div className="flex flex-wrap gap-2 mb-2 px-1">
            {currentMarkers.map((marker, idx) => (
              <button
                key={idx}
                onClick={() => jumpToMarker(marker.time, marker.videoIndex)}
                className="text-[10px] text-white/70 hover:text-white transition-colors px-2 py-1 rounded bg-white/10 hover:bg-white/20"
              >
                {marker.label}
              </button>
            ))}
          </div>

          {/* Scrubber */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer mb-3"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
          />

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Skip to Previous */}
              <button
                onClick={skipToPrevious}
                className="text-white hover:text-blue-400 transition-colors"
                title="Previous video"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip to Next */}
              <button
                onClick={skipToNext}
                className="text-white hover:text-blue-400 transition-colors"
                title="Next video"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              {/* Mute/Unmute */}
              <button
                onClick={toggleMute}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isMuted ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              <span className="text-white text-xs sm:text-sm">
                {Math.floor(currentTime)}s / {Math.floor(duration)}s
              </span>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
              title="Toggle fullscreen"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
