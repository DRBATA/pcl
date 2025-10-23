"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const imagingTechniques = [
  {
    id: "mri-fusion",
    name: "Expertly contoured MRI",
    description: "Expert hand-contoured multiparametric MRI. No fuss.",
    longDescription: "World-renowned prostate cancer diagnostic pioneer Dr Allen expertly registers the prostate and lesion across T2-weighted, diffusion, and ADC sequences using MIM Software.",
    image: "/medical-mri-workstation.png",
    backgroundImage: "/bigpics/mri/final.png",
    backgroundImageMobile: "/bigpics/mri/material1portrait.png",
    tint: "bg-green-50",
  },
  {
    id: "ultrasound",
    name: "Ultrasound",
    description: "Virtual probe. Exact target field. No fuss.",
    longDescription: "Virtual transrectal probe alignment transforms MRI volumes into the accessible ultrasound plane — creating an exact, accessible target field with Application Specialist support.",
    image: "/medical-ultrasound-procedure.png",
    backgroundImage: "/bigpics/mri/material2lanscape.png",
    backgroundImageMobile: "/bigpics/mri/mat2por.png",
    tint: "bg-blue-50",
  },
  {
    id: "precision-biopsy",
    name: "Precision Biopsy",
    description: "Registration. Every fragment. No fuss.",
    longDescription: "MRI images imported and fused with expertly crafted biopsy plans. Precise registration makes it possible to capture every last fragment of tumour — without it, targeting would be impossible.",
    image: "/medical-professional-equipment.png",
    backgroundImage: "/bigpics/mri/mat3.png",
    backgroundImageMobile: "/bigpics/mri/mat3p.png",
    tint: "bg-emerald-50",
  },
]

export function MaterialsSection() {
  const [activeImaging, setActiveImaging] = useState("mri-fusion")

  const activeImagingData = imagingTechniques.find((m) => m.id === activeImaging) || imagingTechniques[0]

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section 
      className="relative flex flex-col overflow-hidden" 
      style={{ height: 'calc(100vh - 80px)' }}
      id="imaging-techniques"
    >
      <div className="absolute inset-0 z-0">
        {imagingTechniques.map((technique) => (
          <motion.div
            key={technique.id}
            className="absolute inset-0"
            initial={{ opacity: technique.id === activeImaging ? 1 : 0 }}
            animate={{ opacity: technique.id === activeImaging ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Desktop image */}
            <Image
              src={technique.backgroundImage || "/placeholder.svg"}
              alt={`${technique.name} medical procedure`}
              fill
              className="object-cover object-center hidden sm:block"
              priority
            />
            {/* Mobile image (if available) */}
            {technique.backgroundImageMobile && (
              <Image
                src={technique.backgroundImageMobile}
                alt={`${technique.name} medical procedure mobile`}
                fill
                className="object-cover object-center block sm:hidden"
                priority
              />
            )}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full pt-8 sm:pt-12 lg:pt-16">
        <div className="container-custom text-white">
          <Reveal>
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeImaging}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-bold mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-balance"
                >
                  <AnimatedText text={activeImagingData.name} delay={0.2} />
                </motion.h2>
              </AnimatePresence>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                {activeImagingData.longDescription || activeImagingData.description}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="flex-grow"></div>
      
      <div className="relative z-10 w-full pb-12 sm:pb-16">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {imagingTechniques.map((technique) => (
                <motion.button
                  key={technique.id}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md whitespace-nowrap",
                    activeImaging === technique.id
                      ? "bg-white text-neutral-900"
                      : "bg-white/20 text-white hover:bg-white/30",
                  )}
                  onClick={() => setActiveImaging(technique.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {technique.name}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
