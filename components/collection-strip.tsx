"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./reveal"

interface ServiceItem {
  id: string
  name: string
  image?: string
  images?: string[]
  count: string
  link: string
  cycling?: boolean
  boldTitle?: boolean
  titleLines?: string[]
  logoCard?: boolean
}

const medicalServices: ServiceItem[] = [
  {
    id: "precision-chain",
    name: "WORLD CLASS",
    images: [
      "/tidy/pack/a.png",
      "/tidy/pack/b.png",
      "/tidy/pack/c.png",
      "/tidy/pack/d.png",
      "/tidy/pack/e.png",
    ],
    count: "End to End Chain of Precision",
    link: "/services",
    cycling: true,
    boldTitle: true,
    titleLines: ["WORLD", "CLASS", "PRECISION"],
  },
  {
    id: "ultrasound-guidance",
    name: "ULTRASOUND GUIDANCE",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gMdHnJSxgu05dJT3ScP5je54dqCT1p.png",
    count: "Real-time Precision",
    link: "/about/equipment-services",
  },
  {
    id: "biopsy-planning",
    name: "BIOPSY PLANNING",
    image: "/medical-biopsy-planning-workstation.png",
    count: "Expert Contouring",
    link: "/services/biopsy-plan",
  },
  {
    id: "equipment-hire",
    name: "BREAK OUT THE GOOD STUFF",
    images: [
      "/tidy/setup/1.png",
      "/tidy/setup/2.png",
      "/tidy/setup/3.png",
      "/tidy/setup/4.png",
      "/tidy/setup/5.png",
      "/tidy/setup/6.png",
      "/tidy/setup/7.png",
    ],
    count: "Check Out Our Kit",
    link: "/about/equipment-services",
    cycling: true,
    boldTitle: true,
    titleLines: ["BREAK OUT", "THE GOOD", "STUFF"],
  },
  {
    id: "focal-therapy-clinic",
    name: "FOCAL THERAPY CLINIC",
    image: "/logos/thefocaltherapyclinic.png",
    count: "Patient Referral",
    link: "/services/patient-referral",
    logoCard: true,
  },
  {
    id: "pack-up",
    name: "PACK UP",
    images: [
      "/tidy/putawayprobe/packed.png",
      "/tidy/putawayprobe/tukcingaway.png",
      "/tidy/putawayprobe/puttingdown.png",
      "/tidy/putawayprobe/reachup.png",
    ],
    count: "As If We Were Never There → End to End Service",
    link: "/about",
    cycling: true,
    boldTitle: true,
    titleLines: ["PACK", "UP", "SERVICE"],
  },
]

function CyclingImage({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2500) // Change image every 2.5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <>
      {images.map((img, index) => (
        <motion.div
          key={img}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={img}
            alt={`Equipment management ${index + 1}`}
            fill
            className="object-cover object-center"
            sizes="320px"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      ))}
    </>
  )
}

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const calculateConstraints = () => {
      if (carouselRef.current) {
        const carouselWidth = carouselRef.current.scrollWidth
        const containerWidth = carouselRef.current.parentElement?.offsetWidth || window.innerWidth
        const maxDrag = Math.min(0, containerWidth - carouselWidth - 48) // Add extra padding
        console.log('Drag constraints:', { carouselWidth, containerWidth, maxDrag })
        setDragConstraints({ left: maxDrag, right: 0 })
      }
    }

    // Calculate immediately and after delays to ensure images are loaded
    calculateConstraints()
    const timer1 = setTimeout(calculateConstraints, 100)
    const timer2 = setTimeout(calculateConstraints, 500)
    const timer3 = setTimeout(calculateConstraints, 1000)
    
    window.addEventListener("resize", calculateConstraints)
    window.addEventListener("load", calculateConstraints)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      window.removeEventListener("resize", calculateConstraints)
      window.removeEventListener("load", calculateConstraints)
    }
  }, [])

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
    }
  }

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">Medical Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive prostate care solutions, from advanced imaging to expert clinical support, delivered with
              precision and excellence.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative overflow-x-hidden">
        <motion.div
          ref={carouselRef}
          className="flex gap-8 px-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        >
          {medicalServices.map((service, index) => (
            <Link key={service.id} href={service.link} className="flex-shrink-0 w-80" onClick={handleLinkClick}>
              <motion.div
                className="group h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ filter: "blur(1px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.cycling && service.images ? (
                      <CyclingImage images={service.images} />
                    ) : (
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover object-center"
                        sizes="320px"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col justify-between p-12 pt-16 pb-10 pointer-events-none">
                    <motion.div
                      className="text-left"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.boldTitle ? (
                        <>
                          <div>
                            {(service.titleLines || service.name.split(' ')).map((line: string, idx: number, arr: string[]) => (
                              <div
                                key={idx}
                                className={idx === arr.length - 1 ? "text-5xl font-extrabold uppercase leading-tight" : "text-4xl font-extrabold uppercase leading-tight mb-1"}
                                style={{
                                  color: idx === arr.length - 1 ? '#059669' : '#047857',
                                  textShadow: idx === arr.length - 1 ? '2px 2px 6px rgba(0,0,0,0.5), 0 0 2px rgba(255,255,255,0.4)' : '2px 2px 4px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.3)',
                                  letterSpacing: '-0.02em'
                                }}
                              >
                                {line}
                              </div>
                            ))}
                          </div>
                        </>
                      ) : service.logoCard ? (
                        <>
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-2xl font-bold tracking-wider mb-4 text-gray-900">
                              {service.name}
                            </h3>
                            <p className="text-sm font-semibold text-gray-700">{service.count}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-3xl font-bold tracking-wider mb-2 text-white">
                            {service.name}
                          </h3>
                          <p className="text-sm opacity-90 text-white">{service.count}</p>
                        </>
                      )}
                    </motion.div>
                    
                    {service.boldTitle && (
                      <motion.div 
                        className="text-left"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className="text-xl font-bold uppercase tracking-wide"
                          style={{
                            color: 'white',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                          }}
                        >
                          {service.count}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore services →</p>
      </div>
    </section>
  )
}
