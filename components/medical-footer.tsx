"use client"
import { Phone, Mail, MapPin } from "lucide-react"

export function MedicalFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Contact section */}
      <div
        className="py-20"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vrlKw12QdYoxQA6lSUL2uC00MJrgKY.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Phone Number</h3>
              <p className="text-xl">0207 036 8850</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Email Address</h3>
              <p className="text-xl">info@prostatecare.co.uk</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Address</h3>
              <p className="text-xl">Milton Park Innovation Centre</p>
              <p className="text-xl">Abingdon</p>
              <p className="text-xl">OX14 4RY</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-primary-foreground text-primary py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/prostate-care-logo.png" alt="Prostate Care Limited" className="h-12 w-auto" />
              <div className="text-sm">
                <p>© Prostate Care Limited 2025 – All Rights Reserved.</p>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="text-sm">
              <p>Website Design | Aqua Media</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
