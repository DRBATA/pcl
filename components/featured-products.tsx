"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"

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
    <section className="py-8 lg:py-12" id="featured-products">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} onQuickLook={handleQuickLook} />
            </div>
          ))}
          
          {/* Third card: Description with Multi-focal Treatment */}
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <h2 className="text-3xl lg:text-4xl text-neutral-900 mb-6 text-center">
              Advanced <span className="italic font-light">HIFU Technology</span>
            </h2>
            <p className="text-base text-neutral-600 text-center leading-relaxed">
              Experience our state-of-the-art High-Intensity Focused Ultrasound treatments with multi-focal treatment capabilities, delivering precise, non-invasive therapy with exceptional accuracy and patient outcomes.
            </p>
          </div>
        </div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
