"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Tab = "pre-mri" | "mri-arrives" | "fusion-beyond"

export function EvolutionTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("pre-mri")

  const tabs = [
    { id: "pre-mri" as Tab, label: "Pre-MRI Era", subtitle: "Blind Biopsy", year: "Before 2017" },
    { id: "mri-arrives" as Tab, label: "MRI Arrives", subtitle: "Seeing the Unseen", year: "2017 - PROMIS" },
    { id: "fusion-beyond" as Tab, label: "Fusion & Beyond", subtitle: "Vision to Precision", year: "2018+" },
  ]

  return (
    <div className="w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            The Imaging Revolution
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            How PCL evolved from one MRI scanner to a nationwide precision platform
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 md:px-8 py-4 md:py-5 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white/60 backdrop-blur-xl shadow-lg scale-105"
                  : "bg-white/30 backdrop-blur-md hover:bg-white/40"
              }`}
            >
              <div className="text-left">
                <div className="text-xs font-semibold text-teal-600 mb-1">{tab.year}</div>
                <div className="text-base md:text-lg font-bold text-slate-800">{tab.label}</div>
                <div className="text-xs md:text-sm text-slate-600">{tab.subtitle}</div>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border-2 border-teal-400 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]"
          >
            {activeTab === "pre-mri" && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative order-2 md:order-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/aboutus/trus.png"
                      alt="Pre-MRI blind biopsy - TRUS ultrasound"
                      width={600}
                      height={400}
                      className="w-full h-auto opacity-80"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white text-sm italic">Before MRI, we were working in the dark</p>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Pre-MRI Era: The Age of Blind Biopsy
                  </h3>
                  
                  <div className="space-y-3 text-slate-700 leading-relaxed">
                    <p className="text-base">
                      Before 2017, prostate diagnosis relied on PSA tests and <strong>blind TRUS biopsy</strong>. That grey dot? Cancer. The blue markers? Random needle positions fired blindly, hoping to hit something.
                    </p>

                    <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📍</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-emerald-900 mb-1 text-sm">What PCL Was Doing (2009)</h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Founded on <strong>Queen Anne Street, London</strong> with a 3 Tesla MRI scanner. We were building world-class imaging protocols for MSK and neurology cases.
                          </p>
                          <p className="text-sm text-slate-700">
                            Around the corner, Professor Emberton's team at UCLH was researching focal therapy for prostate cancer. They needed <strong>high-fidelity 3T imaging</strong> — and we had it. That partnership changed everything.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mri-arrives" && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    MRI Arrives: Seeing the Unseen
                  </h3>
                  
                  <div className="space-y-3 text-slate-700 leading-relaxed">
                    <p className="text-base">
                      The <strong>2017 PROMIS trial</strong>, led by Professor Emberton's team at UCL, proved that multiparametric MRI could <em>see</em> prostate cancer before any needle touched the patient. Diffusion imaging + dynamic contrast = disease mapping without biopsy.
                    </p>

                    <div className="bg-gradient-to-br from-blue-900 to-teal-900 text-white rounded-xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="text-3xl">📄</div>
                        <div>
                          <h4 className="text-lg font-bold text-cyan-300">PROMIS Trial</h4>
                          <p className="text-xs text-cyan-100">January 2017 - UK Research Paper of the Year</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-100 mb-2">
                        Demonstrated that <strong>mpMRI pre-biopsy</strong> outperformed standard methods, establishing a new global standard of care for prostate cancer diagnostics.
                      </p>
                      <div className="bg-emerald-500/20 rounded-lg p-2">
                        <p className="text-xs text-emerald-50 font-semibold">"PROMIS proved we could see."</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🔬</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 mb-1 text-sm">What PCL Was Doing</h4>
                          <p className="text-sm text-slate-700 mb-1">
                            Our <strong>3T scanner</strong> was one of the few in the UK capable of delivering research-grade multiparametric sequences with the precision needed for PROMIS.
                          </p>
                          <p className="text-sm text-slate-700">
                            We worked with Dr Clare Allen and the UCLH team, perfecting imaging protocols that would later become the UK standard for prostate MRI reporting (PI-RADS).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/aboutus/secondpage.png"
                      alt="Professor Mark Emberton and research team"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fusion-beyond" && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative order-2 md:order-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto"
                    >
                      <source src="/aboutus/mri.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Fusion & Beyond: From Vision to Precision
                  </h3>
                  
                  <div className="space-y-3 text-slate-700 leading-relaxed">
                    <p className="text-base">
                      The <strong>2018 PRECISION trial</strong> fused MRI with real-time ultrasound — turning vision into <em>guidance</em>. MRI-targeted biopsy outperformed random sampling by 30%. The imaging-led pathway was born.
                    </p>

                    <div className="bg-gradient-to-br from-teal-900 to-blue-900 text-white rounded-xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="text-3xl">🎯</div>
                        <div>
                          <h4 className="text-lg font-bold text-teal-300">PRECISION Trial</h4>
                          <p className="text-xs text-teal-100">March 2018</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-100">
                        Proved that using MRI to identify suspicious lesions and performing <strong>image-guided targeted biopsy</strong> led to more clinically significant cancer detection than traditional methods.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-orange-900 mb-1 text-sm">What PCL Is Doing Today</h4>
                          <p className="text-sm text-slate-700 mb-1">
                            We transformed academic breakthroughs into everyday practice. From <strong>one MRI scanner</strong> to a <strong>nationwide mobile service</strong> — 95 hospitals, 100+ surgeons, 4,000+ procedures.
                          </p>
                          <p className="text-sm text-slate-700">
                            Equipment transport, Dr Allen's pre-procedure contouring, on-site fusion specialists, post-procedure reporting. Turnkey precision — everywhere it's needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
