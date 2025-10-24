"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const heroStages = [
  {
    desktopImage: "/desktop/1.png",
    mobileImage: "/mobile/1.png",
    desktopImageB: null,
    mobileImageB: null,
    badge: "Prepared for precision",
    title: "Every case, any theatre, consistent excellence",
    description: "Your surgical environment ready for precision diagnostics",
    textPosition: "top" as const,
    ctas: [
      { text: "Clinician Experience", href: "/about/partners", primary: true },
      { text: "Theatre Requirements", href: "/about/pcl", primary: false },
    ],
  },
  {
    desktopImage: "/desktop/2.png",
    mobileImage: "/mobile/2.png",
    desktopImageB: "/desktop/2b.png",
    mobileImageB: "/mobile/2b.png",
    badge: "Powering precision",
    title: "We bring the technology",
    description: "State-of-the-art equipment, delivered and installed",
    textPosition: "top" as const,
    ctas: [
      { text: "Equipment Details", href: "/services/hifu", primary: true },
      { text: "Process Overview", href: "/services", primary: false },
    ],
  },
  {
    desktopImage: "/desktop/3.png",
    mobileImage: "/mobile/3.png",
    desktopImageB: "/desktop/3b.png",
    mobileImageB: "/mobile/3b.png",
    badge: "Perfecting precision",
    title: "Live imaging guidance",
    description: "Real-time radiology contouring for pinpoint accuracy",
    textPosition: "top" as const,
    ctas: [
      { text: "Real-time Radiology", href: "/services/freehand-fusion", primary: true },
      { text: "Meet the Team", href: "/about/pcl", primary: false },
    ],
  },
  {
    desktopImage: "/desktop/4.png",
    mobileImage: "/mobile/4.png",
    desktopImageB: "/desktop/4b.png",
    mobileImageB: "/mobile/4b.png",
    badge: "Precision's partnership",
    title: "Expert support throughout",
    description: "In-person training and guidance every step",
    textPosition: "top" as const,
    ctas: [
      { text: "On the Day Support", href: "/services", primary: true },
      { text: "Book a Call", href: "/contact", primary: false },
    ],
  },
]

export function HeroSection() {
  const [currentStage, setCurrentStage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousStage, setPreviousStage] = useState(0)
  const [showHighlight, setShowHighlight] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      const nextStage = (currentStage + 1) % heroStages.length

      setTimeout(() => {
        setPreviousStage(currentStage)
        setCurrentStage(nextStage)
      }, 700)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 750)
    }, 4000)

    return () => clearInterval(interval)
  }, [currentStage])

  // Highlight effect: show B image briefly after slide loads
  useEffect(() => {
    const currentHero = heroStages[currentStage]
    if (currentHero.desktopImageB && currentHero.mobileImageB) {
      // Wait 800ms after slide loads, then show highlight for 2 seconds
      const showTimer = setTimeout(() => {
        setShowHighlight(true)
      }, 800)

      const hideTimer = setTimeout(() => {
        setShowHighlight(false)
      }, 2800)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    } else {
      setShowHighlight(false)
    }
  }, [currentStage])

  const currentHero = heroStages[currentStage]

  return (
    <section className="relative h-screen overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        {heroStages.map((stage, index) => (
          <div
            key={`${stage.desktopImage}-${index}`}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentStage === index ? 1 : 0,
              zIndex: currentStage === index ? 3 : previousStage === index ? 2 : 1,
            }}
          >
            {/* Base Desktop Image */}
            <Image
              src={stage.desktopImage}
              alt={stage.title}
              fill
              className="hidden md:block object-cover object-center"
              sizes="100vw"
              quality={90}
              loading="eager"
              priority={index === 0}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            {/* Base Mobile Image */}
            <Image
              src={stage.mobileImage}
              alt={stage.title}
              fill
              className="md:hidden object-cover object-center"
              sizes="100vw"
              quality={90}
              loading="eager"
              priority={index === 0}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            
            {/* Highlight Overlay - B Images */}
            {stage.desktopImageB && stage.mobileImageB && (
              <>
                {/* Desktop B Image - Highlight */}
                <Image
                  src={stage.desktopImageB}
                  alt={`${stage.title} - highlighted`}
                  fill
                  className="hidden md:block object-cover object-center ease-in-out"
                  sizes="100vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  style={{
                    opacity: currentStage === index ? (showHighlight ? 1 : 0.65) : 0,
                    transition: showHighlight 
                      ? 'opacity 1500ms ease-in' // Slower dawning fade in
                      : 'opacity 800ms ease-out', // Faster fade to 65%
                  }}
                />
                {/* Mobile B Image - Highlight */}
                <Image
                  src={stage.mobileImageB}
                  alt={`${stage.title} - highlighted`}
                  fill
                  className="md:hidden object-cover object-center ease-in-out"
                  sizes="100vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  style={{
                    opacity: currentStage === index ? (showHighlight ? 1 : 0.65) : 0,
                    transition: showHighlight 
                      ? 'opacity 1500ms ease-in' // Slower dawning fade in
                      : 'opacity 800ms ease-out', // Faster fade to 65%
                  }}
                />
              </>
            )}
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/50 z-10" />
      </div>

      <div className="relative z-20 h-screen flex items-center justify-center px-4 py-12">
        <div className="container-custom">
          <div
            className={`
              transition-all duration-700 ease-out
              text-center mb-auto md:pt-20 pt-12
              ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
            `}
          >
            {/* Main hero message */}
            <div className="mb-6">
              <div className="inline-block glass-panel px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">{currentHero.badge}</span>
              </div>

              <h1 className="text-3xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                {currentHero.title}
              </h1>

              <p className="text-base md:text-xl text-muted-foreground mb-6 text-balance">{currentHero.description}</p>
            </div>

            {currentHero.ctas && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                {currentHero.ctas.map((cta, index) => (
                  <Link
                    key={index}
                    href={cta.href}
                    className={`
                      group px-8 py-4 rounded-2xl flex items-center gap-3 font-medium transition-all duration-300 hover:scale-105
                      ${
                        cta.primary
                          ? "glass-panel hover-lift text-foreground precision-border"
                          : "border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <span>{cta.text}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stage indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroStages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setPreviousStage(currentStage)
              setTimeout(() => {
                setCurrentStage(index)
              }, 700)
              setTimeout(() => {
                setIsTransitioning(false)
              }, 750)
            }}
            className={`
              h-1.5 rounded-full transition-all duration-500 ease-in-out
              ${currentStage === index ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"}
            `}
            aria-label={`Go to stage ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
