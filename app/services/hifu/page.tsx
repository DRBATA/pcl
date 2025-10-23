import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HifuPage() {
  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              High Intensity Focused Ultrasound (HIFU)
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Non-invasive ablation modality that has become a core component of the focal therapy platform, using
              converging ultrasound waves to thermally destroy prostate tumor tissue from within.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
              Proven Clinical Outcomes and Evidence Base
            </h2>
            <p className="text-gray-700 mb-4">
              A 2024 systematic review pooling outcomes from &gt;20 HIFU cohorts reported excellent cancer control in
              the treated zones – on follow-up biopsies within 2 years, only ~9% of men had significant cancer
              persisting in the ablated area. About 75–80% of men avoid conversion to radical prostatectomy or radiation
              for at least 6–10 years post-treatment.
            </p>
            <p className="text-gray-700 text-sm">
              Functional outcomes are favorable – 97% of patients had no significant urinary continence deterioration,
              and severe sexual side effects were uncommon (~6%).
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
              HIFU Procedure Overview
            </h2>
            <div className="aspect-video w-full max-w-3xl mx-auto mb-6">
              <video
                src="/hifuvids/start.mp4"
                controls
                className="w-full h-full rounded-lg"
                poster="/sonablate-hifu-advantages.jpg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-gray-700 text-center text-sm">
              See how HIFU delivers precise, non-invasive treatment for prostate cancer
            </p>
          </div>

          {/* Sonablate Advantages */}
          <div className="mb-12">
            <img
              src="/sonablate-hifu-advantages.jpg"
              alt="Sonablate HIFU Advantages: Real-time feedback, minimally invasive, adjustable energy, repeatable, radiation-free, tissue sparing, minimal side effects"
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          {/* PCL Team's Critical Role */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-12 border-2 border-orange-300">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
              🔥 What the Prostate Care Team Actually DO During HIFU
            </h2>
            
            <div className="bg-white rounded-xl p-6 mb-6 border-2 border-orange-200">
              <p className="text-gray-800 font-medium mb-4 text-center">
                HIFU isn't "set it and forget it" - it requires <strong>constant expert monitoring</strong> to prevent thermal injury while achieving complete ablation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">🌡️</div>
                  <h3 className="text-lg font-bold text-red-900">Real-Time Thermal Monitoring</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Our Application Specialists continuously monitor temperature mapping throughout the procedure:
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• Track focal zone temperatures (~90°C at target)</li>
                  <li>• Monitor surrounding tissue to prevent overheating</li>
                  <li>• Watch for thermal buildup between pulses</li>
                  <li>• Adjust energy levels in real-time based on feedback</li>
                  <li>• Ensure cooling periods prevent collateral damage</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">⚠️</div>
                  <h3 className="text-lg font-bold text-orange-900">Safety Shut-Off Management</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Automated safety systems require expert interpretation and override decisions:
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• Evaluate automatic shut-off alerts</li>
                  <li>• Distinguish true safety concerns from false positives</li>
                  <li>• Make real-time decisions on pulse adjustments</li>
                  <li>• Coordinate with surgeon on repositioning if needed</li>
                  <li>• Document all thermal events for post-procedure review</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">🎯</div>
                  <h3 className="text-lg font-bold text-blue-900">Treatment Planning & Execution</h3>
                </div>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• Pre-procedure MRI contouring and target mapping</li>
                  <li>• Setup and calibration of HIFU system</li>
                  <li>• Real-time ultrasound-MRI fusion alignment</li>
                  <li>• Systematic ablation pattern execution</li>
                  <li>• Quality assurance of complete coverage</li>
                  <li>• Post-procedure imaging verification</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">📊</div>
                  <h3 className="text-lg font-bold text-emerald-900">Data Management & Reporting</h3>
                </div>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• Capture all thermal dose data for each pulse</li>
                  <li>• Generate detailed treatment maps</li>
                  <li>• Document ablation coverage relative to MRI targets</li>
                  <li>• Create post-procedure reports for clinical team</li>
                  <li>• Archive data for follow-up correlation</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl p-6">
              <p className="font-semibold text-center mb-2">✨ The PCL Difference: Expert Oversight Throughout</p>
              <p className="text-sm text-emerald-50 text-center">
                You focus on the patient and clinical decisions. We handle the complex thermal management, system monitoring, and technical execution that makes HIFU safe and effective.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <img
                src="/hifu-treatment-system-medical-equipment-in-modern-.jpg"
                alt="HIFU Treatment System"
                className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
              />

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Precise Energy Delivery Mechanism
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  HIFU uses converging ultrasound waves to raise temperature ~90°C at the focal point while sparing
                  intervening tissue. Only at the focal spot (size of a rice grain) is intensity high enough to induce
                  rapid heating and coagulative necrosis.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Role in Focal Therapy Platform
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Multi-Modal Precision Platform</h3>
                  <p className="text-gray-600 text-sm">
                    HIFU complements other focal modalities (like cryotherapy or IRE), allowing clinicians to tailor the
                    energy source to tumor location and patient needs. HIFU's transrectal approach makes it well-suited
                    for posterior or mid-gland tumors.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">MRI-Ultrasound Fusion Integration</h3>
                  <p className="text-gray-600 text-sm">
                    Often combined with MRI-ultrasound fusion guidance for planning and real-time alignment, ensuring
                    ultrasound energy is delivered exactly to the intended region with computer-controlled precision.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Real-Time Monitoring and Safety</h3>
                  <p className="text-gray-600 text-sm">
                    Modern HIFU platforms employ MRI or Doppler ultrasound feedback to monitor treatment progress with
                    thermal mapping and automatic safety shut-offs for each pulse.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Excellent Cancer Control
              </h3>
              <p className="text-gray-600 text-sm">
                Only ~9% of men had significant cancer persisting in ablated areas on 2-year follow-up biopsies. High
                overall survival (&gt;98%) and low progression rates across global series.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Minimal Side Effects
              </h3>
              <p className="text-gray-600 text-sm">
                Preservation of erectile function and continence in majority of cases. Far fewer side-effects than
                whole-gland treatments with targeted cancer control and minimal collateral damage.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Outpatient Repeatability
              </h3>
              <p className="text-gray-600 text-sm">
                Can be delivered as an outpatient procedure with repeatability if needed. Positioned for
                intermediate-risk disease that is confined and visible on imaging.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Premium HIFU Technology Without Ownership Burden
            </h2>
            <p className="text-gray-700 mb-4">
              A leading surgeon wanted to perform HIFU procedures for prostate cancer at their private hospital, but
              only had 5-10 suitable cases per year. Purchasing a HIFU system outright would be impractical. Instead,
              they partnered with our on-demand service – gaining access to state-of-the-art HIFU only when needed.
            </p>
            <p className="text-gray-700 text-sm">
              The result? Access to the latest technology with full support, without the burden of owning expensive
              equipment that sits idle most of the year.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <img
                src="/hifu-treatment-system-medical-equipment-in-modern-.jpg"
                alt="HIFU Treatment System"
                className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
              />

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Minimally Invasive Excellence
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  HIFU provides precise, non-invasive treatment with reduced side effects and faster recovery times. Our
                  service ensures optimal outcomes through expert guidance and premium equipment.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Latest Technology, Only When You Need It
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Hospital-Grade Equipment On-Demand</h3>
                  <p className="text-gray-600 text-sm">
                    We bring premium HIFU systems directly to your operating theatre, scheduled for the exact days you
                    plan specialist procedures. When not in use, it's not taking up space or budget.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Expert Clinical Support</h3>
                  <p className="text-gray-600 text-sm">
                    Our Clinical Technology Specialists set up the device, perform safety checks, and remain present
                    during procedures to provide real-time guidance and ensure smooth operation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Comprehensive Training Included</h3>
                  <p className="text-gray-600 text-sm">
                    In-person training for surgeons, anesthetists, and nurses. Refresher guidance on latest features
                    ensures your team stays sharp between cases.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Zero Maintenance Costs
              </h3>
              <p className="text-gray-600 text-sm">
                We handle all maintenance, calibration, and software updates off-site. Equipment arrives in optimal
                condition, ready to go, with no surprise maintenance bills.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Flexible Scalable Usage
              </h3>
              <p className="text-gray-600 text-sm">
                Use as often or sparingly as needed – 5 cases or 50. The program scales with your demand, accommodating
                more frequent sessions seamlessly as your caseload grows.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Improved Patient Care
              </h3>
              <p className="text-gray-600 text-sm">
                Offer cutting-edge HIFU procedures locally that you might otherwise refer to larger centers. Patients
                get timely access to advanced treatments in your facility.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 text-center mb-40">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Ready to Expand Your HIFU Capabilities?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join surgical teams who are staying at the cutting edge without overextending resources. Premium HIFU
              solutions delivered with precision and clinical excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
                Schedule Consultation
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
