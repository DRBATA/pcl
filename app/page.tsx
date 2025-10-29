import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prostate Care Limited | Specialist Equipment & Managed Services',
  description: 'Advanced ultrasound and HIFU equipment rental for healthcare providers. Fully managed MRI/US fusion biopsy and focal therapy services with on-site support.',
  keywords: 'prostate biopsy, HIFU, ultrasound rental, MRI fusion, bkFusion, Navigo, Sonablate, Ablatherm, surgical equipment',
  openGraph: {
    title: 'Prostate Care Limited | Specialist Equipment & Managed Services',
    description: 'Advanced ultrasound and HIFU equipment rental for healthcare providers',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="h-screen overflow-y-auto md:snap-y md:snap-proximity">
        
        {/* Hero Section with Image */}
        <section className="relative snap-start min-h-screen flex flex-col">
          <div className="relative flex-1 flex flex-col">
            {/* Hero Image */}
            <div className="absolute inset-0">
              <Image
                src="/landing/hero.png"
                alt="Medical equipment and healthcare professionals"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative h-full flex items-center py-12 pt-32">
              <div className="container-custom">
                <div className="max-w-4xl text-left text-white">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                    Coordinated MRI contouring, fusion biopsy, HIFU, and follow-up
                  </h1>
                  <p className="text-xl sm:text-2xl mb-4 leading-relaxed">
                    Complete with theatre equipment setup and take down,
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    Application assistant support for image alignment and technical onsite expertise
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
          
          {/* Green bottom border matching header */}
          <div className="h-1 bg-emerald-600" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Section 1: About & How It Works - DARK */}
        <section className="relative snap-start min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center py-20">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Understanding Our Approach
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Prostate Care Limited delivers comprehensive equipment and expert support to healthcare facilities across the UK
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* About Us Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">About Prostate Care Limited</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    We partner with hospitals and medical facilities to provide cutting-edge ultrasound, HIFU technology, and comprehensive surgical support services for prostate care procedures.
                  </p>
                  <Link 
                    href="/about/pcl"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium group/link"
                  >
                    Learn more about us
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

                {/* How It Works Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    From equipment delivery and theatre setup to technical support and post-procedure coordination, we handle every aspect so your team can focus on patient care.
                  </p>
                  <Link 
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium group/link"
                  >
                    See our process
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Section 2: Clinicians & Equipment - LIGHT */}
        <section className="relative snap-start min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center py-20">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
                  Advanced Resources for Healthcare Professionals
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Supporting surgical teams with expert clinicians and state-of-the-art medical equipment
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Clinicians Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Specialist Clinicians</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Access to experienced application specialists and clinical experts who provide on-site support, training, and technical guidance throughout procedures.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">MRI contouring & image alignment expertise</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">On-site technical support during procedures</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Training and workflow optimization</span>
                    </div>
                  </div>
                  <Link 
                    href="/clinicians"
                    className="inline-flex items-center gap-2 font-medium group/link"
                    style={{ color: "var(--color-medical-green)" }}
                  >
                    Meet our clinical team
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

                {/* Equipment Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Cutting-Edge Equipment</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Comprehensive range of ultrasound systems, HIFU devices, and MRI/US fusion technology available for rental or managed service arrangements.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">bkFusion, Navigo, bk5000 ultrasound systems</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Ablatherm & Sonablate HIFU technology</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Full setup, maintenance, and support included</span>
                    </div>
                  </div>
                  <Link 
                    href="/equipment"
                    className="inline-flex items-center gap-2 font-medium group/link"
                    style={{ color: "var(--color-medical-green)" }}
                  >
                    Explore our equipment
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 opacity-60" style={{ color: "var(--color-medical-green)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Section 3: End-to-End Service - DARK (Footer Style) */}
        <section className="snap-start min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center py-20 border-t border-emerald-600/30">
          <div className="container-custom flex-1">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-emerald-600/20 rounded-full mb-6">
                  <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Complete Solution</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  End-to-End Managed Service
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  From MRI contouring to follow-up coordination, we manage every step of the patient journey
                </p>
              </div>

              {/* Service Steps */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Pre-Procedure</h3>
                  <p className="text-slate-400 text-sm">
                    MRI contouring, image alignment, equipment delivery & theatre setup
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">During Procedure</h3>
                  <p className="text-slate-400 text-sm">
                    On-site technical support, application assistance & real-time troubleshooting
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Post-Procedure</h3>
                  <p className="text-slate-400 text-sm">
                    Equipment teardown, follow-up coordination & comprehensive documentation
                  </p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Our Managed Service?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">No Capital Investment</h4>
                      <p className="text-slate-400 text-sm">Access advanced technology without purchasing equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Expert Support</h4>
                      <p className="text-slate-400 text-sm">Experienced specialists on-site for every procedure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Flexible Scheduling</h4>
                      <p className="text-slate-400 text-sm">Equipment and support available when you need it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Complete Coordination</h4>
                      <p className="text-slate-400 text-sm">We handle logistics from start to finish</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-slate-300 mb-6 text-lg">
                  Ready to streamline your prostate care procedures?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Get in touch
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link 
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    View all services
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
