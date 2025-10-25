"use client"
import { Header } from "@/components/header"
import { SimpleHero } from "@/components/simple-hero"
// import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ServicesColumns } from "@/components/services-columns"
import { CollectionStrip } from "@/components/collection-strip"
import { VideoContactSection } from "@/components/video-contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <Header />
      
      {/* Section 1: Hero with video */}
      <div className="h-screen snap-start snap-always">
        <SimpleHero />
      </div>
      
      {/* Section 2: HIFU Cards */}
      <div className="min-h-screen snap-start snap-always bg-background pt-28">
        <FeaturedProducts />
      </div>
      
      {/* Section 3: Services Columns */}
      <div className="min-h-screen snap-start snap-always">
        <ServicesColumns />
      </div>
      
      {/* Section 4: Collection Strip */}
      <div className="min-h-screen snap-start snap-always pt-28 flex items-center">
        <CollectionStrip />
      </div>
      
      {/* Section 5: Video to Contact */}
      <div className="h-screen snap-start snap-always">
        <VideoContactSection />
      </div>
      
      {/* Footer */}
      <div className="snap-start">
        <Footer />
      </div>
    </main>
  )
}
