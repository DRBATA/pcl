import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PatientReferralPage() {
  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              FTC Referral Pathway
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ensuring a smooth and clear referral pathway for integrating focal therapy services into clinical
              practice. Collaboration between the Focal Therapy Clinic (FTC) and PCL designed to streamline patient
              management.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Referral & Consultation
              </h3>
              <p className="text-gray-600 text-sm">
                Patients referred to FTC for evaluation. Specialist team conducts consultation, reviews history, and
                arranges diagnostics.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Diagnostic Workup
              </h3>
              <p className="text-gray-600 text-sm">
                FTC manages clinical care including targeted biopsies using MRI/ultrasound fusion guidance.
                Multidisciplinary panel determines focal therapy appropriateness.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Treatment Planning
              </h3>
              <p className="text-gray-600 text-sm">
                FTC formulates treatment plan while PCL prepares specialized devices and ensures surgical team training
                and technical readiness.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Procedure & Follow-up
              </h3>
              <p className="text-gray-600 text-sm">
                FTC clinical team performs procedure with PCL technical support. Post-treatment care and long-term
                surveillance managed by FTC.
              </p>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Procedure Day – Surgical Support Partnership
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-800">FTC Clinical Responsibility</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• Patient admitted under FTC clinical team</li>
                    <li>• Surgeons and anesthetists manage clinical decisions</li>
                    <li>• Patient safety and treatment decisions</li>
                    <li>• Clinical precision and medical oversight</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-800">PCL Technical Support</h4>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• On-site specialist for device setup and calibration</li>
                    <li>• Real-time image fusion and device settings assistance</li>
                    <li>• Technical guidance for advanced platform features</li>
                    <li>• Target alignment and energy delivery parameters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Clear Role Delineation
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">FTC - Clinical Excellence</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Dedicated patient care and medical oversight</li>
                    <li>• Clinical consultation and treatment decisions</li>
                    <li>• Patient consent and counseling</li>
                    <li>• Post-operative recovery and follow-up</li>
                    <li>• Long-term surveillance and outcome reporting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">PCL - Technical Platform</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Precision tools and specialized device support</li>
                    <li>• Technical training and platform expertise</li>
                    <li>• Device calibration and software preparation</li>
                    <li>• Treatment reports and imaging records</li>
                    <li>• Ongoing technical support and upgrades</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-r-xl">
            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Partnership Approach
            </h3>
            <p className="text-gray-700 mb-4">
              Throughout this pathway, the tone is one of partnership: FTC provides the dedicated patient care and
              medical oversight, and PCL provides the precision tools and training that empower the surgical team. Clear
              communication and defined roles ensure that surgeons and their teams in private hospitals know exactly
              what to expect at each step.
            </p>
            <p className="text-gray-700 text-sm">
              By leveraging FTC's clinical excellence and PCL's specialized platform support, patients move smoothly
              from referral to treatment to follow-up in a safe, efficient manner.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Referral Criteria
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Clinical Factors</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Localized prostate cancer (T1-T2)</li>
                  <li>• Appropriate PSA levels</li>
                  <li>• Suitable Gleason score</li>
                  <li>• MRI-visible lesions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Patient Factors</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Informed consent capability</li>
                  <li>• Suitable for general anesthesia</li>
                  <li>• Commitment to follow-up</li>
                  <li>• Realistic expectations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h3 className="text-lg font-semibold mb-2">Contact for Referrals</h3>
            <p className="text-gray-700 text-sm mb-3">
              For patient referral inquiries and clinical consultations, please contact our clinical coordination team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:02070368850"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Call: 0207 036 8850
              </a>
              <a
                href="mailto:info@prostatecare.co.uk"
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Email: info@prostatecare.co.uk
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
