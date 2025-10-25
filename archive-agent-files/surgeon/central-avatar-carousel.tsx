"use client"

import { useState } from "react"
import { motion, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type PatientCaseDisplay } from "@/hooks/usePatientCases"
import Image from "next/image"

interface CentralAvatarCarouselProps {
  groupedCases: PatientCaseDisplay[]
  onPatientChange?: (caseData: PatientCaseDisplay, index: number) => void
}

/**
 * Central Avatar Carousel
 * Shows animated GIF and scrolls through grouped patients
 */
export function CentralAvatarCarousel({ groupedCases, onPatientChange }: CentralAvatarCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentCase = groupedCases[currentIndex]

  const handleSwipe = (direction: number) => {
    const newIndex = currentIndex + direction
    
    if (newIndex >= 0 && newIndex < groupedCases.length) {
      setCurrentIndex(newIndex)
      onPatientChange?.(groupedCases[newIndex], newIndex)
    }
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50
    
    if (info.offset.x > swipeThreshold) {
      handleSwipe(-1) // Swipe right = previous
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe(1) // Swipe left = next
    }
  }

  if (groupedCases.length === 0) {
    return (
      <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
        <span className="text-gray-600 text-sm text-center px-4">
          No grouped cases
        </span>
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-4">
      {/* Left arrow */}
      {currentIndex > 0 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe(-1)}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center z-10"
        >
          <ChevronLeft className="w-6 h-6 text-purple-600" />
        </motion.button>
      )}

      {/* Central animated avatar */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="relative cursor-grab active:cursor-grabbing"
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 border-4 border-white shadow-2xl"
        >
          {/* Animated GIF */}
          <Image
            src="/bubblemenu/central people/avatar_carousel.gif"
            alt="Patient Avatar"
            fill
            className="object-cover"
            unoptimized // Required for GIFs to animate
          />

          {/* Case ID overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="text-white text-center">
              <div className="text-lg font-bold">#{currentCase.localId}</div>
              <div className="text-xs opacity-90">{currentCase.lesionType}</div>
            </div>
          </div>
        </motion.div>

        {/* Patient counter */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {currentIndex + 1} / {groupedCases.length}
        </div>
      </motion.div>

      {/* Right arrow */}
      {currentIndex < groupedCases.length - 1 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe(1)}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center z-10"
        >
          <ChevronRight className="w-6 h-6 text-purple-600" />
        </motion.button>
      )}
    </div>
  )
}
