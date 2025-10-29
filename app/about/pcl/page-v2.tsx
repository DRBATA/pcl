"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function AboutPCLPage() {
  const [expandedHIFU, setExpandedHIFU] = useState(false)
  const [currentTeamImage, setCurrentTeamImage] = useState(0)

  const clinicalTeamImages = [
    "/t1.png",
    "/t2.png",
    "/t3.png",
    "/t4.png",
    "/t5.png"
  ]

  // Auto-cycle through clinical team images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamImage((prev) => (prev + 1) % clinicalTeamImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [clinicalTeamImages.length])

  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 lg:pt-40 pb-20">
        <div className="container-custom">

          {/* 1. Why Choose Prostate Care Limited - AT TOP */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-12">
              <h1 className="text-4xl font-bold mb-8 text-center">Why Choose Prostate Care Limited</h1>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Expert Clinical Support</h3>
                  <p className="text-sm text-slate-300">
                    Application Specialists handle setup, fusion alignment, and real-time guidance throughout procedures
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Radiologist-Led Contouring</h3>
                  <p className="text-sm text-slate-300">
                    Specialist prostate MRI interpretation and target delineation by experienced consultant radiologists
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Complete Service Package</h3>
                  <p className="text-sm text-slate-300">
                    From MRI transfer to post-procedure reporting - we handle the complexity so you can focus on patients
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Clinical Team - with cycling images t1-5 */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Clinical Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Expert radiologists providing multiparametric MRI contouring and precision targeting
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: Cycling Images */}
                <div className="relative w-full h-[400px]">
                  {clinicalTeamImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-0 transition-opacity duration-1000"
                      style={{ opacity: idx === currentTeamImage ? 1 : 0 }}
                    >
                      <Image
                        src={img}
                        alt={`Clinical Team ${idx + 1}`}
                        fill
                        className="object-contain rounded-xl"
                      />
                    </div>
                  ))}
                  {/* Progress Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {clinicalTeamImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentTeamImage ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Dr Clare Allen Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-200">
                      <Image
                        src="/surgeons/ca.png"
                        alt="Dr Clare Allen"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h3>
                      <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                        Consultant Uroradiologist
                      </p>
                      <p className="text-sm text-gray-600">MBBS (Oxford) | GMC: 3108389</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Clare qualified from Oxford (MBBS, 1985) and is the uro-radiology lead consultant at University College London. She has pioneered the use of mpMRI for prostate cancer since 2000.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Lead radiologist on the <strong>PROMISE Trial</strong> which proved the efficacy of mpMRI for prostate cancer globally.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      <strong>Locations:</strong> UCLH | The Princess Grace Hospital | King Edward VII's Hospital | The London Clinic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Our Technicians and Administrative Team */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Our Technicians & Administrative Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Expert application specialists and coordinators ensuring seamless service delivery
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* On-Site Application Specialists */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                  On-Site Application Specialists
                </h3>
                <div className="mb-4">
                  <Image
                    src="/images/team.png"
                    alt="Application Specialists"
                    width={600}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-3">
                  Our Application Specialists manage equipment setup, calibration, and real-time procedure support. They arrive early to set up the 6-degree-of-freedom stepper system and handle technical complexity throughout your session.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  From loading Dr Allen's pre-planned targets to managing sophisticated equipment - you focus on the patient.
                </p>
              </div>

              {/* Coordination & Administration */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                  Coordination & Administration
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-200 bg-gray-100">
                    <Image
                      src="/NEW/secretary.png"
                      alt="PCL Coordinator"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">PCL Coordination Team</h4>
                    <p className="text-sm font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Your Single Point of Contact
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-3">
                  All your secretary needs to do is call us. Our coordination team handles imaging transfer, schedules Dr Allen's contouring, arranges on-site specialist deployment, and ensures everything is ready before you step into theatre.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  After the procedure, they coordinate post-procedure targeting accuracy reports - delivering complete documentation for your clinical records.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Equipment and Logistics Partners */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Equipment & Logistics Partners
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Nationwide equipment delivery ensuring seamless service across the UK
            </p>

            <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg p-8 max-w-3xl mx-auto text-white">
              <div className="flex items-center justify-center gap-4 mb-6">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-2xl font-bold">Precision Equipment Logistics</h3>
              </div>

              <p className="text-center text-amber-50 mb-6">
                Specialized medical equipment transport ensuring your hardware arrives ready for theatre
              </p>

              <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center">
                <Image
                  src="/logos/parker&sonstransport.gif"
                  alt="Parker & Son Transport"
                  width={200}
                  height={80}
                  className="h-16 w-auto"
                />
              </div>

              <p className="text-sm text-amber-50 leading-relaxed mb-4">
                <strong>Parker Medical Transport</strong> handles the complex logistics of ferrying our precision equipment - including 6DOF stepper systems, ultrasound units, cradles, water balloons, and calibration tools - safely to your location and back.
              </p>

              <div className="bg-white/20 rounded-lg p-4 border border-white/30">
                <p className="text-xs text-amber-100 text-center">
                  <strong>Note:</strong> MRI images and planning data are transferred digitally via secure cloud-based systems. This logistics partnership is specifically for equipment delivery, setup support, and post-procedure collection.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Evolution - with collapsible HIFU detail */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Our Evolution
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Supporting UK urologists with precision technology for over a decade
            </p>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
              <div className="space-y-4">
                {/* HIFU - Collapsible */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedHIFU(!expandedHIFU)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-900">HIFU (Sonablate)</h3>
                        <p className="text-sm text-gray-600">Supporting since 2012</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        expandedHIFU ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedHIFU && (
                    <div className="px-6 pb-6 bg-gray-50">
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Prostate Care Limited has been supporting HIFU procedures with the <strong>Sonablate system</strong> since 2012. We provide on-site application specialist support, equipment setup, and MRI fusion guidance for focal ablation procedures.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Our team manages the complex technical setup including treatment planning, patient positioning, and real-time ultrasound monitoring throughout the ablation process.
                      </p>
                      <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
                        <p className="text-sm text-blue-900 font-semibold">
                          Over 10 years of experience supporting HIFU procedures across UK hospitals
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* MRI Fusion Biopsy */}
                <div className="bg-white rounded-xl border border-gray-200 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">MRI/US Fusion Biopsy</h3>
                      <p className="text-sm text-gray-600">Core service since inception</p>
                    </div>
                  </div>
                </div>

                {/* IRE (NanoKnife) */}
                <div className="bg-white rounded-xl border border-gray-200 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">IRE (NanoKnife)</h3>
                      <p className="text-sm text-gray-600">Irreversible electroporation support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Statistics / Track Record */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
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
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
