"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState, useEffect } from "react"

function MultiparametricMRIViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mriSequences = [
    {
      image: "/NEW/1.png",
      title: "Multiparametric MRI View 1",
      description: "Six different MRI sequences accessible for precision contouring - T2-weighted, ADC maps, diffusion, vascularity, and more"
    },
    {
      image: "/NEW/2.png",
      title: "Multiparametric MRI View 2",
      description: "Same anatomical plane, different sequences reveal different tissue characteristics for expert lesion identification"
    },
    {
      image: "/NEW/3.png",
      title: "Multiparametric MRI View 3",
      description: "Dr. Allen views all sequences simultaneously to identify targets with precision, creating detailed fusion plans"
    }
  ]

  // Auto-cycle through images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mriSequences.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
        📊 Multiparametric MRI Contouring: 6 Views, One Volume
      </h2>
      <p className="text-center text-gray-700 text-sm mb-4 max-w-4xl mx-auto">
        <strong>Normally:</strong> Surgeons look at a single MRI scan and cognitively estimate biopsy targets.
      </p>
      <p className="text-center text-gray-700 text-sm mb-8 max-w-4xl mx-auto">
        <strong>With PCL:</strong> Dr. Allen accesses <strong>six different MRI sequence views</strong> of the same anatomical plane - T2-weighted, ADC, diffusion, vascularity patterns - to contour lesions with millimeter precision. The plan is ready, no cognitive fusion needed.
      </p>

      <div className="relative w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <div className="relative w-full h-[600px]">
            {mriSequences.map((seq, idx) => (
              <div 
                key={idx} 
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                style={{ opacity: idx === currentIndex ? 1 : 0 }}
              >
                <Image
                  src={seq.image}
                  alt={seq.title}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
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
            <p className="text-sm text-gray-700 text-center">
              {mriSequences[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4">
        <p className="text-sm font-semibold mb-2">💡 Why Multiparametric MRI Matters</p>
        <p className="text-xs text-purple-50">
          <strong>Vascularity patterns</strong> distinguish active cancer (new chaotic blood vessels) from old scar tissue or previous ablation sites. 
          Combined with ADC maps and T2-weighted images, Dr. Allen precisely identifies and contours targets - giving you millimeter-accurate biopsy coordinates.
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
              MRI/US Fusion Planning
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Expert pre-procedure MRI contouring and virtual fusion planning. Dr. Clare Allen creates millimeter-accurate targeting plans for biopsy or HIFU procedures - ready before you step into theatre.
            </p>
          </div>

          {/* Interactive MRI Viewer */}
          <div className="mb-16">
            <MultiparametricMRIViewer />
          </div>

          {/* Dr Clare Allen - Lead Contouring Specialist */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg border border-green-200">
              <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
                Expert MRI Contouring by Dr Clare Allen
              </h2>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Image
                      src="/surgeons/ca.png"
                      alt="Dr Clare Allen"
                      width={300}
                      height={300}
                      className="w-full h-auto rounded-xl mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr Clare Allen</h3>
                    <p className="text-lg font-medium mb-2" style={{ color: "var(--color-medical-green)" }}>
                      Consultant Radiologist - Lead Contouring Specialist
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Oxford Graduate, UCL Uro-Radiology Lead Consultant</p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Background & Expertise</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Dr Allen qualified from Oxford and is the uro-radiology lead consultant at UCL. She has pioneered the use of mpMRI imaging for prostate cancer since 2000 and has led the establishment of reporting standards for prostate cancer imaging in the UK and internationally. She was lead radiologist on the Promise Trial which proved the efficacy of mpMRI for prostate cancer globally.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Contouring Process</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Once our service is booked, Dr Clare Allen sets up the biopsy plans for each patient, prior to
                        the procedure. Using the MRI report from your local radiologist, Dr Allen adds her expert
                        knowledge to identify all areas of suspicion. The biopsy plan is then created using specialist
                        contouring software.
                      </p>
                      <div className="bg-white rounded-xl p-6 border border-green-200">
                        <p className="text-gray-700 text-sm italic mb-4">
                          "The fusion software allows me to view the T2, the dynamically enhanced and the high B value
                          scans, plus the ADC map simultaneously. I can contour the targets using whichever images
                          best show the lesion. I create the biopsy plan, aligning the contouring with the virtual
                          template and adjusting the angle to match the ultrasound probe position during the biopsy
                          procedure."
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          The plan is then sent to the Application Specialists, ready for use in theatres.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Key Expertise Areas</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-gray-700">Expert contouring using specialist software</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-gray-700">MRI report analysis and target identification</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-gray-700">Biopsy plan creation with virtual template alignment</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-gray-700">Ultrasound probe position matching during procedures</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Planning Workflow */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>
              Virtual Grid Alignment & Target Planning
            </h2>

            {/* Part A: Virtual Probe & Grid Setup */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/NEW/vritualprobe-biopsygrid.png"
                    alt="Virtual probe positioning with biopsy grid overlay"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                  <div className="text-4xl mb-4">📐</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Part A: Virtual Probe Positioning
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Dr. Allen positions a virtual ultrasound probe and biopsy grid in the MRI space. The cyan overlay shows the planned probe angle and grid coordinates for systematic sampling.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Green outline</strong> = Prostate gland boundary from MRI</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-600 font-bold">✓</span>
                      <span><strong>Cyan overlay</strong> = Virtual probe and biopsy grid</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Grid pattern</strong> = Systematic sampling coordinates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Part B: MRI Fusion to Ultrasound */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border border-emerald-200">
                  <div className="text-4xl mb-4">🔗</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Part B: MRI Fusion to Virtual Ultrasound
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The MRI-contoured targets are fused to the virtual ultrasound view. Green contours show the planned biopsy targets ready to be matched on procedure day.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Green contours</strong> = MRI-identified lesions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-600 font-bold">✓</span>
                      <span><strong>Grayscale view</strong> = Virtual ultrasound field</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Cyan dots</strong> = Grid reference points for alignment</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-emerald-100 rounded-lg p-3">
                    <p className="text-xs text-emerald-900 font-semibold">
                      💡 This fusion plan is created days before your procedure. On the day, our Application Specialist loads this plan and matches it to the live ultrasound.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
                  <Image
                    src="/NEW/MRI_to-US_fusion.png"
                    alt="MRI targets fused to virtual ultrasound view showing green contoured lesions"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Evidence: Why MRI Fusion Matters */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-12 mb-16 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              📊 Clinical Evidence: From Blind Sampling to Precision Targeting
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              Traditional prostate biopsy involved spreading 10-12 needles blindly across the gland, hoping to hit cancer. MRI fusion changed everything - we moved from <strong>blind deployment to precise targeting</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-emerald-200">
                <div className="text-5xl mb-3 text-center">50% vs 35%</div>
                <h3 className="text-lg font-bold text-center mb-3 text-emerald-900">Detection Rate</h3>
                <p className="text-sm text-gray-700 text-center">
                  MRI fusion biopsy achieves <strong>50% detection rate for clinically significant prostate cancer</strong> vs 35% for systematic biopsy alone (PI-RADSv2 ≥3)
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  SpringerLink study, 1,229 biopsy sessions
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
                <div className="text-5xl mb-3 text-center">+41%</div>
                <h3 className="text-lg font-bold text-center mb-3 text-blue-900">High-Risk Detection</h3>
                <p className="text-sm text-gray-700 text-center">
                  Targeted MRI fusion biopsy diagnoses <strong>41% more high-risk prostate cancers</strong> compared to standard systematic biopsy (RR=1.41)
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Meta-analysis: 26 studies, 5,831 patients
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
                <div className="text-5xl mb-3 text-center">86%</div>
                <h3 className="text-lg font-bold text-center mb-3 text-purple-900">Avoid Unnecessary Biopsies</h3>
                <p className="text-sm text-gray-700 text-center">
                  In men with <strong>negative MRI, 86% safely avoided biopsy</strong> over 3 years with only 4% developing clinically significant cancer
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  JAMA Oncology cohort: 593 biopsy-naïve men
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 text-center">🎯 Better Differentiation = Better Treatment Decisions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-blue-50 mb-2">
                    <strong>Aggressive vs Indolent Tumors:</strong> High-resolution mpMRI imaging allows clearer distinction between cancers that require immediate treatment and slow-growing ones suitable for active surveillance.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-50">
                    <strong>Reduced Over-Treatment:</strong> Avoiding treatment for slow-growing tumors that may never require intervention, while ensuring aggressive cancers are caught early and treated appropriately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What Makes This Planning Special */}
          <div className="bg-gradient-to-br from-blue-900 to-emerald-900 text-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Expert Pre-Procedure Planning Matters</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-xl font-bold mb-3">Expert Radiologist Contouring</h3>
                <p className="text-sm text-blue-100">
                  Dr. Clare Allen - UK pioneer in mpMRI for prostate cancer - interprets multiparametric sequences and contours targets with 20+ years of specialized expertise.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🔗</div>
                <h3 className="text-xl font-bold mb-3">Virtual Fusion Pre-Alignment</h3>
                <p className="text-sm text-blue-100">
                  Targets aligned to virtual ultrasound probe and template grid BEFORE your procedure day - no rushing, no cognitive guesswork in theatre.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">📐</div>
                <h3 className="text-xl font-bold mb-3">Ready-to-Use Targeting Plan</h3>
                <p className="text-sm text-blue-100">
                  Walk into theatre with precise coordinates already calculated. Your Application Specialist loads the plan - you proceed straight to sampling.
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
              All Your Secretary Needs to Do Is Call Us
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We handle imaging transfer, expert contouring, virtual fusion planning, and on-site technical support. You walk into theatre with the plan ready - no operational burden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all inline-block"
              >
                Get Started
              </a>
              <a
                href="/services"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-block"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
