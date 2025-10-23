"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function PartnersPage() {
  const surgeonTestimonials = [
    {
      name: "Mr Marc Laniado",
      title: "Consultant Urological Surgeon",
      quote:
        "The Prostate Care team take all the fuss out of fusion. Without having to do any extra preparation, I am able to provide the highest standard of prostate biopsy service for my patients. The Application Specialists bring the fusion software and the pre-prepared biopsy plans with them and manage the software throughout the procedure. They are a pleasure to work with.",
      image: "/ml-surgeon.png",
    },
    {
      name: "Professor Richard Hindley",
      title: "Consultant Urological Surgeon",
      quote:
        "The Prostate Care contouring service is what makes the difference. All I need to do is ask my secretary to book the service and the Prostate Care operations team arrange for the patient MRI scans to be transferred via IEP, ready for contouring by Dr Clare Allen. This, in my opinion, is the optimal standard of care for my private patients.",
      image: "/rh.png",
    },
    {
      name: "Mr Raj Nigam",
      title: "Consultant Urological Surgeon",
      quote:
        "The Application Specialists are a highly professional team. An accurate fusion is vital for the procedure and their expertise in achieving this is invaluable. The biopsies are tracked and a graphic report is provided, which helps the patients understand their diagnosis and treatment options.",
      image: "/rn.png",
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl font-bold mb-6">Clinician Experience</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Our network of expert clinicians and strategic partners enables us to deliver world-class prostate care
                services across the UK healthcare system. Trusted by leading surgeons and powered by cutting-edge
                technology partners.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Clinical Excellence Section */}
        <div className="container-custom py-20 border-b">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Clinical Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading clinicians and medical professionals to deliver exceptional prostate care
              services. Our network includes experienced urologists, radiologists, and medical technicians who are
              dedicated to advancing precision diagnostics in prostate cancer care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Expert Radiologists
              </h3>
              <p className="text-gray-600 text-sm">
                Specialized in prostate MRI interpretation and fusion biopsy guidance
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Consultant Urologists
              </h3>
              <p className="text-gray-600 text-sm">Leading specialists in minimally invasive prostate treatments</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Clinical Scientists
              </h3>
              <p className="text-gray-600 text-sm">Advanced imaging and treatment planning expertise</p>
            </motion.div>
          </div>
        </div>

        {/* Surgeon Testimonials Section */}
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Surgeons Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from consultant urological surgeons who trust ProstateCare Ltd for their precision biopsy services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {surgeonTestimonials.map((testimonial, index) => (
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
                <p className="text-gray-600 leading-relaxed text-sm italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
