"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
  {
    id: "1",
    name: "HIFU Scanning & Targeting",
    price: "Precision Therapy",
    video: "/hifvidsfrontpage/hifuscan.mp4",
    badge: "Advanced" as const,
    materials: ["High-Intensity Focused Ultrasound", "Real-time MRI Guidance"],
    swatches: [
      { name: "Treatment Zone", color: "#00BFFF" },
      { name: "Focal Point", color: "#1E90FF" },
      { name: "Precision", color: "#4169E1" },
    ],
    quickLookVideos: ["/hifvidsfrontpage/hifuscan.mp4", "/hifvidsfrontpage/hifumid.mp4", "/hifvidsfrontpage/hifufin.mp4"],
    dimensions: "Focal precision: Sub-millimeter accuracy",
  },
  {
    id: "2",
    name: "HIFU Treatment Execution",
    price: "Targeted Precision",
    video: "/hifvidsfrontpage/hifumid.mp4",
    badge: "Innovative" as const,
    materials: ["3D Treatment Mapping", "Real-time Monitoring"],
    swatches: [
      { name: "Planning Zone", color: "#00CED1" },
      { name: "Target Area", color: "#20B2AA" },
      { name: "Safety Margin", color: "#48D1CC" },
    ],
    quickLookVideos: ["/hifvidsfrontpage/hifumid.mp4", "/hifvidsfrontpage/hifuscan.mp4", "/hifvidsfrontpage/hifufin.mp4"],
    dimensions: "Treatment area: Customizable zones",
  },
  {
    id: "3",
    name: "HIFU Completion & Assessment",
    price: "Comprehensive Care",
    video: "/hifvidsfrontpage/hifufin.mp4",
    badge: "Complete" as const,
    materials: ["Multi-focal Treatment", "Advanced Visualization"],
    swatches: [
      { name: "Primary Zone", color: "#FFD700" },
      { name: "Secondary Zone", color: "#FFA500" },
      { name: "Treatment Field", color: "#00BFFF" },
    ],
    quickLookVideos: ["/hifvidsfrontpage/hifufin.mp4", "/hifvidsfrontpage/hifuscan.mp4", "/hifvidsfrontpage/hifumid.mp4"],
    dimensions: "Coverage: Multiple treatment zones",
  },
]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Advanced <span className="italic font-light">HIFU Technology</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Experience our state-of-the-art High-Intensity Focused Ultrasound treatments, delivering precise,
              non-invasive therapy with exceptional accuracy and patient outcomes.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
