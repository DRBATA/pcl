"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ServicesPage() {
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
      title: "Equipment Breakdown",
      description:
        "Our team handles all equipment breakdown and removal. No maintenance costs or storage requirements for your facility.",
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl font-bold mb-6">How It Works</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Our streamlined process makes it easy to access world-class equipment and expert clinical support. From booking to breakdown, we handle everything so you can focus on patient care.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container-custom py-20">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                    {service.cases2025}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Cases in 2025</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                  style={{ color: "var(--color-medical-green)" }}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

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
                      <span>Complete equipment breakdown and removal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Complete MRI Fusion Workflow */}
          <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-12 mb-20 border-2 border-indigo-200">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
                🌍 The Complete MRI Fusion Workflow: Geographically Separated, Seamlessly Integrated
              </h2>
              <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
                Modern MRI fusion allows each step to happen in the most efficient location - MRI acquisition, radiologist contouring, and procedure execution can all be geographically separated while maintaining perfect integration.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
                  <div className="text-4xl mb-3 text-center">🧲</div>
                  <h3 className="text-lg font-bold text-center mb-3 text-purple-900">Step 1: MRI Acquisition</h3>
                  <p className="text-sm text-gray-700 text-center mb-3">
                    Patient receives multiparametric MRI scan at their local imaging center or hospital
                  </p>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-900 font-semibold">
                      📍 Location: Any MRI facility nationwide
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
                  <div className="text-4xl mb-3 text-center">🎨</div>
                  <h3 className="text-lg font-bold text-center mb-3 text-blue-900">Step 2: Expert Contouring</h3>
                  <p className="text-sm text-gray-700 text-center mb-3">
                    Dr Clare Allen reviews images remotely and creates detailed target contours and fusion plan
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-900 font-semibold">
                      📍 Location: Done offline - saves theater time
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-emerald-200">
                  <div className="text-4xl mb-3 text-center">🏥</div>
                  <h3 className="text-lg font-bold text-center mb-3 text-emerald-900">Step 3: Procedure Day</h3>
                  <p className="text-sm text-gray-700 text-center mb-3">
                    Application Specialist loads pre-planned targets, real-time fusion guides your biopsy
                  </p>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <p className="text-xs text-emerald-900 font-semibold">
                      📍 Location: Your theater - plan ready to go
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl p-8 text-white mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">⚡ Why Geographic Separation Transforms Efficiency</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold mb-2 text-cyan-100">🕐 No Theater Time Wasted</h4>
                    <p className="text-sm text-cyan-50">
                      Radiologist contouring happens offline - days before your procedure. Walk into theater with targets already planned and ready to load.
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold mb-2 text-cyan-100">📍 Expert Access Anywhere</h4>
                    <p className="text-sm text-cyan-50">
                      MRI could be done in Manchester, reported in London, biopsy in Edinburgh - geographic barriers eliminated.
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold mb-2 text-cyan-100">🎯 Streamlined Procedures</h4>
                    <p className="text-sm text-cyan-50">
                      More patients per session without rushing. Pre-planning + real-time fusion = faster, more accurate targeting.
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold mb-2 text-cyan-100">☁️ Cloud-Based Integration</h4>
                    <p className="text-sm text-cyan-50">
                      Plans stored in the cloud, accessible from any location. Complete flexibility without operational complexity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "var(--color-medical-green)" }}>
                  📋 The Learning Curve Is Minimal
                </h3>
                <p className="text-sm text-gray-700 text-center max-w-2xl mx-auto mb-4">
                  Urologists report the transition to MRI fusion biopsy takes <strong>just 1-2 cases</strong>. The target is on the ultrasound screen - your existing ultrasound skills are what matter. The MRI interpretation is already done for you.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-emerald-900 mb-1">Before MRI Fusion</p>
                    <p className="text-emerald-700">Cognitive targeting - "Is this the right spot based on the MRI I reviewed yesterday?"</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-blue-900 mb-1">With MRI Fusion</p>
                    <p className="text-blue-700">Visual overlay - "The target is right there on my ultrasound screen, guided in real-time"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

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
