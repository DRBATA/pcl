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
      image: "/surgeons/ml.png",
    },
    {
      name: "Professor Richard Hindley",
      title: "Consultant Urological Surgeon",
      quote:
        "The Prostate Care contouring service is what makes the difference. All I need to do is ask my secretary to book the service and the Prostate Care operations team arrange for the patient MRI scans to be transferred via IEP, ready for contouring by Dr Clare Allen. This, in my opinion, is the optimal standard of care for my private patients.",
      image: "/surgeons/rh.png",
    },
    {
      name: "Mr Raj Nigam",
      title: "Consultant Urological Surgeon",
      quote:
        "The Application Specialists are a highly professional team. An accurate fusion is vital for the procedure and their expertise in achieving this is invaluable. The biopsies are tracked and a graphic report is provided, which helps the patients understand their diagnosis and treatment options.",
      image: "/surgeons/rn.png",
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
              <h1 className="text-5xl font-bold mb-6">Clinician Experience</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Trusted by leading surgeons across the UK. We provide the technical expertise and support that allows you to focus on what matters most - delivering exceptional patient care.
              </p>
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
              Hear from consultant urological surgeons who trust Prostate Care Ltd for their precision biopsy services.
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

        {/* The Complete Service Package: Equipment & Logistics */}
        <div className="container-custom pb-20">
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white rounded-2xl p-12 border-4 border-amber-600">
            <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
              🔧 The Complete Technical Package
            </h2>
            <p className="text-center text-lg mb-8 max-w-4xl mx-auto leading-relaxed">
              Our Application Specialists handle the <strong>complex technical setup, equipment calibration, and real-time support</strong> so you can focus entirely on clinical decision-making and patient care.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-500">
                <h3 className="text-xl font-bold mb-4 text-amber-300">💪 What We Handle For You</h3>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Equipment logistics</strong> - Nationwide delivery, setup, breakdown for every procedure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Precision calibration</strong> - 6-degree-of-freedom positioning, probe alignment, field matching</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Real-time technical support</strong> - Software optimization, hardware management, fusion accuracy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Sterile technique support</strong> - Draping, probe preparation, maintaining aseptic field</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-500">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">🎯 Our Service Values</h3>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Meticulous attention to detail</strong> - Every setup verified, every target confirmed, every core documented</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Partnership approach</strong> - Supporting your clinical excellence with technical expertise</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Technical expertise</strong> - Years of experience with fusion software, ultrasound physics, MRI interpretation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Consistent reliability</strong> - On-time, every time, with comprehensive preparation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-lg p-6 border border-white/30">
              <p className="text-center font-semibold text-lg mb-2">
                💎 Why Surgeons Choose to Work With Us
              </p>
              <p className="text-center text-sm text-gray-200">
                Our team's specialized expertise in equipment logistics, technical troubleshooting, and precision calibration means you can concentrate on what you do best - clinical judgment and patient outcomes. We handle the complexity, you deliver exceptional care.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
