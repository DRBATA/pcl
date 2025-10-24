import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function FusionBiopsyPage() {
  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
            On-Site Fusion Biopsy
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Advanced MR/US fusion biopsy services delivered directly at your facility with state-of-the-art equipment
              and expert technicians.
            </p>
            <p className="text-gray-600">
              Our on-site fusion biopsy service combines MRI and ultrasound imaging for precise targeting and improved
              diagnostic accuracy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
