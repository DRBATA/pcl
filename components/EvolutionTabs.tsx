"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Tab = "early-era" | "promis" | "precision"

export function EvolutionTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("early-era")

  const tabs = [
    { id: "early-era" as Tab, label: "Early Imaging & Research Era", subtitle: "Building the Foundation", year: "2009-2017" },
    { id: "promis" as Tab, label: "PROMIS: The Breakthrough", subtitle: "MRI Becomes Standard", year: "January 2017" },
    { id: "precision" as Tab, label: "PRECISION & Image Fusion", subtitle: "Targeted Precision Nationwide", year: "March 2018 - Present" },
  ]

  return (
    <div className="w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            The Imaging Evolution
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            How PCL evolved from one 3T MRI scanner to a nationwide precision platform
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
            {activeTab === "early-era" && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Early Imaging & Research Era
                </h3>
                
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-base">
                    Prostate Care Limited was founded in 2009 as a specialist 3T MRI imaging centre on Queen Anne Street, London — initially serving the MSK and neurology communities.
                  </p>

                  <p className="text-base">
                    Very quickly, our 3T scanner caught the attention of research urologists at nearby UCLH, who were world leaders in developing an imaging-led pathway for prostate cancer management called <strong>focal therapy</strong>. This pathway encompassed both diagnostics (pre-biopsy mpMRI and image-guided biopsy) and treatment (HIFU).
                  </p>

                  <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-xl p-5 border border-emerald-200/50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🔬</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900 mb-2 text-sm">The Research Era</h4>
                        <p className="text-sm text-slate-700 mb-2">
                          During this era, multiparametric MRI could visualise prostate lesions with clarity, but it wasn't yet established as a standard step before biopsy.
                        </p>
                        <p className="text-sm text-slate-700">
                          PCL worked alongside the UCLH team and others running patient trials to prove the value of this new approach. We built relationships with leading urologists around the country, enabling them to offer their patients a non-invasive alternative to surgery and hospitals a day-case procedure.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 italic">
                    We were still gathering the evidence to change practice worldwide.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "promis" && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  PROMIS: The Breakthrough
                </h3>
                
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-base">
                    In January 2017, the results of the <strong>PROMIS Trial</strong> — a major UK-led study — proved that performing mpMRI before biopsy significantly improved the detection of clinically significant prostate cancer compared to standard methods.
                  </p>

                  <div className="bg-gradient-to-br from-blue-900 to-teal-900 text-white rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">📄</div>
                      <div>
                        <h4 className="text-lg font-bold text-cyan-300">The PROMIS Trial</h4>
                        <p className="text-xs text-cyan-100 mb-2">January 2017 - UK Research Paper of the Year</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-100 mb-3">
                      This landmark trial established <strong>mpMRI imaging as a new standard of care globally</strong>. Prostate Care Limited played a significant role in the PROMIS trial, with Dr Clare Allen's expert imaging and reporting forming a crucial part of the research.
                    </p>
                    <div className="bg-emerald-500/20 rounded-lg p-3">
                      <p className="text-sm text-emerald-50 font-semibold">
                        For the first time, there was definitive evidence: seeing the cancer on MRI before attempting to sample it changed everything.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-xl p-5 border border-amber-200/50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">❓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-2 text-sm">The Question Remained</h4>
                        <p className="text-sm text-slate-700">
                          How do we translate what we see on the MRI into accurate targeting during the biopsy procedure itself?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "precision" && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  PRECISION & Image Fusion
                </h3>
                
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-base">
                    In March 2018, the <strong>PRECISION Trial</strong> delivered the next breakthrough: MRI-targeted biopsy using image fusion detected more clinically significant cancers than the standard systematic approach used for 25 years.
                  </p>

                  <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-xl p-5 border border-purple-200/50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-900 mb-2 text-sm">What Is Image Fusion?</h4>
                        <p className="text-sm text-slate-700 mb-2">
                          Image fusion overlays the MRI directly onto live ultrasound during biopsy — showing the urologist exactly where suspicious lesions are in real-time.
                        </p>
                        <p className="text-sm text-slate-700">
                          PCL's multicentre analysis demonstrated that targeted biopsies alone maintain high detection of significant cancer while avoiding the overdetection of insignificant disease that doesn't need treatment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl p-5 border border-orange-200/50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🚀</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-900 mb-2 text-sm">PCL Today</h4>
                        <p className="text-sm text-slate-700 mb-3">
                          Today, PCL has evolved from one 3T scanner on Queen Anne Street to a nationwide mobile service supporting 100+ urologists across 95 hospitals.
                        </p>
                        <p className="text-sm text-slate-700 mb-3">
                          <strong>Our mission:</strong> Make imaging-led diagnostics and treatment available to all patients, clinicians, and hospitals in the UK.
                        </p>
                        <p className="text-sm text-slate-700">
                          Our dedicated team of application specialists brings the technology and expertise required for image-guided biopsy and HIFU directly to you — wherever you practice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-4 text-center">
                    <p className="text-base font-bold">
                      All men deserve access to precision diagnostics and nuanced care.
                    </p>
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
