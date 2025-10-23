"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPCLPage() {
  const teamMembers = [
    {
      name: "Dr Clare Allen",
      title: "Consultant Radiologist - Lead Contouring Specialist",
      credentials: "Oxford Graduate, UCL Uro-Radiology Lead Consultant",
      bio: "Dr Allen qualified from Oxford and is the uro-radiology lead consultant at UCL. She has pioneered the use of mpMRI imaging for prostate cancer since 2000 and has led the establishment of reporting standards for prostate cancer imaging in the UK and internationally. She was lead radiologist on the Promise Trial which proved the efficacy of mpMRI for prostate cancer globally.",
      image: "/professional-female-radiologist-portrait.jpg",
      expertise: [
        "Expert contouring using specialist software",
        "MRI report analysis and target identification",
        "Biopsy plan creation with virtual template alignment",
        "Ultrasound probe position matching during procedures",
      ],
    },
  ]

  const stats = [
    { value: "~100", label: "Surgeons Supported" },
    { value: "~95", label: "Hospitals Served" },
    { value: "3,271", label: "MRI/US Fusion Cases (3 Years)" },
    { value: "667", label: "HIFU Treatments (3 Years)" },
  ]

  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl font-bold mb-6">About Prostate Care Limited</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Delivering consistent, state-of-the-art expertise to support your clinical and operational practice
                across the UK.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="bg-white py-16 border-b">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "var(--color-medical-green)" }}>
            About Prostate Care Limited
          </h1>
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-lg text-gray-600 mb-6">
              Prostate Care Limited delivers consistent, state-of-the-art expertise to support your clinical and
              operational practice.
            </p>
            <p className="text-gray-600 mb-8">
              We are committed to developing access to state-of-the-art precision diagnostics for prostate cancer,
              helping hospitals implement MR/US fusion biopsy services with proven technology and expert support.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To advance prostate cancer care through precision diagnostics and innovative treatment solutions,
                  supporting healthcare providers with expert services and cutting-edge technology.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
                  Our Approach
                </h3>
                <p className="text-gray-600">
                  Evidence-based medicine combined with personalized care pathways, ensuring each patient receives the
                  most appropriate diagnostic and treatment approach for their specific condition.
                </p>
              </div>
            </div>
          </div>

          {/* Procedure Statistics Section */}
          <div className="bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 text-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Proven Track Record</h2>
            <p className="text-center text-green-100 mb-12 max-w-3xl mx-auto">
              Supporting clinicians nationwide with thousands of procedures annually, backed by expert contouring, on-site technical support, and state-of-the-art equipment.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* MRI/US Fusion Biopsies */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">MRI/US Fusion Biopsies</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2025</span>
                    <span className="text-xl font-bold">1,072</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2024</span>
                    <span className="text-xl font-bold">1,158</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2023</span>
                    <span className="text-xl font-bold">1,041</span>
                  </div>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">3-Year Total</span>
                    <span className="text-2xl font-bold text-cyan-300">3,271</span>
                  </div>
                </div>
              </div>

              {/* HIFU Treatments */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-orange-300">HIFU Treatments</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2025</span>
                    <span className="text-xl font-bold">209</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2024</span>
                    <span className="text-xl font-bold">246</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2023</span>
                    <span className="text-xl font-bold">212</span>
                  </div>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">3-Year Total</span>
                    <span className="text-2xl font-bold text-orange-300">667</span>
                  </div>
                </div>
              </div>

              {/* IRE/NanoKnife */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">IRE/NanoKnife</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2025</span>
                    <span className="text-xl font-bold">64</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2024</span>
                    <span className="text-xl font-bold">53</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-100">2023</span>
                    <span className="text-xl font-bold">40</span>
                  </div>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">3-Year Total</span>
                    <span className="text-2xl font-bold text-purple-300">157</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-lg p-6 border border-white/30">
              <p className="text-center font-semibold text-lg">
                📊 Over <strong>4,000 procedures</strong> supported across ~100 surgeons and ~95 hospitals nationwide
              </p>
            </div>
          </div>

          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our team of trained specialists in fusion software management, theatre operation, and clinical workflow
                are dedicated to providing everything needed to make this work for you, your patients, and your
                hospital.
              </p>
            </motion.div>

            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg border border-green-200"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-auto rounded-xl mb-4"
                      />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-lg font-medium mb-2" style={{ color: "var(--color-medical-green)" }}>
                        {member.title}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">{member.credentials}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Background & Expertise</h4>
                        <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Contouring Process</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Once our service is booked, Dr Clare Allen sets up the biopsy plans for each patient, prior to
                          the procedure. Using the MRI report from your local radiologist, Dr Allen adds her expert
                          knowledge to identify all areas of suspicion. The biopsy plan is then created using specialist
                          contouring software.
                        </p>
                        <div className="bg-white rounded-xl p-6 border border-green-200">
                          <p className="text-gray-700 text-sm italic mb-4">
                            "The fusion software allows me to view the T2, the dynamically enhanced and the high B value
                            scans, plus the ADC map simultaneously. I can contour the targets using whichever images
                            best show the lesion. I create the biopsy plan, aligning the contouring with the virtual
                            template and adjusting the angle to match the ultrasound probe position during the biopsy
                            procedure."
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            The plan is then sent to the Application Specialists, ready for use in theatres.
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Key Expertise Areas</h4>
                        <ul className="space-y-2">
                          {member.expertise.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-green-600 mt-1">✓</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Theatre Requirements</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our team of trained specialists handle all aspects of equipment setup and operation. We work seamlessly
              with your existing theatre infrastructure to deliver state-of-the-art precision diagnostics.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                  Equipment We Provide
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• BK 3000 Ultrasound System</li>
                  <li>• Civco Micro Touch Stabiliser</li>
                  <li>• Parity Medical Cart</li>
                  <li>• MIM Fusion Software</li>
                  <li>• All necessary accessories and consumables</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                  Our Support Includes
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Pre-procedure equipment setup and testing</li>
                  <li>• On-site Application Specialist support</li>
                  <li>• Real-time technical guidance during procedures</li>
                  <li>• Post-procedure reporting and documentation</li>
                  <li>• Equipment breakdown and removal</li>
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
