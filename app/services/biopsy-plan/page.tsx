"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"

function MultiparametricMRIViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mriSequences = [
    {
      title: "Initial Anatomical T2-Weighted",
      vascularity: "/biopsy/mini1.png",
      anatomical: "/biopsy/big1.png",
      description: "Baseline T2-weighted imaging shows prostate anatomy. Subtle areas of concern identified."
    },
    {
      title: "ADC Map + Diffusion Analysis",
      vascularity: "/biopsy/mini2.png",
      anatomical: "/biopsy/big2.png",
      description: "ADC (Apparent Diffusion Coefficient) map reveals restricted diffusion. Red contouring begins on suspicious lesion."
    },
    {
      title: "Complete Multiparametric Assessment",
      vascularity: "/biopsy/mini3.png",
      anatomical: "/biopsy/big3.png",
      description: "Full multiparametric analysis complete. Vascularity patterns confirm active tumor (new blood vessels) vs old ablated tissue. Final red contour defines biopsy target."
    }
  ]

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.deltaY > 0 && currentIndex < mriSequences.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
        📊 Multiparametric MRI Contouring: Finding the Cancer
      </h2>
      <p className="text-center text-gray-700 text-sm mb-4 max-w-4xl mx-auto">
        <strong>Normally:</strong> Surgeons look at an MRI scan and cognitively do the biopsy, or to be safe, take many cores blindly.
      </p>
      <p className="text-center text-gray-700 text-sm mb-4 max-w-4xl mx-auto">
        <strong>With PCL:</strong> Surgeon views multiparametric imaging in MIM (diffusion/vascularity), Dr. Allen contours lesions with incredible precision using the virtual probe, creating a detailed biopsy plan. No cognitive fusion needed - the plan is ready on a plate.
      </p>
      <p className="text-center text-purple-900 font-semibold text-sm mb-8">
        Scroll through the sequence below to see Dr. Allen's expert multiparametric contouring ↓
      </p>

      <div className="grid lg:grid-cols-2 gap-6" onWheel={handleWheel}>
        {/* Left: Vascularity/ADC Maps */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <h3 className="text-sm font-bold mb-3 text-purple-900">ADC/Vascularity Mapping</h3>
          <div className="h-[500px] flex items-center justify-center relative">
            {mriSequences.map((seq, idx) => (
              <div 
                key={idx} 
                className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-500"
                style={{ opacity: idx === currentIndex ? 1 : 0, zIndex: idx === currentIndex ? 10 : 0 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={seq.vascularity}
                    alt={`${seq.title} - Vascularity map`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            🌈 Scroll to navigate through MRI sequences
          </p>
        </div>

        {/* Right: Anatomical with Contours */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <h3 className="text-sm font-bold mb-3 text-red-900">Anatomical + Target Contouring</h3>
          <div className="h-[500px] flex items-center justify-center relative">
            {mriSequences.map((seq, idx) => (
              <div 
                key={idx} 
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                style={{ opacity: idx === currentIndex ? 1 : 0, zIndex: idx === currentIndex ? 10 : 0 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={seq.anatomical}
                    alt={`${seq.title} - Anatomical with contour`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            🔴 Red contour appears as analysis progresses
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          {mriSequences.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-12 bg-purple-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <p className="font-semibold text-sm text-purple-900 mb-1">
            Step {currentIndex + 1}: {mriSequences[currentIndex].title}
          </p>
          <p className="text-xs text-gray-600">
            {mriSequences[currentIndex].description}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4">
        <p className="text-sm font-semibold mb-2">💡 Why Multiparametric MRI Matters</p>
        <p className="text-xs text-purple-50">
          <strong>Vascularity patterns</strong> distinguish active cancer (new chaotic blood vessels) from old scar tissue or previous ablation sites. 
          Combined with ADC maps and T2-weighted images, radiologists can precisely identify and contour the target - giving you millimeter-accurate biopsy coordinates.
        </p>
      </div>
    </div>
  )
}

export default function BiopsyPlanPage() {
  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              MRI Fusion Biopsy Planning
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Expert MRI contouring and systematic grid-based targeting. Every lesion mapped, every core tracked, every sample reproducible.
            </p>
          </div>

          {/* Interactive MRI Viewer */}
          <div className="mb-16">
            <MultiparametricMRIViewer />
          </div>

          {/* The Clinical Workflow - Visual Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>
              From MRI to Needle: The Precision Targeting Workflow
            </h2>

            {/* Step 1: Grid Overlay with MRI Target */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/precision_niopsy/Screenshot 2025-10-22 202621.png"
                    alt="Template grid with MRI fusion overlay showing target lesion"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-8 border border-blue-200">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Step 1: Grid-Based MRI Fusion
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The expertly contoured MRI lesion (green) is overlaid onto the transperineal template grid. Each coordinate (A-G, 1-7) represents a precise sampling location.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Green contour</strong> = MRI-identified target lesion</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Grid coordinates</strong> = Systematic sampling map</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 font-bold">✓</span>
                      <span><strong>Crosshairs</strong> = Real-time needle guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: 3D Spatial Targeting */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
                  <div className="text-4xl mb-4">📐</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Step 2: 3D Spatial Visualization
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Real-time 3D ultrasound view shows the spatial relationship between MRI contours and live anatomy. Multiple colored regions indicate different zones and risk levels.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">●</span>
                      <span><strong>Red</strong> = High-grade lesion target</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600 font-bold">●</span>
                      <span><strong>Green</strong> = Peripheral zone margins</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-yellow-600 font-bold">●</span>
                      <span><strong>Yellow</strong> = Transition zone / benign areas</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-600 font-bold">●</span>
                      <span><strong>White outline</strong> = Prostate capsule boundary</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/fusion-workflow/uss_w_6dof.png"
                    alt="3D ultrasound view with 6-degree-of-freedom positioning and MRI fusion contours"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Systematic Sampling Pattern */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/precision_niopsy/Screenshot 2025-10-22 202806.png"
                    alt="Sequential targeting showing systematic biopsy pattern with grid coordinates"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-orange-200">
                  <div className="text-4xl mb-4">🧬</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Step 3: Capture Heterogeneity
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Systematic sampling through multiple grid positions ensures we capture the full spectrum of tumor heterogeneity - critical for accurate Gleason grading.
                  </p>
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-800 font-medium mb-2">Why Systematic Sampling Matters:</p>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      <li>• Prostate cancer is spatially heterogeneous</li>
                      <li>• Single cores can miss grade variation</li>
                      <li>• Grid-based patterns maximize diagnostic yield</li>
                      <li>• Every core is mapped and reproducible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Hands-On Execution */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Step 4: Expert On-Site Support
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Our Application Specialists handle the complex setup, manage the fusion overlay, and track every core in real-time - so you can focus on the patient.
                  </p>
                  <div className="bg-emerald-600 text-white rounded-lg p-4">
                    <p className="font-semibold mb-2">✨ The PCL Difference</p>
                    <p className="text-sm text-emerald-50">
                      From MRI contouring to post-procedure reporting, we handle the technical complexity. You get precision targeting without the operational burden.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/fusion-workflow/surgeon-at-work.jpg"
                    alt="Surgeon performing fusion biopsy with Application Specialist support"
                    width={1200}
                    height={1600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* The 6-Degree-of-Freedom Precision System */}
          <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-emerald-900 text-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">The Perfect Hard-Linked System: 6 Degrees of Freedom</h2>
            <p className="text-center text-blue-100 mb-8 max-w-3xl mx-auto">
              This isn't guesswork. It's a precision-engineered system where every component links together to deliver millimeter-accurate targeting - from MRI contour to needle tip.
            </p>

            <div className="bg-white rounded-xl p-2 mb-8">
              <Image
                src="/biopsy/finish.png"
                alt="6-degree-of-freedom stepper system showing axial grid, 3D spatial view, and multi-axis positioning"
                width={1600}
                height={1200}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">🎯 Top Views: The "Impossible" Shots Made Possible</h3>
                <p className="text-sm text-blue-100 mb-3">
                  <strong>Left (Grid Template):</strong> Axial view shows the target (red) overlaid on systematic grid coordinates. Crosshairs guide needle placement.
                </p>
                <p className="text-sm text-blue-100">
                  <strong>Right (3D Spatial):</strong> Real-time ultrasound with MRI fusion contours (red = lesion, yellow = transition zone, green = margins). 
                  See the needle path BEFORE you sample - anterior lesions, apical zones, even tiny targets become accessible.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">📐 Bottom: 6 Axes of Precision Control</h3>
                <p className="text-sm text-blue-100 mb-3">
                  The stepper controls movement in <strong>6 dimensions</strong>:
                </p>
                <ul className="text-xs text-blue-50 space-y-1.5">
                  <li>• <strong className="text-red-300">Red (Back/Forward):</strong> Anterior-posterior translation</li>
                  <li>• <strong className="text-green-300">Green (Left/Right):</strong> Lateral translation</li>
                  <li>• <strong className="text-blue-300">Blue (Up/Down):</strong> Superior-inferior translation</li>
                  <li>• <strong className="text-yellow-300">Yellow:</strong> Pitch rotation</li>
                  <li>• <strong className="text-pink-300">Pink:</strong> Yaw rotation</li>
                  <li>• <strong className="text-cyan-300">Cyan:</strong> Roll rotation</li>
                </ul>
                <p className="text-xs text-blue-100 mt-3">
                  This multi-axis control means the needle can approach from ANY angle while keeping the prostate perfectly immobilized - no bending, no drift.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 border-2 border-white/30">
              <h3 className="text-2xl font-bold mb-4 text-center">⚙️ The Hard-Linked Chain of Precision</h3>
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">🧲</div>
                  <p className="text-xs font-semibold">MRI Acquisition</p>
                  <p className="text-xs text-blue-50">Multiparametric sequences identify cancer</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-2xl">→</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎨</div>
                  <p className="text-xs font-semibold">Expert Contouring</p>
                  <p className="text-xs text-blue-50">Radiologist defines precise target boundaries</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-2xl">→</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🔗</div>
                  <p className="text-xs font-semibold">Fusion Alignment</p>
                  <p className="text-xs text-blue-50">MRI overlaid on live ultrasound</p>
                </div>
              </div>
              <div className="flex justify-center my-3">
                <div className="text-2xl">↓</div>
              </div>
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">📐</div>
                  <p className="text-xs font-semibold">Grid Coordinates</p>
                  <p className="text-xs text-blue-50">A1, B3, C5 systematic mapping</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-2xl">→</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="text-xs font-semibold">Rigid Immobilization</p>
                  <p className="text-xs text-blue-50">6-DOF stepper prevents deformation</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-2xl">→</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">💉</div>
                  <p className="text-xs font-semibold">Needle Delivery</p>
                  <p className="text-xs text-blue-50">Sub-millimeter accuracy to target</p>
                </div>
              </div>
              
              <div className="mt-6 bg-white/20 rounded-lg p-4 border border-white/30">
                <p className="text-center font-bold text-lg mb-2">🏆 Excellence in Precision, End to End</p>
                <p className="text-center text-sm text-blue-50">
                  Every link in this chain is critical. Miss one step, and accuracy suffers. Perfect all of them, and you capture the cancer that matters - reproducibly, reliably, every time.
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Benefits Summary */}
          <div className="bg-gradient-to-br from-blue-900 to-emerald-900 text-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why This System Delivers Superior Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">🔒 No Drift, No Guessing</h3>
                <p className="text-sm text-blue-100">
                  Rigid stepper immobilization means the prostate can't bend or shift. MRI fusion overlay stays pixel-perfect throughout the entire procedure.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">📍 Every Core Tracked</h3>
                <p className="text-sm text-blue-100">
                  Grid coordinates (A1, B3, etc.) mean every sample location is precisely documented, reproducible for follow-up, and auditable.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">🎯 Impossible Shots Made Routine</h3>
                <p className="text-sm text-blue-100">
                  6 degrees of freedom positioning reaches anterior lesions, apical zones, and tiny targets that freehand approaches struggle with.
                </p>
              </div>
            </div>
          </div>

          {/* Post-Procedure Report: Targeting Accuracy */}
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 mb-16 border-2 border-emerald-200">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
              📊 Your Targeting Accuracy Report
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              After each procedure, surgeons receive a detailed report showing <strong>exactly how well they met their targets</strong> - quantifying accuracy, documenting sampling coverage, and providing objective evidence of diagnostic quality.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-emerald-900">📍 What's Included</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Target Hit Rate:</strong> Percentage of MRI targets successfully sampled</li>
                  <li>• <strong>Grid Coverage Map:</strong> Visual confirmation of systematic sampling</li>
                  <li>• <strong>Lesion Coordinates:</strong> A1, B3, etc. - reproducible for follow-up</li>
                  <li>• <strong>3D Spatial Visualization:</strong> MRI fusion overlay with needle paths</li>
                  <li>• <strong>Core-by-Core Documentation:</strong> Depth, angle, target accuracy per sample</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-cyan-900">🎯 Why It Matters</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Patient Communication:</strong> Show patients exactly what was sampled</li>
                  <li>• <strong>MDT Evidence:</strong> Objective data for multidisciplinary discussions</li>
                  <li>• <strong>Quality Assurance:</strong> Track targeting performance over time</li>
                  <li>• <strong>Audit Trail:</strong> Complete documentation for clinical governance</li>
                  <li>• <strong>Reproducibility:</strong> Future biopsies can reference exact locations</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl p-4">
              <p className="text-center text-sm font-semibold">
                ✨ No guesswork. No assumptions. Just objective evidence of diagnostic excellence.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Ready for Precision Targeting?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Discover how our expert MRI fusion planning and on-site support can enhance your diagnostic capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all inline-block"
              >
                Request Service
              </a>
              <a
                href="/services/freehand-fusion"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-block"
              >
                Learn More About Fusion
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
