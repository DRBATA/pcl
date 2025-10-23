"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPCLPage() {
  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              About Prostate Care Limited
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Delivering consistent, state-of-the-art expertise to support your clinical and operational practice
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-16 border border-green-200">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              We are committed to developing access to state-of-the-art precision diagnostics for prostate cancer,
              helping hospitals implement MR/US fusion biopsy services with proven technology and expert support.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From MRI contouring to on-site application specialists, we handle the technical complexity so you can focus on patient care.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 mb-16 border border-emerald-200">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
              Our Track Record
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              Supporting <strong>~100 surgeons</strong> across <strong>~95 hospitals</strong> in more than 6 major hospital groups
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* MRI/US Fusion Biopsies */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">MRI/US Fusion Biopsies</h3>
                <p className="text-xs text-gray-500 mb-3">Using MIM Fusion Software</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2025</span>
                    <span className="text-2xl font-bold text-emerald-600">1,072</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2024</span>
                    <span className="text-lg font-semibold text-gray-700">1,158</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2023</span>
                    <span className="text-lg font-semibold text-gray-700">1,041</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Total: 3,271 cases</span>
                  </div>
                </div>
              </div>

              {/* HIFU */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">HIFU Procedures</h3>
                <p className="text-xs text-gray-500 mb-3">Sonablate HIFU + MIM Fusion</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2025</span>
                    <span className="text-2xl font-bold text-blue-600">209</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2024</span>
                    <span className="text-lg font-semibold text-gray-700">246</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2023</span>
                    <span className="text-lg font-semibold text-gray-700">212</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Total: 667 cases</span>
                  </div>
                </div>
              </div>

              {/* IRE (NanoKnife) */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">IRE (NanoKnife)</h3>
                <p className="text-xs text-gray-500 mb-3">Irreversible Electroporation</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2025</span>
                    <span className="text-2xl font-bold text-purple-600">64</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2024</span>
                    <span className="text-lg font-semibold text-gray-700">53</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2023</span>
                    <span className="text-lg font-semibold text-gray-700">40</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Total: 157 cases</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <strong>4,095 total procedures</strong> supported across all modalities (2023-2025)
              </p>
            </div>
          </div>

          {/* Clinical Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Our Clinical Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Expert radiologists providing multiparametric MRI contouring and precision targeting
            </p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto mb-16">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-200 flex-shrink-0">
                  <Image
                    src="/surgeons/ca.png"
                    alt="Dr Clare Allen"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h3>
                  <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                    Consultant Uroradiologist
                  </p>
                  <p className="text-sm text-gray-600">MBBS (Oxford) | GMC: 3108389</p>
                  <p className="text-xs text-gray-500 mt-1">UCLH | The Princess Grace Hospital | King Edward VII's Hospital | The London Clinic</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">A UK Leader in Prostate Cancer Care</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Clare qualified from Oxford (MBBS, 1985) and is the uro-radiology lead consultant at University College London. She has pioneered the use of mpMRI (multiparametric magnetic resonance imaging) for prostate cancer since 2000 and has led the establishment of reporting standards for prostate cancer imaging in the UK.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  She was lead radiologist on the <strong>PROMISE Trial</strong> which proved the efficacy of mpMRI for prostate cancer globally, and received the <strong>UK Research Paper of the Year</strong> award.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Dr Allen has a well-developed clinical practice in dynamic contrast enhanced magnetic resonance imaging (DCE-MRI) in the prostate and leads a team of medical physicists in further defining the role of multi-sequence MRI in diagnostic utility of prostate cancer.
                </p>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-br from-blue-900 to-emerald-900 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Prostate Care Limited</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Expert Clinical Support</h3>
                <p className="text-sm text-blue-100">
                  Application Specialists handle setup, fusion alignment, and real-time guidance throughout procedures
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🧲</div>
                <h3 className="text-xl font-bold mb-3">Radiologist-Led Contouring</h3>
                <p className="text-sm text-blue-100">
                  Specialist prostate MRI interpretation and target delineation by experienced consultant radiologists
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold mb-3">Complete Service Package</h3>
                <p className="text-sm text-blue-100">
                  From MRI transfer to post-procedure reporting - we handle the complexity so you can focus on patients
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
