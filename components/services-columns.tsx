"use client"

import { useEffect, useState } from "react"

// Generate random z-index with gaps between 3-7
const generateRandomZIndex = (existingIndices: number[] = []) => {
  const gap = 3 + Math.floor(Math.random() * 5) // Random gap between 3-7
  const baseIndex = existingIndices.length > 0 
    ? Math.max(...existingIndices) + gap 
    : 10 + Math.floor(Math.random() * 10)
  return baseIndex
}

const initialColumns = [
  { color: "bg-emerald-500", width: "w-16", delay: 0 },
  { color: "bg-teal-600", width: "w-24", delay: 0.2 },
  { color: "bg-cyan-500", width: "w-20", delay: 0.4 },
  { color: "bg-slate-800", width: "w-32", delay: 0.1 },
  { color: "bg-emerald-600", width: "w-12", delay: 0.6 },
  { color: "bg-teal-500", width: "w-28", delay: 0.3 },
  { color: "bg-cyan-600", width: "w-16", delay: 0.5 },
]

const phrases = [
  {
    text: "Calibrated\nto Spec",
    position: "center",
    align: "center",
    color: "text-black",
    italic: false,
    zOffset: 0,
  },
  {
    text: "Application\nSpecialist\nat Hand",
    position: "top-right",
    align: "right",
    color: "text-black",
    italic: false,
    zOffset: -10,
  },
  {
    text: "Equipment\nMaintenance &\nMonitoring",
    position: "left",
    align: "left",
    color: "text-black",
    italic: false,
    zOffset: -7,
  },
  {
    text: "Best Precision\nAvailable",
    position: "bottom-right",
    align: "right",
    color: "text-white",
    italic: true,
    zOffset: 0,
  },
]

export function ServicesColumns() {
  const [scrollY, setScrollY] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [opacity, setOpacity] = useState(1)
  
  const [columns, setColumns] = useState(() => {
    const zIndices: number[] = []
    return initialColumns.map(col => {
      const zIndex = generateRandomZIndex(zIndices)
      zIndices.push(zIndex)
      return {
        ...col,
        zIndex,
        xPosition: Math.random() * 100, // Random starting X position (0-100%)
        xSpeed: 0.5 + Math.random() * 1.5, // Random speed (0.5-2.0)
        direction: Math.random() > 0.5 ? 1 : -1, // Random direction (left or right)
      }
    })
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate X position continuously
  useEffect(() => {
    let animationFrame: number
    
    const animate = () => {
      setColumns(prevColumns => 
        prevColumns.map(col => {
          let newX = col.xPosition + (col.direction * col.xSpeed * 0.1)
          let newDirection = col.direction
          
          // Bounce back when hitting edges instead of wrapping
          if (newX > 95) {
            newX = 95
            newDirection = -1 // Reverse direction
          } else if (newX < 5) {
            newX = 5
            newDirection = 1 // Reverse direction
          }
          
          return { ...col, xPosition: newX, direction: newDirection }
        })
      )
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  // Randomly switch direction every 3 seconds
  useEffect(() => {
    const directionInterval = setInterval(() => {
      setColumns(prevColumns => 
        prevColumns.map(col => ({
          ...col,
          // 50% chance to switch direction
          direction: Math.random() > 0.5 ? col.direction * -1 : col.direction,
        }))
      )
    }, 3000) // Every 3 seconds
    
    return () => clearInterval(directionInterval)
  }, [])

  // Cycle through phrases
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      // Fade out
      setOpacity(0)
      
      // After fade out, switch phrase and fade in
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setOpacity(1)
      }, 500) // Wait 500ms for fade out
      
    }, 5000) // Every 5 seconds
    
    return () => clearInterval(cycleInterval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Animated columns */}
      <div className="absolute inset-0 flex gap-4 justify-center items-stretch overflow-hidden">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`${col.color} ${col.width} opacity-40 absolute h-full`}
            style={{
              zIndex: col.zIndex,
              left: `${col.xPosition}%`,
              transform: `translateY(${Math.sin((scrollY + i * 100) * 0.001) * 20}px)`,
              transition: 'left 0.1s linear',
            }}
          />
        ))}
      </div>

      {/* Floating images - using colored rectangles as placeholders */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute rounded-2xl overflow-hidden shadow-2xl opacity-20 ${
              i === 0 ? 'bg-emerald-500/40' : i === 1 ? 'bg-teal-500/40' : 'bg-cyan-500/40'
            }`}
            style={{
              width: "280px",
              height: "320px",
              left: `${20 + i * 30}%`,
              top: `${15 + i * 25}%`,
              zIndex: 30 + i,
              transform: `translateY(${Math.sin((scrollY + i * 200) * 0.002) * 30}px) rotate(${-5 + i * 5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Cycling text phrases */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {phrases.map((phrase, index) => {
          const isActive = index === currentPhrase
          const baseZIndex = 40
          
          // Position classes
          const getPositionClasses = () => {
            switch (phrase.position) {
              case "center":
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              case "top-right":
                return "top-[20%] right-[10%]"
              case "left":
                return "top-1/2 left-[10%] -translate-y-1/2"
              case "bottom-right":
                return "bottom-[15%] right-[10%]"
              default:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }
          }

          return (
            <div
              key={index}
              className={`absolute transition-opacity duration-500 ${getPositionClasses()}`}
              style={{
                opacity: isActive ? opacity : 0,
                zIndex: baseZIndex + phrase.zOffset,
                pointerEvents: 'none',
              }}
            >
              <h2
                className={`text-6xl md:text-8xl lg:text-[10rem] font-serif font-light leading-none tracking-tight whitespace-pre-line ${phrase.color} ${phrase.italic ? 'italic' : ''}`}
                style={{ textAlign: phrase.align as any }}
              >
                {phrase.text}
              </h2>
            </div>
          )
        })}
      </div>
    </section>
  )
}
