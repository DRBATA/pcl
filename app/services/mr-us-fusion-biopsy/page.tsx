"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { FusionVideoPlayer } from "./FusionVideoPlayer"

export default function FreehandFusionPageV2() {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 lg:pt-40 pb-20">
        
        {/* Hero Section - Split Layout */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  MRI/US Fusion Biopsy
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  On-site equipment setup, real-time fusion alignment, and Application Specialist support throughout your procedure. We manage the technical complexity - you focus on the patient.
                </p>
                <div className="space-y-3 text-slate-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Precision equipment delivery, setup, and calibration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time fusion alignment and needle tracking</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert Application Specialist support throughout procedure</span>
                  </div>
                </div>
              </div>

              {/* Right: Fusion Videos */}
              <FusionVideoPlayer musicPath="u/cm.mp3" />
            </div>
          </div>
        </section>

        <div className="container-custom py-16">

          {/* Two Approaches - Honest Comparison */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-16 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
              Two Proven Approaches to MRI Fusion
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Freehand Approach */}
              <div className="bg-white rounded-xl p-6 border-2 border-blue-300">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-blue-900">Freehand (TP Pivot Pro)</h3>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 italic">
                  Cognitive navigation with disposable needle guide - simple, fast, effective
                </p>

                {/* Video */}
                <div className="aspect-video w-full mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/kEkCO35X5PA"
                    title="TP Pivot Pro Freehand Fusion"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Minimal Setup</p>
                      <p className="text-xs text-gray-600">Disposable guide, no rigid template, quick to start</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Reduced Infection Risk</p>
                      <p className="text-xs text-gray-600">Transperineal approach significantly reduces sepsis and bleeding vs transrectal</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Full Prostate Access</p>
                      <p className="text-xs text-gray-600">Pivots ±20°, height adjustable, reaches anterior zones</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Minimized Punctures</p>
                      <p className="text-xs text-gray-600">Coaxial needle reduces perineal puncture sites</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Best For:</p>
                  <p className="text-xs text-blue-800">
                    Minimally invasive approach, reduced infection/antibiotic use, fast turnaround, targeted biopsies
                  </p>
                </div>
              </div>

              {/* Stepper Approach */}
              <div className="bg-white rounded-xl p-6 border-2 border-emerald-300">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-emerald-900">Stepper (EX3 Grid)</h3>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 italic">
                  Rigid grid-based systematic sampling - reproducible mapping with coordinates
                </p>

                {/* Video */}
                <div className="aspect-video w-full mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/g3qQb4zHu7c"
                    title="BK Medical Fusion Biopsy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">6 Degrees of Freedom</p>
                      <p className="text-xs text-gray-600">Precise positioning: X, Y, Z + pitch, yaw, roll</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Grid Coordinates (A-G, 1-7)</p>
                      <p className="text-xs text-gray-600">Every core location documented and reproducible</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Prostate Immobilization</p>
                      <p className="text-xs text-gray-600">No bending or drift - fusion stays accurate</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Systematic Patterns</p>
                      <p className="text-xs text-gray-600">3D sampling captures full tumor heterogeneity</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                  <p className="text-xs font-semibold text-emerald-900 mb-1">Best For:</p>
                  <p className="text-xs text-emerald-800">
                    Complex cases, reproducible mapping, capturing heterogeneity, research protocols
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border-2 border-gray-300">
              <p className="text-center text-gray-800 font-medium mb-2">
                🤝 <strong>Both approaches use MRI fusion. Both work excellently.</strong>
              </p>
              <p className="text-center text-sm text-gray-600">
                The choice depends on your clinical workflow, case complexity, and whether you need systematic coordinate mapping. We support both - you decide.
              </p>
            </div>
          </div>

          {/* Real-Time Fusion Alignment */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-16 border-2 border-purple-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Text Content */}
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                  Real-Time Fusion Alignment
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The live ultrasound view (right) shows the needle path in real-time, overlaid with MRI-contoured targets. You can see exactly where the needle is heading enabling access to discrete and otherwise difficult to obtain lessions.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">MRI Fusion Overlay</h3>
                      <p className="text-sm text-gray-600">Pre-planned targets (red contours) overlaid on live ultrasound</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Grid Coordinates</h3>
                      <p className="text-sm text-gray-600">Systematic sampling pattern with documented locations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Needle Path Visualization</h3>
                      <p className="text-sm text-gray-600">See the trajectory before sampling - no guesswork</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4">
                  <p className="text-sm font-semibold mb-2">The Application Specialist Manages This</p>
                  <p className="text-xs text-purple-50">
                    Our Application Specialist performs an initial fusion alignment check and displays the plan on screen. Your surgical team reviews the targets and confirms they're satisfied before proceeding.
                  </p>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-200">
                  <Image
                    src="/bigpics/mri/mat3.png"
                    alt="MRI fusion planning showing needle path visualization and target contouring"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-green-900 to-emerald-800 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Full Service Range</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              From precision biopsy to focal therapy—discover how HIFU treatment can complement your diagnostic pathway.
            </p>
            <a
              href="/services/hifu"
              className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Explore HIFU Treatment
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
