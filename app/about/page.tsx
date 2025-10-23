import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  const surgeonTestimonials = [
    {
      name: "Mr Marc Laniado",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/ml.png",
      quote: "The Prostate Care team take all the fuss out of fusion. Without having to do any extra preparation, I am able to provide the highest standard of prostate biopsy service for my patients. The Application Specialists bring the fusion software and the pre-prepared biopsy plans with them and manage the software throughout the procedure. They are a pleasure to work with."
    },
    {
      name: "Professor Richard Hindley",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/rh.png",
      quote: "The Prostate Care contouring service is what makes the difference. All I need to do is ask my secretary to book the service and the Prostate Care operations team arrange for the patient MRI scans to be transferred via IEP, ready for contouring by Dr Clare Allen. This, in my opinion, is the optimal standard of care for my private patients."
    },
    {
      name: "Mr Raj Nigam",
      title: "Consultant Urological Surgeon",
      image: "/surgeons/rn.png",
      quote: "The Application Specialists are a highly professional team. An accurate fusion is vital for the procedure and their expertise in achieving this is invaluable. The biopsies are tracked and a graphic report is provided, which helps the patients understand their diagnosis and treatment options."
    }
  ]

  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              About Prostate Care Limited
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Delivering consistent, state-of-the-art expertise to support your clinical and operational practice
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-16 border border-green-200">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              We are committed to developing access to state-of-the-art precision diagnostics for prostate cancer,
              helping hospitals implement MR/US fusion biopsy services with proven technology and expert support.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From MRI contouring to on-site application specialists, we handle the technical complexity so you can focus on patient care.
            </p>
          </div>

          {/* Clinical Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Our Clinical Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Expert radiologists providing multiparametric MRI contouring and precision targeting
            </p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto mb-16">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-200 flex-shrink-0">
                  <Image
                    src="/surgeons/ca.png"
                    alt="Dr Clare Allen"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h3>
                  <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                    Consultant Radiologist
                  </p>
                  <p className="text-sm text-gray-600">Specialist in Prostate MRI & Multiparametric Imaging</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Dr Allen provides expert multiparametric MRI contouring services, identifying and delineating prostate cancer targets with precision. 
                Her detailed contours form the foundation of our fusion biopsy planning, ensuring clinicians receive accurate, actionable target maps for systematic sampling.
              </p>
            </div>
          </div>

          {/* Surgeon Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              What Surgeons Say
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Consultant urological surgeons share their experience working with Prostate Care Limited
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {surgeonTestimonials.map((surgeon, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-200 mb-4">
                      <Image
                        src={surgeon.image}
                        alt={surgeon.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center">{surgeon.name}</h3>
                    <p className="text-sm font-medium text-center" style={{ color: "var(--color-medical-green)" }}>
                      {surgeon.title}
                    </p>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-4xl text-green-600 mb-2">"</div>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      {surgeon.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Complete Service Package: Equipment & Logistics */}
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white rounded-2xl p-12 mb-16 border-4 border-amber-600">
            <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
              🔧 The Complete Technical Package
            </h2>
            <p className="text-center text-lg mb-8 max-w-4xl mx-auto leading-relaxed">
              Our Application Specialists handle the <strong>complex technical setup, equipment calibration, and real-time support</strong> so you can focus entirely on clinical decision-making and patient care.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-500">
                <h3 className="text-xl font-bold mb-4 text-amber-300">💪 What We Handle For You</h3>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Equipment logistics</strong> - Nationwide delivery, setup, breakdown for every procedure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Precision calibration</strong> - 6-degree-of-freedom positioning, probe alignment, field matching</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Real-time technical support</strong> - Software optimization, hardware management, fusion accuracy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400">•</span>
                    <span><strong>Sterile technique support</strong> - Draping, probe preparation, maintaining aseptic field</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-500">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">🎯 Our Service Values</h3>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Meticulous attention to detail</strong> - Every setup verified, every target confirmed, every core documented</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Partnership approach</strong> - Supporting your clinical excellence with technical expertise</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Technical expertise</strong> - Years of experience with fusion software, ultrasound physics, MRI interpretation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Consistent reliability</strong> - On-time, every time, with comprehensive preparation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 border-2 border-amber-400">
              <p className="text-center font-bold text-xl mb-2">
                🚚 Complete Supply Chain: From MRI Scan to Final Report
              </p>
              <p className="text-center text-sm text-amber-50 mb-4">
                Our logistics partners ensure seamless nationwide service delivery
              </p>
              <div className="flex justify-center items-center gap-8">
                <div className="bg-white rounded-lg p-4">
                  <Image
                    src="/logos/parker&sonstransport.gif"
                    alt="Parker & Son Transport - Logistics Partner"
                    width={120}
                    height={60}
                    className="opacity-90"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-lg p-6 border border-white/30">
              <p className="text-center font-semibold text-lg mb-2">
                💎 Why Surgeons Choose to Work With Us
              </p>
              <p className="text-center text-sm text-gray-200">
                Our team's specialized expertise in equipment logistics, technical troubleshooting, and precision calibration means you can concentrate on what you do best - clinical judgment and patient outcomes. We handle the complexity, you deliver exceptional care.
              </p>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-br from-blue-900 to-emerald-900 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Prostate Care Limited</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Expert Clinical Support</h3>
                <p className="text-sm text-blue-100">
                  Application Specialists handle setup, fusion alignment, and real-time guidance throughout procedures
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🧲</div>
                <h3 className="text-xl font-bold mb-3">Radiologist-Led Contouring</h3>
                <p className="text-sm text-blue-100">
                  Specialist prostate MRI interpretation and target delineation by experienced consultant radiologists
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold mb-3">Complete Service Package</h3>
                <p className="text-sm text-blue-100">
                  From MRI transfer to post-procedure reporting - we handle the complexity so you can focus on patients
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
