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
        Multiparametric MRI Contouring: Six Views, One Volume
      </h2>
      <p className="text-center text-gray-700 text-sm mb-4 max-w-4xl mx-auto">
        <strong>Traditional approach:</strong> Surgeons review a single MRI scan and estimate biopsy targets.
      </p>
      <p className="text-center text-gray-700 text-sm mb-8 max-w-4xl mx-auto">
        <strong>With PCL:</strong> Dr. Allen accesses <strong>six different MRI sequence views</strong> of the same anatomical plane - T2-weighted, ADC, diffusion, vascularity patterns - to contour lesions with millimeter precision. The plan is ready, no cognitive estimation needed.
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
        <p className="text-sm font-semibold mb-2">Why Multiparametric MRI Matters</p>
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
      <main className="pt-32 sm:pt-36 lg:pt-40 pb-20">
        
        {/* Hero Section - Split Layout */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  MRI Fusion Planning & Contouring
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Expert radiologist-led targeting plans delivered before your procedure day. Dr Clare Allen's multiparametric MRI analysis creates millimeter-accurate coordinates for fusion biopsy or HIFU.
                </p>
                <div className="space-y-3 text-slate-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Consultant radiologist expertise with 20+ years in prostate mpMRI</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Virtual fusion alignment and grid planning completed in advance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ready-to-use targeting coordinates for immediate procedure start</span>
                  </div>
                </div>
              </div>

              {/* Right: MRI Planning Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/biopsy/cont.png"
                    alt="MRI fusion planning and contouring process"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom py-16">

          {/* Interactive MRI Viewer */}
          <section className="mb-20">
            <MultiparametricMRIViewer />
          </section>

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
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Part A: Virtual Probe Positioning
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Dr. Allen positions a virtual ultrasound probe and biopsy grid in the MRI space. The cyan overlay shows the planned probe angle and grid coordinates for systematic sampling.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Green outline</strong> = Prostate gland boundary from MRI</span>
                    </li>
                    <li className="flex gap-2">
                      <svg className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Cyan overlay</strong> = Virtual probe and biopsy grid</span>
                    </li>
                    <li className="flex gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
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
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                    Part B: MRI Fusion to Virtual Ultrasound
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The MRI-contoured targets are fused to the virtual ultrasound view. Green contours show the planned biopsy targets ready to be matched on procedure day.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Green contours</strong> = MRI-identified lesions</span>
                    </li>
                    <li className="flex gap-2">
                      <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Grayscale view</strong> = Virtual ultrasound field</span>
                    </li>
                    <li className="flex gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Cyan dots</strong> = Grid reference points for alignment</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-emerald-100 rounded-lg p-3">
                    <p className="text-xs text-emerald-900 font-semibold">
                      This fusion plan is created days before your procedure. On the day, our Application Specialist loads this plan and matches it to live ultrasound.
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
