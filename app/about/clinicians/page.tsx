import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CliniciansPage() {
  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
            Clinicians We Work With
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              We collaborate with leading clinicians and medical professionals to deliver exceptional prostate care
              services.
            </p>
            <p className="text-gray-600">
              Our network includes experienced urologists, radiologists, and medical technicians who are dedicated to
              advancing precision diagnostics in prostate cancer care.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
