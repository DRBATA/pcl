import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function HifuPage() {
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
                  High Intensity Focused Ultrasound (HIFU)
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Precision ablation using converging ultrasound waves to thermally destroy prostate tumor tissue while preserving healthy surrounding structures.
                </p>
                <div className="space-y-3 text-slate-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Non-invasive, bloodless procedure with rapid recovery</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time ultrasound feedback for precise targeting</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Radiation-free with minimal side effects</span>
                  </div>
                </div>
              </div>

              {/* Right: HIFU Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hifuvids/herohifu.png"
                    alt="HIFU High Intensity Focused Ultrasound procedure"
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

          {/* 7 Key Benefits - Icon Cards */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
                Sonablate HIFU Advantages
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Advanced features that make HIFU a leading choice for focal prostate therapy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Real-time ultrasound-derived feedback */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Real-Time Ultrasound Feedback
                </h3>
                <p className="text-gray-600 text-sm">
                  Live thermal monitoring ensures precise energy delivery and complete ablation of target tissue with immediate verification.
                </p>
              </div>

              {/* Minimally-invasive, bloodless ablation */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Minimally-Invasive, Bloodless
                </h3>
                <p className="text-gray-600 text-sm">
                  Transrectal approach with no incisions, minimal trauma, and rapid recovery compared to traditional surgery.
                </p>
              </div>

              {/* Adjustable for each dose of HIFU energy */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Adjustable Energy Dosing
                </h3>
                <p className="text-gray-600 text-sm">
                  Customize HIFU energy for each treatment zone, optimizing ablation while protecting surrounding structures.
                </p>
              </div>

              {/* Repeatable procedure, if needed */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Repeatable Procedure
                </h3>
                <p className="text-gray-600 text-sm">
                  Can be performed as an outpatient procedure with repeatability if needed, providing flexible treatment options.
                </p>
              </div>

              {/* Radiation-free */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Radiation-Free
                </h3>
                <p className="text-gray-600 text-sm">
                  No ionizing radiation exposure, making it a safer option for eligible patients with fewer long-term risks.
                </p>
              </div>

              {/* Healthy tissue sparing */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Healthy Tissue Sparing
                </h3>
                <p className="text-gray-600 text-sm">
                  Focused ultrasound precisely targets cancerous tissue while sparing healthy prostate and surrounding organs.
                </p>
              </div>

              {/* Minimal side effects */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Minimal Side Effects
                </h3>
                <p className="text-gray-600 text-sm">
                  Preservation of erectile function and continence in the majority of cases with targeted cancer control.
                </p>
              </div>
            </div>
          </section>

          {/* Clinical Outcomes - Evidence-Based Results */}
          <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">One Year Outcomes After MRI-Fusion HIFU</h2>
              <p className="text-slate-300 max-w-3xl mx-auto mb-2">
                Evidence from retrospective clinical audit of 265 consecutive patients treated between 2016-2022
              </p>
              <p className="text-slate-400 text-sm">
                Based on The Focal Therapy Clinic audit data; individual results vary; consult your healthcare provider
              </p>
            </div>

            {/* Key Outcomes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Cancer Control */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
                <div className="text-5xl font-bold text-center mb-3 text-emerald-400">90%</div>
                <h3 className="text-lg font-bold text-center mb-2">Cancer-Free at 1 Year</h3>
                <p className="text-sm text-slate-200 text-center">
                  238/265 patients in clinical remission following single MRI-fusion HIFU treatment
                </p>
              </div>

              {/* Continence */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
                <div className="text-5xl font-bold text-center mb-3 text-blue-400">97%</div>
                <h3 className="text-lg font-bold text-center mb-2">Full Continence</h3>
                <p className="text-sm text-slate-200 text-center">
                  257/265 patients pad-free at one year (7 used pads; 1 required sling)
                </p>
              </div>

              {/* Erectile Function */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
                <div className="text-5xl font-bold text-center mb-3 text-cyan-400">97%</div>
                <h3 className="text-lg font-bold text-center mb-2">Erectile Function</h3>
                <p className="text-sm text-slate-200 text-center">
                  257/265 patients maintained function (8 used intracavernosal injections)
                </p>
              </div>

              {/* PSA Reduction */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
                <div className="text-5xl font-bold text-center mb-3 text-purple-400">4.6</div>
                <h3 className="text-lg font-bold text-center mb-2">Mean PSA Drop</h3>
                <p className="text-sm text-slate-200 text-center">
                  From 6.6 to 2.0 ng/mL (mean reduction 4.62 ng/mL) at one year
                </p>
              </div>
            </div>

            {/* Treatment Protocol */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
              <h3 className="text-2xl font-bold text-center mb-6">MRI-Fusion HIFU Protocol</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-emerald-400">Patient Selection</h4>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Multiparametric MRI scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Targeted and systematic biopsies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Multidisciplinary team (MDT) review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Expert uroradiologist contouring</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-400">Treatment Details</h4>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Device: Sonablate HIFU system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Software: MIM Symphony for MRI-US fusion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Margins: 6-10mm around identified lesions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Setting: Day-case procedure under general anaesthetic</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4 text-center text-cyan-400">Gleason Score Distribution</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">8%</div>
                    <div className="text-sm text-slate-300">Gleason 3+3</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">69%</div>
                    <div className="text-sm text-slate-300">Gleason 3+4</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">21%</div>
                    <div className="text-sm text-slate-300">Gleason 4+3</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">2%</div>
                    <div className="text-sm text-slate-300">Gleason ≥8</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retreatment Data */}
            <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-8 border border-white/20 mb-8">
              <h3 className="text-2xl font-bold text-center mb-6">Further Treatment Required (10%)</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-3">5%</div>
                  <h4 className="text-lg font-semibold mb-2">In-Field Recurrence</h4>
                  <p className="text-sm text-slate-200">
                    13 patients with in-field recurrence, all retreated with repeat focal therapy
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-3">5%</div>
                  <h4 className="text-lg font-semibold mb-2">Out-of-Field Recurrence</h4>
                  <p className="text-sm text-slate-200">
                    14 patients: 7 radical prostatectomy, 4 radiotherapy + ADT, 3 ADT ± chemotherapy
                  </p>
                </div>
              </div>
              <p className="text-center text-slate-300 text-sm mt-6">
                Focal therapy preserves future treatment options including radical and systemic therapies
              </p>
            </div>

            {/* Functional Outcomes Comparison */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
              <h3 className="text-2xl font-bold text-center mb-6">Erectile Dysfunction: Substantially Lower Risk</h3>
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">3%</div>
                  <p className="text-sm text-slate-200 mb-2">MRI-Fusion HIFU</p>
                  <p className="text-xs text-slate-400">(requiring interventions beyond oral medication)</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-slate-400 mb-2">vs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">50-80%</div>
                  <p className="text-sm text-slate-200">Traditional Prostatectomy or Radiotherapy</p>
                </div>
              </div>
            </div>

            {/* Clinical Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
              <p className="text-center text-slate-100 leading-relaxed">
                <strong>Clinical Evidence:</strong> In carefully selected men with localised prostate cancer assessed by MDT, MRI-guided focal HIFU achieved 90% one-year cancer control with 97% continence and 97% erectile function preservation. Results reflect specialist imaging, MRI-US fusion technology, and delivery by experienced consultants within an MDT framework.
              </p>
            </div>

            {/* References Section */}
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-xl font-bold mb-4 text-center">Supporting Evidence</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2">
                    <strong className="text-white">Focal Therapy Clinic Audit (2016-2022):</strong> Retrospective clinical audit of 265 consecutive patients treated with MRI-fusion HIFU.
                  </p>
                  <a 
                    href="https://bjuicompass.com/article/10.1002/bco2.70000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-xs"
                  >
                    Rokan N, Reddy D. BJUI Compass. 2025;6(2):e70000
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2">
                    <strong className="text-white">Multi-Institute 15-Year Experience:</strong> Cancer control outcomes following focal therapy using HIFU in 1,379 men with nonmetastatic prostate cancer.
                  </p>
                  <a 
                    href="https://www.europeanurology.com/article/S0302-2838(22)00031-5/fulltext"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-xs"
                  >
                    Reddy D, Peters M, Shah TT, et al. Eur Urol. 2022;81(4):407-413
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2">
                    <strong className="text-white">NICE Guidance:</strong> Focal therapy using high-intensity focused ultrasound for localised prostate cancer (IPG756).
                  </p>
                  <a 
                    href="https://www.nice.org.uk/guidance/ipg756"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-xs"
                  >
                    NICE IPG756, April 2023
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2">
                    <strong className="text-white">Lancet Oncology Development Study:</strong> Focal therapy for localised unifocal and multifocal prostate cancer: a prospective development study.
                  </p>
                  <a 
                    href="https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(12)70121-3/fulltext"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-xs"
                  >
                    Ahmed HU, Hindley RG, Dickinson L, et al. Lancet Oncol. 2012;13(6):622-632
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2">
                    <strong className="text-white">MRI-US Fusion Platform:</strong> HIFU focal therapy for localized prostate cancer with MRI-US fusion platform.
                  </p>
                  <a 
                    href="https://www.hindawi.com/journals/au/2021/7157973/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-xs"
                  >
                    Yee CH, Chiu PK, Teoh JY, et al. Adv Urol. 2021;2021:7157973
                  </a>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2">
                    <strong className="text-white">ProtecT Trial:</strong> Fifteen-year outcomes after monitoring, surgery, or radiotherapy for prostate cancer.
                  </p>
                  <a 
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2214122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-xs"
                  >
                    Hamdy FC, Donovan JL, Lane JA, et al. N Engl J Med. 2023;388(17):1547-1558
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center mt-6">
                Based on retrospective data from specialist focal therapy centres; individual results vary; outcomes depend on patient selection, technique, and centre experience.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          {/* Expert Videos Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Learn From Leading Experts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Video 1: Tim Dudderidge */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Mr Tim Dudderidge: How Successful is HIFU?</h3>
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/7fqsX9FCs-A?si=kiqV_HhynpEK49UW"
                    title="Mr Tim Dudderidge: How successful is HIFU"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* Video 2: Raj Nigam */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Mr Raj Nigam: Does Focal Therapy Work?</h3>
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ilSy7GK2bxU?si=P3ZWnTCbLR5uh3Ns"
                    title="Mr Raj Nigam: Does Focal Therapy work?"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Offer HIFU at Your Facility?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join surgical teams across the UK who are delivering precision focal therapy without capital investment. Premium HIFU solutions with expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all"
              >
                Contact Us
              </a>
              <a 
                href="/about/pcl"
                className="inline-block border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Learn More About PCL
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
