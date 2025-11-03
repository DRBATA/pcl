"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function ServicesPage() {
  const [currentReportView, setCurrentReportView] = useState(0)

  const reportViews = [
    { image: "biopsy/left.png" },
    { image: "biopsy/posterior-anterior.png" },
    { image: "biopsy/right.png" },
    { image: "biopsy/a.png" },
    { image: "biopsy/view.png" },
  ]

  // Auto-cycle through report views every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReportView((prev) => (prev + 1) % reportViews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  const services = [
    {
      title: "MR/US Fusion Biopsy",
      description:
        "State-of-the-art precision biopsy using MR/US fusion technology for accurate prostate cancer diagnosis.",
      cases2025: "1,072",
      link: "/services/freehand-fusion",
    },
    {
      title: "On-Site HIFU",
      description: "High-Intensity Focused Ultrasound treatment delivered with precision and expertise.",
      cases2025: "209",
      link: "/services/hifu",
    },
    {
      title: "IRE (NanoKnife)",
      description: "Irreversible Electroporation for precise focal therapy with minimal side effects.",
      cases2025: "64",
      link: "/services/patient-referral",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Easy Booking",
      description:
        "Contact our operations team (Claire Lloyd or Jane Terry) to reserve equipment. We liaise directly with your hospital to coordinate scheduling.",
    },
    {
      number: "02",
      title: "Pre-Procedure Planning",
      description:
        "Dr Clare Allen reviews MRI scans and creates detailed biopsy plans using specialist contouring software. Plans are ready before procedure day.",
    },
    {
      number: "03",
      title: "Equipment Delivery & Setup",
      description:
        "Our team arrives on-site with all equipment, performs setup and safety checks. Everything is ready when you need it.",
    },
    {
      number: "04",
      title: "On-Site Support",
      description:
        "Application Specialists remain present throughout procedures, managing fusion software and providing real-time technical guidance.",
    },
    {
      number: "05",
      title: "Post-Procedure Reporting",
      description:
        "Detailed graphic reports are provided showing biopsy tracking and results, helping patients understand their diagnosis and treatment options.",
    },
    {
      number: "06",
      title: "Equipment Disassembly",
      description:
        "Our team handles all equipment disassembly and removal. No maintenance costs or storage requirements for your facility.",
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        <div className="container-custom py-20">
          {/* Process Overview Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined process makes it easy to access state-of-the-art equipment and expert support without
                the burden of ownership.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
                >
                  <div className="text-5xl font-bold mb-4 opacity-20" style={{ color: "var(--color-medical-green)" }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scrolling Services Images Strip */}
          <div className="mb-20 overflow-hidden">
            <div className="flex gap-6 animate-scroll-left">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 flex-shrink-0">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                    <div
                      key={`${setIndex}-${num}`}
                      className="relative w-[400px] h-[300px] flex-shrink-0 rounded-3xl overflow-hidden"
                    >
                      <Image
                        src={`/ss${num}.jpg`}
                        alt={`Service showcase ${num}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* On the Day Support Section */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">On the Day Support</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                "One of the major advantages of working with ProstateCare Ltd is how easy it is to book their service.
                Their operations team reserve the equipment for us and then liaise directly with the private hospital. I
                know they will be there on time and ready to start."
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    What We Provide
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Application Specialists on-site throughout procedure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Real-time fusion software management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Technical guidance and troubleshooting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Biopsy tracking and documentation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Post-Procedure
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Detailed graphic reports provided</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Biopsy tracking visualization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Patient-friendly result documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Complete equipment disassembly and removal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Post-Procedure Report: Targeting Accuracy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 mb-16 border-2 border-emerald-200">
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                📊 Your Targeting Accuracy Report
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8 items-start">
                <div>
                  <p className="text-gray-700 mb-8 leading-relaxed space-y-4">
                   After each procedure, surgeons receive a detailed report showing 
                    <strong> exactly how well they met their targets</strong> — 
                   quantifying accuracy, documenting sampling coverage, and providing 
                    objective evidence of diagnostic quality.
                  </p>

                  <p className="text-gray-700 mb-8 leading-relaxed space-y-4">
                    This visualisation also provides <strong>clear reassurance for patients</strong>, 
                    demonstrating that the precise area of concern has been accurately sampled, 
                    and that every biopsy can be directly correlated with its histopathology result 
                    for complete transparency and peace of mind.
                  </p>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-lg border border-emerald-200">
                  <div className="relative w-full h-[400px] bg-white">
                    {reportViews.map((view, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: idx === currentReportView ? 1 : 0 }}
                      >
                        <Image
                          src={view.image}
                          alt={`Targeting Report View ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                    

                    {/* Progress Dots */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {reportViews.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentReportView(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentReportView ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                          }`}
                          aria-label={`View ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold mb-3 text-emerald-900">📍 What's Included</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>Target Hit Rate:</strong> Percentage of MRI targets successfully sampled</li>
                    <li>• <strong>Grid Coverage Map:</strong> Visual confirmation of systematic sampling</li>
                    <li>• <strong>Lesion Coordinates:</strong> A1, B3, etc. - reproducible for follow-up</li>
                    <li>• <strong>3D Spatial Visualization:</strong> MRI fusion overlay with needle paths</li>
                    <li>• <strong>Core-by-Core Visualisation:</strong> Depth, angle, target accuracy per sample</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold mb-3 text-cyan-900">🎯 Why It Matters</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>Patient Communication:</strong> Show patients exactly what was sampled</li>
                    <li>• <strong>MDT Evidence:</strong> Objective data for multidisciplinary discussions</li>
                    <li>• <strong>Quality Assurance:</strong> Track targeting performance over time</li>
                    <li>• <strong>Audit Trail:</strong> Complete documentation for clinical governance</li>
                    <li>• <strong>Reproducibility:</strong> Future biopsies can reference exact locations</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl p-4">
                <p className="text-center text-sm font-semibold">
                  ✨ Helpful guide to dicuss with patients about their diagnostic and onward planning.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-green-900 to-emerald-800 text-white rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Contact our operations team to book your service and experience the ProstateCare Ltd difference.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Book a Call <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
