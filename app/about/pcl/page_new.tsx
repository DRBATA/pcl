"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EvolutionTabs } from "@/components/EvolutionTabs"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from "react"

export default function AboutPCLPageNew() {
  const [currentTeamImage, setCurrentTeamImage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const clinicalTeamImages = isMobile
    ? ["/team/portrait/team_portrait_1.png", "/team/portrait/team_portrait_2.png", "/team/portrait/team_portrait_3.png", "/team/portrait/team_portrait_4.png", "/team/portrait/team_portrait_5.png"]
    : ["/team/landscape/team_landscape_1.png", "/team/landscape/team_landscape_2.png", "/team/landscape/team_landscape_3.png", "/team/landscape/team_landscape_4.png", "/team/landscape/team_landscape_5.png"]

  useEffect(() => {
    const interval = setInterval(() => setCurrentTeamImage((prev) => (prev + 1) % clinicalTeamImages.length), 4000)
    return () => clearInterval(interval)
  }, [clinicalTeamImages.length])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 80
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <main className="overflow-y-auto">
        {/* Hero */}
        <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/hero/harley.png" alt="Prestigious Harley Street medical district" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          <div className="relative h-full flex items-center py-8 pt-28 sm:pt-32">
            <div className="container-custom">
              <div className="max-w-2xl">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl">
                  <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--color-medical-green)" }}>Precision Prostate Pathways</p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">What the great centres <span style={{ color: "var(--color-medical-green)" }}>already do.</span></h1>
                  <p className="text-lg sm:text-xl text-gray-700 mb-6">Expert mpMRI contouring, fusion biopsy and 3D reports—delivered as a <strong>fully managed service</strong> on your site.</p>
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-6 border border-emerald-200">
                    <p className="text-sm text-gray-700"><strong style={{ color: "var(--color-medical-green)" }}>No capital investment.</strong> Complete precision prostate pathway, delivered wherever you operate.</p>
                  </div>
                  <Link href="#track-record" onClick={(e) => { e.preventDefault(); scrollToSection('track-record'); }} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    See our track record
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => scrollToSection('hospital-partners')} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce"><svg className="w-6 h-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></button>
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "var(--color-medical-green)" }} />
        </section>

        {/* Hospital Logos */}
        <section id="hospital-partners" className="bg-white py-12 border-t border-gray-200">
          <div className="container-custom">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wide">Delivering precision prostate pathways with leading UK hospital groups</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="h-12 opacity-80 hover:opacity-100 transition-opacity"><Image src="/hero/hca_logo.png" alt="HCA Healthcare" width={120} height={48} className="h-full w-auto object-contain" /></div>
              <div className="h-12 opacity-80 hover:opacity-100 transition-opacity"><Image src="/hero/spirelogo.png" alt="Spire Healthcare" width={120} height={48} className="h-full w-auto object-contain" /></div>
              <div className="h-12 opacity-80 hover:opacity-100 transition-opacity"><Image src="/hero/circlehealthlogo.png" alt="Circle Health Group" width={120} height={48} className="h-full w-auto object-contain" /></div>
              <div className="h-12 opacity-80 hover:opacity-100 transition-opacity"><Image src="/hero/newfoscotelogo.png" alt="The New Foscote Hospital" width={120} height={48} className="h-full w-auto object-contain" /></div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">Including The Princess Grace Hospital, Harley Street, and centres across the UK</p>
          </div>
        </section>

        {/* Why Choose PCL */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 border-t border-emerald-600/30">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Why Choose Prostate Care Limited</h2>
                <p className="text-xl text-slate-300">A complete precision prostate pathway delivered as a managed service—with no capital spend.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4"><svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                  <h3 className="text-xl font-bold text-white mb-3">Expert Clinical Support</h3>
                  <p className="text-sm text-slate-300">Application Specialists handle setup, fusion alignment, and real-time guidance throughout procedures.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4"><svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></div>
                  <h3 className="text-xl font-bold text-white mb-3">Radiologist-Led Contouring</h3>
                  <p className="text-sm text-slate-300">Specialist prostate MRI interpretation by experienced consultant radiologists including PROMISE Trial leadership.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4"><svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                  <h3 className="text-xl font-bold text-white mb-3">Complete Service Package</h3>
                  <p className="text-sm text-slate-300">From MRI transfer to post-procedure reporting—we handle the complexity so you can focus on patients.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Radiologists */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 border-t border-gray-200">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--color-medical-green)" }}>Meet the Team</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-200"><Image src="/surgeons/ca.png" alt="Dr Clare Allen" width={80} height={80} className="w-full h-full object-cover" /></div>
                    <div><h3 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h3><p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>Consultant Uroradiologist</p><p className="text-sm text-gray-600">MBBS (Oxford) | UCL Lead</p></div>
                  </div>
                  <p className="text-gray-700 text-sm"><strong>Lead radiologist on the PROMISE Trial</strong> which proved mpMRI efficacy for prostate cancer globally. Pioneered mpMRI since 2000.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200"><Image src="/fg.png" alt="Dr Francesco Giganti" width={80} height={80} className="w-full h-full object-cover" /></div>
                    <div><h3 className="text-2xl font-bold text-gray-900">Dr Francesco Giganti</h3><p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>Radiologist & Associate Professor</p><p className="text-sm text-gray-600">University College London</p></div>
                  </div>
                  <p className="text-gray-700 text-sm">Developed <strong>PI-QUAL</strong> and <strong>PRECISE scores</strong>—now used globally to assess MRI quality and active surveillance protocols.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-6">Building team spirit in and out of theatre</h3>
                <div className="relative w-full h-[500px]">
                  {clinicalTeamImages.map((img, idx) => (<div key={idx} className="absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-1000" style={{ opacity: idx === currentTeamImage ? 1 : 0 }}><Image src={img} alt={`Team ${idx + 1}`} fill className="object-contain" /></div>))}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">{clinicalTeamImages.map((_, idx) => (<div key={idx} className={`h-2 rounded-full transition-all ${idx === currentTeamImage ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'}`} />))}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section id="track-record" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 border-t border-emerald-600/30">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Our Track Record</h2>
                <p className="text-xl text-slate-300">Supporting <strong className="text-white">~100 surgeons</strong> across <strong className="text-white">~95 hospitals</strong> in more than 6 major hospital groups</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">MRI/US Fusion Biopsies</h3>
                  <div className="space-y-2"><div className="flex justify-between"><span className="text-slate-400">2025</span><span className="text-3xl font-bold text-emerald-400">1,072</span></div><div className="flex justify-between"><span className="text-slate-400">2024</span><span className="text-lg text-slate-300">1,158</span></div><div className="flex justify-between"><span className="text-slate-400">2023</span><span className="text-lg text-slate-300">1,041</span></div></div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">HIFU Procedures</h3>
                  <div className="space-y-2"><div className="flex justify-between"><span className="text-slate-400">2025</span><span className="text-3xl font-bold text-blue-400">209</span></div><div className="flex justify-between"><span className="text-slate-400">2024</span><span className="text-lg text-slate-300">246</span></div><div className="flex justify-between"><span className="text-slate-400">2023</span><span className="text-lg text-slate-300">212</span></div></div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">IRE (NanoKnife)</h3>
                  <div className="space-y-2"><div className="flex justify-between"><span className="text-slate-400">2025</span><span className="text-3xl font-bold text-purple-400">64</span></div><div className="flex justify-between"><span className="text-slate-400">2024</span><span className="text-lg text-slate-300">53</span></div><div className="flex justify-between"><span className="text-slate-400">2023</span><span className="text-lg text-slate-300">40</span></div></div>
                </div>
              </div>
              <div className="text-center"><div className="inline-block bg-emerald-600/20 rounded-xl px-8 py-4 border border-emerald-500/30"><p className="text-2xl font-bold text-white">4,095</p><p className="text-sm text-slate-300">total procedures supported (2023-2025)</p></div></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-green-900 to-emerald-800 py-20">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Prostate Service?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Contact our team to discuss how we can support your hospital's precision prostate pathway.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Get in Touch <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
        </section>

        <EvolutionTabs />
      </main>
      <Footer />
    </>
  )
}
