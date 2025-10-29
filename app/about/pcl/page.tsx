"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EvolutionTabs } from "@/components/EvolutionTabs"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPCLPage() {
  return (
    <>
      <Header />
      <main className="pt-20 sm:pt-24 lg:pt-28 pb-20">
        {/* The Imaging Revolution - Full Width Tabs */}
        <EvolutionTabs />

        <div className="container-custom">

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

          {/* Meet The Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Meet The Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From expert MRI contouring to equipment transport and on-site support - the complete team making precision fusion biopsy seamless
            </p>

            {/* Clinical Team - Dr Clare Allen */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                Clinical Team
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                Expert radiologists providing multiparametric MRI contouring and precision targeting
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
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
                    <h4 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h4>
                    <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Consultant Uroradiologist
                    </p>
                    <p className="text-sm text-gray-600">MBBS (Oxford) | GMC: 3108389</p>
                    <p className="text-xs text-gray-500 mt-1">UCLH | The Princess Grace Hospital | King Edward VII's Hospital | The London Clinic</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">A UK Leader in Prostate Cancer Care</h5>
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

            {/* On-Site Application Specialists */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                On-Site Application Specialists
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                Expert technicians managing equipment setup, calibration, and real-time procedure support
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
                <div className="mb-6">
                  <Image
                    src="/images/team.png"
                    alt="On-site Application Specialists"
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Our Application Specialists are the backbone of every procedure. They arrive early to set up the 6-degree-of-freedom stepper system, calibrate the MRI fusion overlay, and manage the technical complexity throughout your biopsy session.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From loading Dr Allen's pre-planned targets to handling the sophisticated equipment so you can focus entirely on the patient.
                </p>
              </div>
            </div>

            {/* Coordination & Administration */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                Coordination & Administration
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                The team holding everything together - from initial booking to final report delivery
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 flex-shrink-0 bg-gray-100">
                    <Image
                      src="/NEW/secretary.png"
                      alt="PCL Coordinator"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">PCL Coordination Team</h4>
                    <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Your Single Point of Contact
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-3">
                  All your secretary needs to do is call us. Our coordination team handles imaging transfer, schedules Dr Allen's contouring, arranges on-site specialist deployment, and ensures everything is ready before you step into theatre.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  After the procedure, they coordinate the post-procedure targeting accuracy report - delivering complete documentation to support your clinical records.
                </p>
              </div>
            </div>

            {/* Transport & Logistics */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                Equipment Transport & Logistics Partners
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                Nationwide equipment delivery ensuring seamless service across the UK
              </p>
              
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg p-8 max-w-3xl mx-auto text-white">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-5xl">🚛</div>
                  <h4 className="text-3xl font-bold">Precision Equipment Logistics</h4>
                </div>
                
                <p className="text-center text-amber-50 mb-6">
                  Specialized medical equipment transport ensuring your hardware arrives ready for theatre
                </p>

                <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center">
                  <Image
                    src="/logos/parker&sonstransport.gif"
                    alt="Parker & Son Transport - Medical Equipment Logistics Partner"
                    width={200}
                    height={80}
                    className="h-16 w-auto"
                  />
                </div>

                <p className="text-sm text-amber-50 leading-relaxed mb-4">
                  <strong>Parker Medical Transport</strong> handles the complex logistics of ferrying our <strong>precision equipment</strong> - including the 6DOF stepper systems, ultrasound units, cradles, water balloons, and calibration tools - safely to your location and back.
                </p>
                
                <div className="bg-white/20 rounded-lg p-4 border border-white/30">
                  <p className="text-xs text-amber-100 text-center">
                    <strong>Note:</strong> MRI images and planning data are transferred digitally via secure cloud-based systems - not by physical transport. This logistics partnership is specifically for equipment delivery, setup support, and post-procedure collection.
                  </p>
                </div>
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
