"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: string
    image?: string
    video?: string
    badge?: "New" | "Back in stock" | "Limited" | "Advanced" | "Innovative" | "Complete"
    materials: string[]
    swatches: { name: string; color: string }[]
    quickLookImages?: string[]
    quickLookVideos?: string[]
    dimensions: string
  }
  onQuickLook: (product: any) => void
}

export function ProductCard({ product, onQuickLook }: ProductCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Intersection Observer to detect when card is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (videoRef.current) {
          // Speed up when in view, slow down when out of view
          videoRef.current.playbackRate = entry.isIntersecting ? 2.0 : 0.3
        }
      },
      { threshold: 0.3 } // Trigger when 30% of card is visible
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0 // Fast on hover
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      // Return to appropriate speed based on viewport visibility
      videoRef.current.playbackRate = isInView ? 2.0 : 0.3
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white overflow-hidden"
      style={{
        borderRadius: "24px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
              product.badge === "New" && "bg-green-500/90 text-white",
              product.badge === "Back in stock" && "bg-blue-500/90 text-white",
              product.badge === "Limited" && "bg-amber-500/90 text-white",
              product.badge === "Advanced" && "bg-purple-500/90 text-white",
              product.badge === "Innovative" && "bg-cyan-500/90 text-white",
              product.badge === "Complete" && "bg-emerald-500/90 text-white",
            )}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Media */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "25/36" }}>
        <div className="relative w-full h-full">
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {product.video ? (
              <video
                ref={videoRef}
                src={product.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0.6 }}
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = 0.3 // Start very slow
                }}
              />
            ) : (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            maskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to top, black 0%, black 40%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-lg"
          style={{
            maskImage: "linear-gradient(to top, black 0%, black 20%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 20%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-sm">{product.name}</h3>
            <p className="text-sm text-white/90 mb-2 drop-shadow-sm">{product.materials.join(", ")}</p>
            <span className="text-xl font-bold text-white drop-shadow-sm">{product.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
