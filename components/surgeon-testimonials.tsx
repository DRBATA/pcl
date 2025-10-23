"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Testimonial {
  name: string
  title: string
  quote: string
  image: string
}

interface SurgeonTestimonialsProps {
  testimonials?: Testimonial[]
  title?: string
  subtitle?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Mr Marc Laniado",
    title: "Consultant Urological Surgeon",
    quote:
      "The Prostate Care team take all the fuss out of fusion. Without having to do any extra preparation, I am able to provide the highest standard of prostate biopsy service for my patients. The Application Specialists bring the fusion software and the pre-planned biopsy plans with them and manage the software throughout the procedure. They are a pleasure to work with.",
    image: "/professional-male-surgeon.png",
  },
  {
    name: "Professor Richard Hindley",
    title: "Consultant Urological Surgeon",
    quote:
      "The Prostate Care contouring service is what makes the difference. All I need to do is ask my secretary to book the service and the Prostate Care operations team arrange for the patient MRI scans to be transferred to Dr Clare Allen. This, in my opinion, is the optimal standard of care for my private patients.",
    image: "/professional-male-professor-portrait.jpg",
  },
  {
    name: "Mr Raj Nigam",
    title: "Consultant Urological Surgeon",
    quote:
      "The Application Specialists are a highly professional team. An accurate fusion is vital for the procedure and their expertise in achieving this is invaluable. The biopsies are tracked and a graphic report is provided, which helps the patients understand their diagnosis and treatment options.",
    image: "/professional-male-surgeon.png",
  },
]

export function SurgeonTestimonials({
  testimonials = defaultTestimonials,
  title = "What Surgeons Say",
  subtitle = "Hear from consultant urological surgeons who trust ProstateCare Ltd for their precision biopsy services.",
}: SurgeonTestimonialsProps) {
  return (
    <div className="container-custom py-20">
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

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-green-100">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center">{testimonial.name}</h3>
              <p className="text-sm font-medium text-green-700 text-center">{testimonial.title}</p>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm italic">&ldquo;{testimonial.quote}&rdquo;</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
