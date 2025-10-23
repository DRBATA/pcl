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

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="mb-4">
                  <img
                    src="/about1/base.png"
                    alt="Post-ablation MRI showing dark areas on T2 (non-specific) - scar or necrosis with focal early enhancement at edge of ablation cavity consistent with residual disease"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-cyan-300">Base: Post-Ablation Recurrence</h3>
                <p className="text-sm text-blue-100">
                  Post-ablation MRI shows dark areas on T2 (non-specific - scar or necrosis). <strong>Focal early enhancement at edge of ablation cavity</strong> consistent with residual disease requiring targeted re-treatment.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="mb-4">
                  <img
                    src="/about1/mid.png"
                    alt="Mid-gland anterior tumor - challenging location requiring precision non-thermal ablation"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-300">Mid: Anterior Lesion</h3>
                <p className="text-sm text-blue-100">
                  Mid-gland anterior tumor in challenging location. IRE's non-thermal mechanism allows precise ablation near critical structures, avoiding heat-related collateral damage.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="mb-4">
                  <img
                    src="/about1/apex.png"
                    alt="Apical tumor requiring precision treatment near neurovascular bundle and urethral sphincter"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-pink-300">Apex: Preservation of Function</h3>
                <p className="text-sm text-blue-100">
                  Apical tumor near neurovascular bundle and urethral sphincter. IRE's electrical pulses preserve surrounding tissue architecture, protecting continence and sexual function.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white/20 rounded-lg p-6 border border-white/30">
              <p className="text-center font-semibold text-lg mb-2">💡 Why Non-Thermal Ablation Matters</p>
              <p className="text-center text-sm text-blue-50">
                IRE delivers controlled electrical pulses that don't generate heat, making it ideal for marginal zones, post-ablation recurrence, and anatomically challenging locations where thermal therapies risk damage to critical structures.
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
