"use client"

import { motion } from "framer-motion"

interface Benefit {
  title: string
  description: string
}

interface PartnershipBenefitsProps {
  benefits?: Benefit[]
  title?: string
  subtitle?: string
}

const defaultBenefits: Benefit[] = [
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
]

export function PartnershipBenefits({
  benefits = defaultBenefits,
  title = "Why Our Partnerships Matter",
  subtitle = "Our strategic partnerships ensure you receive the most advanced, reliable, and clinically proven solutions for precision prostate care.",
}: PartnershipBenefitsProps) {
  return (
    <div className="container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
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
  )
}
