"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPCLPage() {
  return (
    <>
      <Header />
      <main className="pt-48 sm:pt-52 lg:pt-56 pb-20">
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
              Our mission is to make imaging-led diagnostics and treatment for prostate cancer available to all patients, clinicians and hospitals in the UK. All men deserve access to precision diagnostics and nuanced care.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From MRI contouring to on-site application specialists, we handle the technical complexity so you can focus on patient care.
            </p>
          </div>

          {/* The Evolution of PCL */}
          <div className="bg-white rounded-2xl p-12 mb-16 border-2 border-gray-200 shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "var(--color-medical-green)" }}>
              The Evolution of Prostate Care Limited
            </h2>

            {/* Founding (2009) */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📍</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
                    Founding (2009)
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Prostate Care Limited was established in 2009 as a specialist imaging centre on <strong>Queen Anne Street in London</strong>, aiming to serve mainly the MSK and neurology communities with its 3T MRI. Very quickly the 3T was in demand from a group of research urologists at nearby UCLH who were the world leaders in researching, advancing and trialling a new, imaging-led pathway for managing prostate cancer called <strong>focal therapy</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Turning Point - UCLH Collaboration */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔬</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-blue-900">
                    Turning Point – Collaboration with UCLH
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    This imaging-led pathway encompasses both <strong>diagnostics</strong> in the form of pre-biopsy imaging and image-guided biopsy, and <strong>treatment</strong> in the form of high-intensity focused ultrasound (HIFU).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Prostate Care Limited developed as a specialist imaging centre and established a reputation for excellence and innovation in imaging the prostate, working with the team at UCLH and others who were running the patient trials required to advance the focal pathway.
                  </p>
                </div>
              </div>
            </div>

            {/* Growth and Impact */}
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-purple-900">
                    Growth and Impact
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We promoted this pathway to other clinicians and hospitals, enabling the former to offer their patients a non-invasive alternative to surgery and the latter a day-case procedure.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our innovations have centred on continually increasing precision in imaging, reporting and patient engagement, and through these we have built relationships with leading Urologists around the country to support them in offering this new pathway to their patients.
                  </p>
                </div>
              </div>
            </div>

            {/* Pivotal Trials */}
            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">🏆 Pivotal Trials: Establishing the Standard of Care</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-4xl">📄</div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-emerald-300">2017 - The PROMIS Trial</h4>
                      <p className="text-xs text-emerald-100 mb-2">January 2017</p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-100 mb-3">
                    A major UK-led trial demonstrated the value of <strong>mpMRI imaging pre-biopsy</strong>, establishing mpMRI imaging as a new standard of care for managing prostate cancer.
                  </p>
                  <div className="bg-emerald-500/20 rounded-lg p-3">
                    <p className="text-xs text-emerald-50 font-semibold">
                      We played a significant role in this groundbreaking trial.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-4xl">🎯</div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-cyan-300">2018 - The PRECISION Trial</h4>
                      <p className="text-xs text-cyan-100 mb-2">March 2018</p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-100 mb-3">
                    Another UK-led trial demonstrated that using an MRI to identify suspected cancer and performing a <strong>prostate biopsy targeted to the MRI information</strong> leads to more cancers being diagnosed than the standard method used for the last 25 years.
                  </p>
                  <div className="bg-cyan-500/20 rounded-lg p-3">
                    <p className="text-xs text-cyan-50 font-semibold">
                      Our involvement was instrumental in validating MRI-targeted biopsy as superior to traditional methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-emerald-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-emerald-900">
                    What gets us up in the morning??
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Our mission: Supporting hospitals and surgeons to deliver precision diagnostics and treatment to every patient who needs it.</strong>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We don't just provide technology. We own it, maintain it, transport it, set it up, calibrate it, guide you through the procedure, and document the results. You get turnkey precision — <strong>equipment ready, targets planned, specialist in theatre, report delivered.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Top Urologists Trust Us Behind the Scenes */}
          <div className="bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white rounded-2xl p-12 mb-16 border-4 border-orange-500">
            <h2 className="text-3xl font-bold text-center mb-6">
              🔑 Why Top Urologists Trust Us Behind the Scenes
            </h2>
            <p className="text-center text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-amber-100">
              Even leading urologists use us for their most complex cases. It's not just the software — it's the <strong>expert technical setup and real-time guidance</strong> that makes fusion and ablation systems work reliably.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border-2 border-amber-400">
              <h3 className="text-2xl font-bold mb-4 text-center text-amber-300">
                The Precise Chain of Precision: TARGET → PROBE → FIELD
              </h3>
              <p className="text-center text-lg text-amber-100 mb-4">
                <strong>The precise matching of MRI target → probe position → ultrasound field</strong> is what makes or breaks fusion accuracy.
              </p>
              <p className="text-center text-amber-50">
                <strong>Your expertise is clinical judgment. Our expertise is the technical foundation that supports it.</strong> From Dr. Allen's virtual probe contouring, to millimeter-perfect equipment setup, to real-time software guidance during the procedure — we handle the infrastructure so you can focus on decision-making.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">Complex Technical Setup</h3>
                <p className="text-sm text-amber-100 mb-3">
                  The EX3 stepper + MicroTouch + cradle + water balloon + drape system requires <strong>precise assembly and calibration</strong>.
                </p>
                <p className="text-sm text-amber-50">
                  Miss one adjustment and your probe alignment drifts 2-3mm — enough to miss a lesion or compromise treatment accuracy. That's why urologists rely on our on-site specialists who've perfected this setup across hundreds of procedures.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">Geometric Consistency Is Critical</h3>
                <p className="text-sm text-amber-100 mb-3">
                  If you contour in MIM and then fuse in BK, that fusion is only as accurate as your <strong>probe axis and balloon fill</strong>.
                </p>
                <p className="text-sm text-amber-50">
                  Without precise stabiliser setup, your 3D registration collapses. We ensure mechanical reproducibility across every procedure.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🧩</div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">The Setup Expertise You Need (But Don't See)</h3>
                <p className="text-sm text-amber-100 mb-3">
                  Having software licenses is different from achieving accurate, reproducible fusion in theatre.
                </p>
                <p className="text-sm text-amber-50">
                  <strong>Across 100+ surgeons and 95 hospitals, we've refined the critical setup discipline:</strong> probe geometry, sterile draping without compromising alignment, balloon fill technique, grid calibration and cooling protocols. From hundreds of theatres, we know what goes wrong when these details are missed.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🔬</div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">Why Centres Outsource It</h3>
                <p className="text-sm text-amber-100 mb-3">
                  It's risky to do wrong:
                </p>
                <ul className="text-xs text-amber-50 space-y-1.5">
                  <li>• Probe over-compression → gland deformation → mis-targeted lesion</li>
                  <li>• Air in the balloon → acoustic shadowing</li>
                  <li>• Wrong stand or drape tension → probe drift during ablation</li>
                  <li>• Missed "step" in the EX3 → probe slips 5mm mid-case</li>
                </ul>
                <p className="text-sm text-amber-50 mt-3">
                  A radiologist can contour a perfect target, but if those errors happen, the precision is lost.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-orange-500 rounded-xl p-8 border-2 border-white/30">
              <h3 className="text-2xl font-bold mb-4 text-center">💡 That's Why We Remain Invisible But Indispensable</h3>
              <p className="text-center text-white mb-4 leading-relaxed">
                Clinics keep us behind the scenes, because we're a <strong>facilitator service</strong> — not a competing clinic.
              </p>
              <p className="text-center text-lg font-semibold text-yellow-100">
                "The reason you don't see our name on the theatre list is because everything already works when you walk in."
              </p>
              
              <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">🎨</div>
                  <p className="text-sm font-bold mb-1">Pre-Fusion Contouring</p>
                  <p className="text-xs text-yellow-50">Dr Allen's expert radiologist planning</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">⚙️</div>
                  <p className="text-sm font-bold mb-1">On-Site Technical Execution</p>
                  <p className="text-xs text-yellow-50">Millimeter-perfect setup & calibration</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-sm font-bold mb-1">Theatre Confidence</p>
                  <p className="text-xs text-yellow-50">Urologist focuses on clinical decisions</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-xl p-6 border-2 border-yellow-400">
              <p className="text-center font-bold text-2xl mb-3 text-yellow-300">
                We Bridge Radiology → Fusion → Theatre Where Others Can't
              </p>
              <p className="text-center text-amber-100">
                That's the operational excellence that separates theoretical precision from reproducible clinical outcomes. Top teams know it. That's why they call us.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 mb-16 border border-emerald-200">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
              Our Track Record
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              Supporting <strong>~100 surgeons</strong> across <strong>~95 hospitals</strong> in more than 6 major hospital groups
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* MRI/US Fusion Biopsies */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">MRI/US Fusion Biopsies</h3>
                <p className="text-xs text-gray-500 mb-3">Using MIM Fusion Software</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2025</span>
                    <span className="text-2xl font-bold text-emerald-600">1,072</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2024</span>
                    <span className="text-lg font-semibold text-gray-700">1,158</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2023</span>
                    <span className="text-lg font-semibold text-gray-700">1,041</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Total: 3,271 cases</span>
                  </div>
                </div>
              </div>

              {/* HIFU */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">HIFU Procedures</h3>
                <p className="text-xs text-gray-500 mb-3">Sonablate HIFU + MIM Fusion</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2025</span>
                    <span className="text-2xl font-bold text-blue-600">209</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2024</span>
                    <span className="text-lg font-semibold text-gray-700">246</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2023</span>
                    <span className="text-lg font-semibold text-gray-700">212</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Total: 667 cases</span>
                  </div>
                </div>
              </div>

              {/* IRE (NanoKnife) */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">IRE (NanoKnife)</h3>
                <p className="text-xs text-gray-500 mb-3">Irreversible Electroporation</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2025</span>
                    <span className="text-2xl font-bold text-purple-600">64</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2024</span>
                    <span className="text-lg font-semibold text-gray-700">53</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2023</span>
                    <span className="text-lg font-semibold text-gray-700">40</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Total: 157 cases</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <strong>4,095 total procedures</strong> supported across all modalities (2023-2025)
              </p>
            </div>
          </div>

          {/* Meet The Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--color-medical-green)" }}>
              Meet The Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From expert MRI contouring to equipment transport and on-site support - the complete team making precision fusion biopsy seamless
            </p>

            {/* Clinical Team - Dr Clare Allen */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                Clinical Team
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                Expert radiologists providing multiparametric MRI contouring and precision targeting
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
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
                    <h4 className="text-2xl font-bold text-gray-900">Dr Clare Allen</h4>
                    <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Consultant Uroradiologist
                    </p>
                    <p className="text-sm text-gray-600">MBBS (Oxford) | GMC: 3108389</p>
                    <p className="text-xs text-gray-500 mt-1">UCLH | The Princess Grace Hospital | King Edward VII's Hospital | The London Clinic</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">A UK Leader in Prostate Cancer Care</h5>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Clare qualified from Oxford (MBBS, 1985) and is the uro-radiology lead consultant at University College London. She has pioneered the use of mpMRI (multiparametric magnetic resonance imaging) for prostate cancer since 2000 and has led the establishment of reporting standards for prostate cancer imaging in the UK.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    She was lead radiologist on the <strong>PROMISE Trial</strong> which proved the efficacy of mpMRI for prostate cancer globally, and received the <strong>UK Research Paper of the Year</strong> award.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Dr Allen has a well-developed clinical practice in dynamic contrast enhanced magnetic resonance imaging (DCE-MRI) in the prostate and leads a team of medical physicists in further defining the role of multi-sequence MRI in diagnostic utility of prostate cancer.
                  </p>
                </div>
              </div>
            </div>

            {/* On-Site Application Specialists */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                On-Site Application Specialists
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                Expert technicians managing equipment setup, calibration, and real-time procedure support
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
                <div className="mb-6">
                  <Image
                    src="/NEW/onsiteteam.png"
                    alt="On-site Application Specialists"
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Our Application Specialists are the backbone of every procedure. They arrive early to set up the 6-degree-of-freedom stepper system, calibrate the MRI fusion overlay, and manage the technical complexity throughout your biopsy session.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From loading Dr Allen's pre-planned targets to handling the sophisticated equipment so you can focus entirely on the patient.
                </p>
              </div>
            </div>

            {/* Coordination & Administration */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                Coordination & Administration
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                The team holding everything together - from initial booking to final report delivery
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 flex-shrink-0 bg-gray-100">
                    <Image
                      src="/NEW/secretary.png"
                      alt="PCL Coordinator"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">PCL Coordination Team</h4>
                    <p className="text-lg font-medium" style={{ color: "var(--color-medical-green)" }}>
                      Your Single Point of Contact
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-3">
                  All your secretary needs to do is call us. Our coordination team handles imaging transfer, schedules Dr Allen's contouring, arranges on-site specialist deployment, and ensures everything is ready before you step into theatre.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  After the procedure, they coordinate the post-procedure targeting accuracy report - delivering complete documentation to support your clinical records.
                </p>
              </div>
            </div>

            {/* Transport & Logistics */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
                Equipment Transport & Logistics Partners
              </h3>
              <p className="text-center text-sm text-gray-600 mb-8 max-w-xl mx-auto">
                Nationwide equipment delivery ensuring seamless service across the UK
              </p>
              
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg p-8 max-w-3xl mx-auto text-white">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-5xl">🚛</div>
                  <h4 className="text-3xl font-bold">Precision Equipment Logistics</h4>
                </div>
                
                <p className="text-center text-amber-50 mb-6">
                  Specialized medical equipment transport ensuring your hardware arrives ready for theatre
                </p>

                <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center">
                  <Image
                    src="/logos/parker&sonstransport.gif"
                    alt="Parker & Son Transport - Medical Equipment Logistics Partner"
                    width={200}
                    height={80}
                    className="h-16 w-auto"
                  />
                </div>

                <p className="text-sm text-amber-50 leading-relaxed mb-4">
                  <strong>Parker Medical Transport</strong> handles the complex logistics of ferrying our <strong>precision equipment</strong> - including the 6DOF stepper systems, ultrasound units, cradles, water balloons, and calibration tools - safely to your location and back.
                </p>
                
                <div className="bg-white/20 rounded-lg p-4 border border-white/30">
                  <p className="text-xs text-amber-100 text-center">
                    <strong>Note:</strong> MRI images and planning data are transferred digitally via secure cloud-based systems - not by physical transport. This logistics partnership is specifically for equipment delivery, setup support, and post-procedure collection.
                  </p>
                </div>
              </div>
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
