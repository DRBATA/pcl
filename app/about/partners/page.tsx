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
      <main className="pt-32 sm:pt-36 lg:pt-40 pb-20">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Clinician Experience</h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Trusted by leading urological surgeons across the UK. We provide the technical expertise and support that allows you to focus on what matters most - delivering exceptional patient care.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-custom py-16">

          {/* Surgeon Testimonials - Individual Banners */}
          <section className="space-y-12 mb-20">
            {surgeonTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12 border border-gray-200 shadow-lg"
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Surgeon Image */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-emerald-200 shadow-xl">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 text-center">{testimonial.name}</h3>
                      <p className="text-base font-medium text-center" style={{ color: "var(--color-medical-green)" }}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="bg-white rounded-xl p-6 lg:p-8 border-l-4 border-emerald-500 shadow-md">
                      <svg className="w-10 h-10 text-emerald-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed text-base lg:text-lg italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* The Complete Service Package: Equipment & Logistics */}
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
