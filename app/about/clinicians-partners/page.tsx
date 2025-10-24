import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CliniciansPartnersPage() {
  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
            Clinicians & Partners
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Our network of expert clinicians and strategic partners enables us to deliver world-class prostate care
              services across the UK healthcare system.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Clinical Excellence
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3">Expert Radiologists</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized in prostate MRI interpretation and fusion biopsy guidance
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3">Consultant Urologists</h3>
                  <p className="text-gray-600 text-sm">Leading specialists in minimally invasive prostate treatments</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3">Clinical Scientists</h3>
                  <p className="text-gray-600 text-sm">Advanced imaging and treatment planning expertise</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Strategic Partnerships
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">
                  We collaborate with leading NHS trusts, private healthcare providers, and medical technology companies
                  to ensure our patients have access to the latest advances in prostate cancer diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
