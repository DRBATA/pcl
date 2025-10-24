import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
            Contact Us
          </h1>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6" style={{ color: "var(--color-medical-green)" }} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">0207 036 8850</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6" style={{ color: "var(--color-medical-green)" }} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@prostatecare.co.uk</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6" style={{ color: "var(--color-medical-green)" }} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">
                      Milton Park Innovation Centre
                      <br />
                      Abingdon
                      <br />
                      OX14 4RY
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
                  Operations Team
                </h3>
                <p className="text-gray-700 mb-4">
                  To book our service or find out more, please contact our operations team:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">Claire Lloyd</p>
                  <p className="font-medium">Jane Terry</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                About Our Services
              </h2>
              <p className="text-gray-600 mb-4">
                We provide comprehensive prostate care services to hospitals and medical facilities across the UK,
                supporting ~100 surgeons across ~95 hospitals in 6+ hospital groups.
              </p>
              <p className="text-gray-600 mb-6">
                Our operations team makes booking easy - we reserve the equipment for you and liaise directly with your
                hospital. You can count on us to be there on time and ready to start.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Quick response to booking inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Direct coordination with your hospital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Comprehensive service information and pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Expert guidance on equipment and procedures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
