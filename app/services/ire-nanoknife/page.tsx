import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function IREPage() {
  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              IRE/NanoKnife Focal Therapy
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              On-demand access to cutting-edge irreversible electroporation technology for carefully selected patients,
              delivered with comprehensive clinical support and expert guidance.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Advanced Technology, Only When You Need It
            </h2>
            <p className="text-gray-700 mb-4">
              Imagine offering your patients cutting-edge IRE focal therapy without the burden of permanent equipment
              ownership. Our on-demand service delivers state-of-the-art NanoKnife technology directly to your operating
              theatre, complete with expert clinical support.
            </p>
            <p className="text-gray-700 text-sm">
              Perfect for surgical teams performing 5-15 focal therapy cases annually - access premium technology
              without the overhead of ownership, maintenance, or storage requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/y23oNznV88s"
                  title="NanoKnife IRE Procedure"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Clinical Context & Patient Selection
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  IRE focal therapy is offered for patients whose disease characteristics meet specific clinical
                  criteria, following rigorous multidisciplinary team evaluation. Treatment decisions are made through
                  established protocols, acknowledging that active surveillance remains a valid option for many
                  patients.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Precision Electroporation Technology
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Non-Thermal Tissue Ablation</h3>
                  <p className="text-gray-600 text-sm">
                    IRE delivers controlled electrical pulses to create precise treatment zones while preserving
                    surrounding healthy tissue structures and critical anatomy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Real-Time MRI Guidance</h3>
                  <p className="text-gray-600 text-sm">
                    Advanced imaging integration ensures precise probe placement and treatment monitoring throughout the
                    procedure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Comprehensive Clinical Support</h3>
                  <p className="text-gray-600 text-sm">
                    Our Clinical Technology Specialists work alongside your surgical team, providing setup, real-time
                    guidance, and ensuring optimal equipment performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Expert On-Site Support
              </h3>
              <p className="text-gray-600 text-sm">
                Clinical Technology Specialists handle equipment setup, safety checks, and provide real-time assistance
                during procedures. Training included for surgical teams.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Zero Ownership Burden
              </h3>
              <p className="text-gray-600 text-sm">
                No maintenance contracts, storage requirements, or capital expenditure. We handle all equipment
                servicing, calibration, and software updates off-site.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Cost-Effective Access
              </h3>
              <p className="text-gray-600 text-sm">
                Pay only for procedures performed. Avoid idle equipment costs while maintaining access to cutting-edge
                technology for suitable patients.
              </p>
            </div>
          </div>

          {/* Clinical Cases: When IRE Makes the Difference */}
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">When IRE/NanoKnife Excels</h2>
            <p className="text-center text-blue-100 mb-12 max-w-3xl mx-auto">
              Challenging anatomical locations, post-ablation recurrence, and marginal disease - IRE's non-thermal ablation preserves critical structures while delivering precise treatment.
            </p>

            <div className="mb-8">
              <img
                src="/new/complexcase+knife.png"
                alt="Complex cases showing base recurrence, mid-gland anterior lesion, and apical tumor - ideal candidates for IRE/NanoKnife"
                className="w-full rounded-xl shadow-2xl border-4 border-white/30"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-300">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Anterior & Apical Lesions: Where IRE Shines</h3>
                <p className="text-sm text-blue-100 mb-3 leading-relaxed">
                  Anterior and apical tumors are among the most challenging to treat due to proximity to the <strong>neurovascular bundles</strong> (controlling erectile function) and <strong>urethral sphincter</strong> (controlling continence).
                </p>
                <p className="text-sm text-blue-100 mb-3 leading-relaxed">
                  <strong>Thermal ablation methods (HIFU, cryotherapy)</strong> generate heat or extreme cold that can damage these delicate structures, leading to:
                </p>
                <ul className="text-xs text-blue-50 space-y-1.5 ml-4">
                  <li>• <strong>Erectile dysfunction</strong> from nerve damage</li>
                  <li>• <strong>Urinary incontinence</strong> from sphincter injury</li>
                  <li>• <strong>Urethral stricture</strong> from collateral thermal damage</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-300">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">⚡ Non-Thermal Precision: Preserving Function</h3>
                <p className="text-sm text-blue-100 mb-3 leading-relaxed">
                  IRE/NanoKnife uses <strong>controlled electrical pulses</strong> instead of heat. This non-thermal mechanism:
                </p>
                <ul className="text-xs text-blue-50 space-y-2 ml-4">
                  <li>• <strong>Preserves tissue architecture</strong> - nerves, blood vessels, and connective tissue remain intact</li>
                  <li>• <strong>Protects erectile function</strong> - neurovascular bundles adjacent to the ablation zone are spared</li>
                  <li>• <strong>Maintains continence</strong> - urethral sphincter function preserved even in apical tumors</li>
                  <li>• <strong>Safe near critical structures</strong> - bladder neck, rectum, and urethra protected</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl p-6 mb-8 border-2 border-white/30">
              <h3 className="text-2xl font-bold mb-4 text-center">🔬 MRI Fusion Guidance: The Complete Advantage</h3>
              <p className="text-sm text-white mb-4 leading-relaxed text-center max-w-4xl mx-auto">
                Our <strong>MRI-Ultrasound fusion technology</strong> allows us to target anterior and apical lesions with millimeter accuracy - lesions that would be nearly impossible to identify or treat without this guidance.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">📐</div>
                  <p className="text-xs font-semibold mb-1">Precise Lesion Targeting</p>
                  <p className="text-xs text-cyan-50">Dr Allen's pre-contoured MRI targets guide ablation in real-time</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎨</div>
                  <p className="text-xs font-semibold mb-1">Margins Without Over-Treatment</p>
                  <p className="text-xs text-cyan-50">Treat cancer + safety margin while sparing healthy tissue</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-xs font-semibold mb-1">90%+ Success Rate</p>
                  <p className="text-xs text-cyan-50">Over 90% cancer-free at 1 year (MRI + PSA criteria)</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-pink-300">
                <h3 className="text-lg font-bold mb-3 text-pink-300">📍 Post-Ablation Recurrence</h3>
                <p className="text-sm text-blue-100">
                  <strong>Base-level recurrence after HIFU or cryo?</strong> Post-ablation MRI shows dark T2 areas (scar/necrosis) making recurrence hard to detect. Focal early enhancement at the ablation edge signals residual disease - ideal for targeted IRE re-treatment.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-300">
                <h3 className="text-lg font-bold mb-3 text-yellow-300">📊 Long-Term Outcomes</h3>
                <p className="text-sm text-blue-100">
                  Global focal therapy data shows <strong>75-80% of men remain free from radical treatment (surgery/radiotherapy) for 6-10 years</strong> after IRE. That's 4 out of 5 men avoiding whole-gland treatment while maintaining cancer control.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-lg p-6 border border-white/30">
              <p className="text-center font-semibold text-lg mb-2">💡 Why Non-Thermal Ablation Matters for Complex Cases</p>
              <p className="text-center text-sm text-blue-50">
                IRE delivers controlled electrical pulses that don't generate heat, making it the <strong>safest option for anterior/apical lesions, marginal zones, post-ablation recurrence, and anatomically challenging locations</strong> where thermal therapies risk permanent damage to erectile function, continence, or urethral integrity.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-40">
            <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: "var(--color-medical-green)" }}>
              Elevating Surgical Practice with Precision and Confidence
            </h2>
            <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8">
              Our on-demand IRE service enables surgical teams to offer advanced focal therapy without compromising on
              cost-effectiveness. Stay at the cutting edge of urological innovation while maintaining clinical
              excellence and patient-centered care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Schedule Consultation
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                View Clinical Data
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
