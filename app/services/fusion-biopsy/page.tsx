"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function FusionBiopsyPage() {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 lg:pt-40 pb-20">
        
        {/* Hero Section - Split Layout */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  MR/US Fusion Biopsy Service
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Complete on-site fusion biopsy service delivered to your facility. We bring the equipment, expertise, and technical support - you focus on the clinical decisions.
                </p>
                <div className="space-y-3 text-slate-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>State-of-the-art equipment delivered and calibrated on-site</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert Application Specialist support throughout procedure</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Pre-planned MRI contouring by specialist radiologist</span>
                  </div>
                </div>
              </div>

              {/* Right: Surgeon & Application Specialist Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/aboutus/surgeon_snr_app_spec.jpg"
                    alt="Surgeon and Application Specialist working together during fusion biopsy"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom py-16">

          {/* What We Deliver */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Complete On-Site Service Delivery
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We manage every technical aspect of MRI/US fusion biopsy, from pre-procedure planning to real-time alignment and post-procedure reporting.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pre-Procedure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Pre-Procedure Planning</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Dr. Clare Allen reviews MRI and contours targets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Virtual fusion planning completed in advance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Equipment prepared and tested before arrival</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Targeting coordinates ready for immediate use</span>
                  </li>
                </ul>
              </motion.div>

              {/* During Procedure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Application Specialist present throughout</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Live fusion alignment and needle tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Equipment management and calibration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Core documentation and targeting accuracy tracking</span>
                  </li>
                </ul>
              </motion.div>

              {/* Post-Procedure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Post-Procedure Reporting</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Detailed targeting accuracy report provided</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Core location mapping with grid coordinates</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Equipment breakdown and removal</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Documentation for future reference procedures</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* On-Site Alignment & Support */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12 border border-gray-200">
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>
                On-Site Alignment & Technical Expertise
              </h2>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Precision Equipment Setup</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Our Application Specialists arrive with everything needed for MRI/US fusion biopsy. Equipment is assembled, calibrated, and tested before your procedure begins - ensuring millimeter-accurate targeting from the first core.
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">6-Degree-of-Freedom Positioning</p>
                        <p className="text-sm text-gray-600">Precise probe alignment with X, Y, Z translation plus pitch, yaw, roll control</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Sterile Field Management</p>
                        <p className="text-sm text-gray-600">Proper draping, grid installation, and aseptic technique throughout</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Prostate Immobilization</p>
                        <p className="text-sm text-gray-600">Water-filled balloon technique prevents gland movement and maintains fusion accuracy</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                    <Image
                      src="/NEW/PLan_allignment.png"
                      alt="Real-time fusion alignment during biopsy"
                      width={800}
                      height={800}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Real-Time Fusion Overlay</h3>
                <p className="text-slate-300 text-center mb-6 max-w-3xl mx-auto">
                  The Application Specialist manages the live fusion software, overlaying MRI-contoured targets onto your ultrasound view. You see exactly where to sample - no cognitive estimation, no guesswork.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="font-semibold mb-2">Pre-Planned Targets</p>
                    <p className="text-sm text-slate-300">Dr. Allen's contoured lesions loaded and ready</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="font-semibold mb-2">Live Needle Tracking</p>
                    <p className="text-sm text-slate-300">See trajectory before firing - adjust as needed</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="font-semibold mb-2">Core Documentation</p>
                    <p className="text-sm text-slate-300">Every sample mapped with grid coordinates</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Surgeons Choose This Service */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-12 border-2 border-emerald-200">
              <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
                Why Surgeons Choose Our Fusion Service
              </h2>
              <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
                We remove the barriers that prevent hospitals from offering precision biopsy services.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">No Capital Investment Required</h3>
                  <p className="text-gray-700 mb-4">
                    Fusion equipment costs hundreds of thousands. We bring everything - ultrasound system, stepper, software, and expertise - on a per-procedure basis.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "I can offer my patients the gold standard without purchasing expensive equipment that sits idle between procedures."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">No Training Burden</h3>
                  <p className="text-gray-700 mb-4">
                    Our Application Specialists are fusion experts. They handle setup, calibration, software management, and troubleshooting - no steep learning curve for your team.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "The Application Specialists manage the technical complexity. I focus on clinical decisions, not troubleshooting equipment."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">Expert Radiologist Contouring</h3>
                  <p className="text-gray-700 mb-4">
                    Dr. Clare Allen reviews every MRI and creates detailed targeting plans. Her 20+ years of prostate imaging expertise means accurate lesion identification every time.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "Having a specialist radiologist contour the targets eliminates the guesswork and gives me confidence in my sampling."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">Flexible Scheduling</h3>
                  <p className="text-gray-700 mb-4">
                    Book procedures as needed - no commitment to minimum volumes. Perfect for building a fusion biopsy practice or managing variable case loads.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "I can offer fusion to selected patients without the pressure of maintaining equipment utilization rates."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Offer Precision Fusion Biopsy?</h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                No equipment investment. No training burden. Expert support from planning to reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all inline-block"
                >
                  Get Started
                </a>
                <a
                  href="/services/biopsy-plan"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all inline-block"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
              {/* Pre-Procedure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Pre-Procedure Planning</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Dr. Clare Allen reviews MRI and contours targets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Virtual fusion planning completed in advance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Equipment prepared and tested before arrival</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Targeting coordinates ready for immediate use</span>
                  </li>
                </ul>
              </motion.div>

              {/* During Procedure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Application Specialist present throughout</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Live fusion alignment and needle tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Equipment management and calibration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Core documentation and targeting accuracy tracking</span>
                  </li>
                </ul>
              </motion.div>

              {/* Post-Procedure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Post-Procedure Reporting</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Detailed targeting accuracy report provided</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Core location mapping with grid coordinates</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Equipment breakdown and removal</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Documentation for future reference procedures</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* On-Site Alignment & Support */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12 border border-gray-200">
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>
                On-Site Alignment & Technical Expertise
              </h2>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Precision Equipment Setup</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Our Application Specialists arrive with everything needed for MRI/US fusion biopsy. Equipment is assembled, calibrated, and tested before your procedure begins - ensuring millimeter-accurate targeting from the first core.
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">6-Degree-of-Freedom Positioning</p>
                        <p className="text-sm text-gray-600">Precise probe alignment with X, Y, Z translation plus pitch, yaw, roll control</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Sterile Field Management</p>
                        <p className="text-sm text-gray-600">Proper draping, grid installation, and aseptic technique throughout</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Prostate Immobilization</p>
                        <p className="text-sm text-gray-600">Water-filled balloon technique prevents gland movement and maintains fusion accuracy</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                    <Image
                      src="/NEW/PLan_allignment.png"
                      alt="Real-time fusion alignment during biopsy"
                      width={800}
                      height={800}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Real-Time Fusion Overlay</h3>
                <p className="text-slate-300 text-center mb-6 max-w-3xl mx-auto">
                  The Application Specialist manages the live fusion software, overlaying MRI-contoured targets onto your ultrasound view. You see exactly where to sample - no cognitive estimation, no guesswork.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="font-semibold mb-2">Pre-Planned Targets</p>
                    <p className="text-sm text-slate-300">Dr. Allen's contoured lesions loaded and ready</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="font-semibold mb-2">Live Needle Tracking</p>
                    <p className="text-sm text-slate-300">See trajectory before firing - adjust as needed</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="font-semibold mb-2">Core Documentation</p>
                    <p className="text-sm text-slate-300">Every sample mapped with grid coordinates</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Surgeons Choose This Service */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-12 border-2 border-emerald-200">
              <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
                Why Surgeons Choose Our Fusion Service
              </h2>
              <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
                We remove the barriers that prevent hospitals from offering precision biopsy services.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">No Capital Investment Required</h3>
                  <p className="text-gray-700 mb-4">
                    Fusion equipment costs hundreds of thousands. We bring everything - ultrasound system, stepper, software, and expertise - on a per-procedure basis.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "I can offer my patients the gold standard without purchasing expensive equipment that sits idle between procedures."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">No Training Burden</h3>
                  <p className="text-gray-700 mb-4">
                    Our Application Specialists are fusion experts. They handle setup, calibration, software management, and troubleshooting - no steep learning curve for your team.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "The Application Specialists manage the technical complexity. I focus on clinical decisions, not troubleshooting equipment."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">Expert Radiologist Contouring</h3>
                  <p className="text-gray-700 mb-4">
                    Dr. Clare Allen reviews every MRI and creates detailed targeting plans. Her 20+ years of prostate imaging expertise means accurate lesion identification every time.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "Having a specialist radiologist contour the targets eliminates the guesswork and gives me confidence in my sampling."
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold mb-4 text-emerald-900">Flexible Scheduling</h3>
                  <p className="text-gray-700 mb-4">
                    Book procedures as needed - no commitment to minimum volumes. Perfect for building a fusion biopsy practice or managing variable case loads.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "I can offer fusion to selected patients without the pressure of maintaining equipment utilization rates."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Offer Precision Fusion Biopsy?</h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                No equipment investment. No training burden. Expert support from planning to reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all inline-block"
                >
                  Get Started
                </a>
                <a
                  href="/services/biopsy-plan"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all inline-block"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
