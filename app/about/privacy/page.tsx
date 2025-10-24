import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
            Privacy Statement
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Your privacy and the security of your medical information is our top priority.
            </p>
            <p className="text-gray-600 mb-4">
              We are committed to protecting the confidentiality of all patient and clinical data in accordance with
              healthcare privacy regulations and best practices.
            </p>
            <p className="text-gray-600">
              All medical procedures and data handling comply with relevant healthcare standards and privacy
              legislation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
