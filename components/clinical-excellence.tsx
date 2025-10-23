"use client"

import { motion } from "framer-motion"

interface ExpertiseArea {
  title: string
  description: string
}

interface ClinicalExcellenceProps {
  areas?: ExpertiseArea[]
  title?: string
}

const defaultAreas: ExpertiseArea[] = [
  {
    title: "Expert Radiologists",
    description: "Specialized in prostate MRI interpretation and fusion biopsy guidance",
  },
  {
    title: "Consultant Urologists",
    description: "Leading specialists in minimally invasive prostate treatments",
  },
  {
    title: "Clinical Scientists",
    description: "Advanced imaging and treatment planning expertise",
  },
]

export function ClinicalExcellence({ areas = defaultAreas, title = "Clinical Excellence" }: ClinicalExcellenceProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {areas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <h3 className="text-lg font-semibold mb-3">{area.title}</h3>
            <p className="text-gray-600 text-sm">{area.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
