"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  {
    name: "SonaCare Medical",
    logo: "/logos/sonacare_hifu.png",
    description:
      "SonaCare Medical designs and manufactures HIFU surgical ablation systems that offer physicians and patients both clinical effectiveness and quality-of-life interventions. SonaCare Medical's strategic vision is to develop and commercialize a range of products aimed at bringing the benefits of therapeutic focused ultrasound to patients worldwide.",
    specialization: "HIFU Surgical Ablation Systems",
  },
  {
    name: "BK Medical",
    logo: "/logos/bkmedical.jpg",
    description:
      "For more than 40 years, BK Medical solutions have played a central role in procedure-driven markets that include urology, surgery and point-of-care. With award-winning systems and unique transducer designs, BK directly addresses the specialized needs and clinical challenges of physicians worldwide, offering innovative ultrasound solutions.",
    specialization: "Ultrasound Solutions & Transducers",
  },
  {
    name: "MIM Software",
    logo: "/logos/m.png",
    description:
      "MIM Software Inc. provides practical imaging solutions in the fields of radiation oncology, radiology, nuclear medicine, neuroimaging, and cardiac imaging. MIM offers solutions for PC and Mac® workstations, as well as mobile iOS and cloud-based platforms. MIM is a privately held company that sells its products globally.",
    specialization: "Medical Imaging Software Solutions",
  },
]

const equipmentByService = [
  {
    service: "MR/US Fusion Biopsy",
    equipment: ["BK 3000 Ultrasound", "Civco Micro Touch Stabiliser", "Parity Medical Cart", "MIM Fusion Software"],
  },
  {
    service: "On-Site HIFU",
    equipment: ["Sonablate HIFU Machine", "BK 3000 Ultrasound", "MIM Fusion Software"],
  },
]

export default function EquipmentServicesPage() {
  return (
    <>
      <Header />
      <main className="pb-20">
        {/* Hero Section with Equipment Provided - Unified */}
        <div className="relative bg-gradient-to-b from-green-900 via-emerald-800 to-emerald-700 min-h-screen flex flex-col overflow-hidden">
          {/* Surgery Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/logos/herokit.png"
              alt="Surgical Theatre"
              fill
              className="object-cover opacity-30"
              priority
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-emerald-800/60 to-emerald-700/50"></div>
          </div>

          <div className="container-custom relative z-10 flex-1 flex flex-col justify-center py-32">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white mt-32"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-12">Equipment & Technology Partners</h1>
              <p className="text-lg sm:text-xl text-green-100 leading-relaxed max-w-3xl mx-auto">
                World-class medical equipment and strategic technology partnerships delivering cutting-edge solutions
                for precision prostate care.
              </p>
            </motion.div>

            {/* 2 Column Layout: Benefits (Left) + Equipment (Right) */}
            <div className="grid lg:grid-cols-3 gap-8 mt-16">
              {/* Left Column: 4 Benefit Cards Stacked */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-1 space-y-4"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-green-50 text-sm"><span className="font-bold">Zero Capital Investment</span> – Access premium tech without purchasing equipment</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-green-50 text-sm"><span className="font-bold">No Maintenance Burden</span> – No servicing costs or idle equipment between procedures</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-green-50 text-sm"><span className="font-bold">Specialized Procedures Viable</span> – Offer advanced treatments without major capital commitment</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-green-50 text-sm"><span className="font-bold">Mobile Service Model</span> – Equipment delivered, set up, and managed by our expert team</p>
                </div>
              </motion.div>

              {/* Right Column: 2 Equipment Cards Side by Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-2 grid md:grid-cols-2 gap-6"
              >
                {equipmentByService.map((item, index) => (
                  <div
                    key={item.service}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-white/50"
                  >
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">{item.service}</h3>
                    <ul className="space-y-2">
                      {item.equipment.map((equip, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-3">
                          <span className="text-green-600 mt-1 font-bold">✓</span>
                          <span>{equip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Technology Partners Grid */}
        <div className="bg-gray-50 py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Technology Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We collaborate with world-class technology partners to deliver cutting-edge medical equipment and
                software solutions.
              </p>
            </motion.div>

            <div className="grid gap-16">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex items-center justify-center min-h-[200px]">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        width={300}
                        height={120}
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{partner.name}</h2>
                        <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                          {partner.specialization}
                        </p>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">{partner.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Technology Partners */}
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Technology Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full flex items-center justify-center min-h-[120px]">
                <div className="text-center">
                  <Image
                    src="/logos/cc.png"
                    alt="Civco Medical Solutions"
                    width={150}
                    height={60}
                    className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <p className="text-xs text-gray-600 mt-2 font-medium">Civco Medical Solutions</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full flex items-center justify-center min-h-[120px]">
                <div className="text-center">
                  <Image
                    src="/logos/pm.png"
                    alt="Parity Medical"
                    width={150}
                    height={60}
                    className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <p className="text-xs text-gray-600 mt-2 font-medium">Parity Medical</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full flex items-center justify-center min-h-[120px]">
                <div className="text-center">
                  <Image
                    src="/logos/mermaidmedical.png"
                    alt="Mermaid Medical"
                    width={150}
                    height={60}
                    className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <p className="text-xs text-gray-600 mt-2 font-medium">Mermaid Medical</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full flex items-center justify-center min-h-[120px]">
                <div className="text-center">
                  <Image
                    src="/logos/parker&sonstransport.gif"
                    alt="Parker & Son Transport"
                    width={150}
                    height={60}
                    className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <p className="text-xs text-gray-600 mt-2 font-medium">Parker & Son Transport</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full flex items-center justify-center min-h-[120px]">
                <div className="text-center">
                  <Image
                    src="/logos/thefocaltherapyclinic.png"
                    alt="The Focal Therapy Clinic"
                    width={150}
                    height={60}
                    className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <p className="text-xs text-gray-600 mt-2 font-medium">The Focal Therapy Clinic</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partnership Benefits */}
        <div className="container-custom py-20 border-t">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Our Partnerships Matter</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic partnerships ensure you receive the most advanced, reliable, and clinically proven solutions
              for precision prostate care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-Edge Technology",
                description: "Access to the latest innovations in HIFU, ultrasound, and medical imaging software",
              },
              {
                title: "Proven Clinical Results",
                description: "Equipment and software with extensive clinical validation and proven patient outcomes",
              },
              {
                title: "Comprehensive Support",
                description: "Full technical support, training, and ongoing maintenance from industry leaders",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
