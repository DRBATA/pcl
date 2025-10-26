"use client"

import { useEffect, useRef, useState } from "react"

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
    text: "A complete\nservice",
    position: "top-left",
    align: "left",
    color: "text-black",
    italic: false,
    zOffset: 0,
  },
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
    text: "Maintenance \n& Monitoring",
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
    color: "text-black",
    italic: true,
    zOffset: 0,
  },
]

export function ServicesColumns() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [currentImageIndices, setCurrentImageIndices] = useState([0, 2, 4, 1, 3]) // Staggered start for 5 cards
  const [isInView, setIsInView] = useState(false)

  const equipmentImages = [
    "/tidy/setup/1.png",
    "/tidy/setup/2.png", 
    "/tidy/setup/3.png",
    "/tidy/setup/4.png",
    "/tidy/setup/5.png",
    "/tidy/setup/6.png",
    "/tidy/setup/7.png",
  ]

  const packImages = [
    "/tidy/pack/a.png", 
    "/tidy/pack/b.png",
    "/tidy/pack/c.png",
    "/tidy/pack/d.png",
    "/tidy/pack/e.png",
  ]

  const putAwayImages = [
    "/tidy/putawayprobe/packed.png",
    "/tidy/putawayprobe/reachup.png",
    "/tidy/putawayprobe/puttingdown.png",
    "/tidy/putawayprobe/tukcingaway.png",
  ]

  // Get the appropriate image set for each container
  const getImageSet = (containerIndex: number) => {
    switch (containerIndex) {
      case 0:
      case 1: 
      case 2:
        return equipmentImages
      case 3:
        return packImages
      case 4:
        return putAwayImages
      default:
        return equipmentImages
    }
  }
  
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

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

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

  // Cycle through phrases - only when section is in view
  useEffect(() => {
    if (!isInView) return

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
  }, [isInView])

  // Cycle through images at different intervals for random effect
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []
    
    // Different interval for each container (2.5s, 3.2s, 4.1s, 2.8s, 3.7s)
    const cycleIntervals = [2500, 3200, 4100, 2800, 3700]
    
    cycleIntervals.forEach((intervalTime, containerIndex) => {
      const interval = setInterval(() => {
        setCurrentImageIndices(prev => {
          const newIndices = [...prev]
          const imageSet = getImageSet(containerIndex)
          newIndices[containerIndex] = (newIndices[containerIndex] + 1) % imageSet.length
          return newIndices
        })
      }, intervalTime)
      
      intervals.push(interval)
    })
    
    return () => {
      intervals.forEach(interval => clearInterval(interval))
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
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

      {/* Floating images - cycling photos */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3, 4].map((containerIndex) => {
          const imageSet = getImageSet(containerIndex)
          
          // Position calculations
          const getPosition = () => {
            switch (containerIndex) {
              case 0: return { left: '20%', top: '15%' }  // Original diagonal
              case 1: return { left: '50%', top: '40%' }
              case 2: return { left: '80%', top: '65%' }
              case 3: return { left: '10%', top: '70%' }  // Bottom left
              case 4: return { left: '85%', top: '10%' }  // Top right
              default: return { left: '50%', top: '50%' }
            }
          }
          
          const getColor = () => {
            const colors = ['bg-emerald-500/40', 'bg-teal-500/40', 'bg-cyan-500/40', 'bg-purple-500/40', 'bg-indigo-500/40']
            return colors[containerIndex] || 'bg-gray-500/40'
          }
          
          const position = getPosition()
          
          return (
            <div
              key={containerIndex}
              className={`absolute rounded-2xl overflow-hidden shadow-2xl opacity-50 ${getColor()}`}
              style={{
                width: "280px",
                height: "320px",
                left: position.left,
                top: position.top,
                zIndex: 30 + containerIndex,
                transform: `translateY(${Math.sin((scrollY + containerIndex * 200) * 0.002) * 30}px) rotate(${-5 + containerIndex * 5}deg)`,
              }}
            >
              {/* Cycling image inside colored frame */}
              <div className="absolute inset-2 rounded-xl overflow-hidden">
                {imageSet.map((imageSrc, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={imageSrc}
                    alt={`Image ${imageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{
                      opacity: currentImageIndices[containerIndex] === imageIndex ? 1.0 : 0
                    }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Cycling text phrases */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {phrases.map((phrase, index) => {
          const isActive = index === currentPhrase
          const baseZIndex = 40
          
          // Position classes
          const getPositionClasses = () => {
            switch (phrase.position) {
              case "top-left":
                return "top-[15%] left-[10%]"
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
