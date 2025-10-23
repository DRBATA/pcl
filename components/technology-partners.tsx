"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Partner {
  name: string
  logo: string
  description: string
  specialization: string
}

interface TechnologyPartnersProps {
  partners?: Partner[]
  title?: string
  subtitle?: string
}

const defaultPartners: Partner[] = [
  {
    name: "SonaCare Medical",
    logo: "/sonacare-logo.png",
    description:
      "SonaCare Medical designs and manufactures HIFU surgical ablation systems that offer physicians and patients both clinical effectiveness and quality-of-life interventions. SonaCare Medical's strategic vision is to develop and commercialize a range of products aimed at bringing the benefits of therapeutic focused ultrasound to patients worldwide.",
    specialization: "HIFU Surgical Ablation Systems",
  },
  {
    name: "BK Ultrasound",
    logo: "/bk-ultrasound-logo.png",
    description:
      "For more than 40 years, BK Ultrasound solutions have played a central role in procedure-driven markets that include urology, surgery and point-of-care. With award-winning systems and unique transducer designs, BK directly addresses the specialized needs and clinical challenges of physicians worldwide, offering innovative ultrasound solutions.",
    specialization: "Ultrasound Solutions & Transducers",
  },
  {
    name: "MIM Software",
    logo: "/mim-software-logo.png",
    description:
      "MIM Software Inc. provides practical imaging solutions in the fields of radiation oncology, radiology, nuclear medicine, neuroimaging, and cardiac imaging. MIM offers solutions for PC and Mac® workstations, as well as mobile iOS and cloud-based platforms. MIM is a privately held company that sells its products globally.",
    specialization: "Medical Imaging Software Solutions",
  },
]

export function TechnologyPartners({
  partners = defaultPartners,
  title = "Our Technology Partners",
  subtitle = "We collaborate with world-class technology partners to deliver cutting-edge medical equipment and software solutions.",
}: TechnologyPartnersProps) {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
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
  )
}
