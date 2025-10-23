"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AdditionalPartner {
  name: string
  logo: string
}

interface AdditionalPartnersProps {
  partners?: AdditionalPartner[]
  title?: string
}

const defaultPartners: AdditionalPartner[] = [
  {
    name: "Civco Medical Solutions",
    logo: "/civco-logo.png",
  },
  {
    name: "Parity Medical",
    logo: "/parity-medical-logo.png",
  },
  {
    name: "AngioDynamics",
    logo: "/angiodynamics-logo.png",
  },
  {
    name: "Koelis",
    logo: "/koelis-logo.png",
  },
]

export function AdditionalPartners({
  partners = defaultPartners,
  title = "Additional Technology Partners",
}: AdditionalPartnersProps) {
  return (
    <div className="container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full flex items-center justify-center min-h-[120px]"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={150}
                height={60}
                className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
