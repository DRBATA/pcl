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
    <div className="w-full py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            The Imaging Revolution
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From a single MRI scanner to a nationwide precision platform
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]"
          >
            {activeTab === "pre-mri" && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative order-2 md:order-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/aboutus/ultrasound-blind-biopsy.png"
                      alt="Pre-MRI blind biopsy"
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
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    Pre-MRI Era: The Age of Blind Biopsy
                  </h3>
                  
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p>
                      Before 2017, prostate diagnosis relied on PSA tests and <strong>blind ultrasound biopsy</strong>. Clinicians could not see what they were targeting — procedures were random and often inconclusive.
                    </p>

                    <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-xl p-5 border border-emerald-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📍</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-emerald-900 mb-1 text-sm">PCL Founded (2009)</h4>
                          <p className="text-sm text-slate-700">
                            Established on Queen Anne Street in London, mastering 3T MRI — unknowingly developing expertise that would redefine prostate diagnostics.
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
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    MRI Arrives: Seeing the Unseen
                  </h3>
                  
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p>
                      The <strong>2017 PROMIS trial</strong>, led by Professor Mark Emberton's team at UCL, proved that multiparametric MRI could see what traditional biopsy could not.
                    </p>

                    <div className="bg-gradient-to-br from-blue-900 to-teal-900 text-white rounded-xl p-5">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="text-3xl">📄</div>
                        <div>
                          <h4 className="text-lg font-bold text-cyan-300">PROMIS Trial</h4>
                          <p className="text-xs text-cyan-100">January 2017</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-100 mb-2">
                        Demonstrated the value of <strong>mpMRI imaging pre-biopsy</strong>, establishing it as a new standard of care.
                      </p>
                      <div className="bg-emerald-500/20 rounded-lg p-2">
                        <p className="text-xs text-emerald-50 font-semibold">PROMIS proved we could see.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl p-5 border border-blue-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🔬</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 mb-1 text-sm">PCL's Role</h4>
                          <p className="text-sm text-slate-700">
                            Our MRI became one of the few able to deliver this level of image fidelity, supporting clinicians in early trials.
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
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    Fusion & Beyond: From Vision to Precision
                  </h3>
                  
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p>
                      The <strong>2018 PRECISION trial</strong> fused MRI with real-time ultrasound, turning vision into guidance — the birth of the imaging-led pathway.
                    </p>

                    <div className="bg-gradient-to-br from-teal-900 to-blue-900 text-white rounded-xl p-5">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="text-3xl">🎯</div>
                        <div>
                          <h4 className="text-lg font-bold text-teal-300">PRECISION Trial</h4>
                          <p className="text-xs text-teal-100">March 2018</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-100">
                        Using MRI to identify cancer and performing <strong>targeted biopsy</strong> led to more accurate diagnoses.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl p-5 border border-orange-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-orange-900 mb-1 text-sm">PCL's Evolution</h4>
                          <p className="text-sm text-slate-700">
                            From one scanner to a nationwide network — <strong>95 hospitals, 100 surgeons</strong>. Precision on the move.
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
