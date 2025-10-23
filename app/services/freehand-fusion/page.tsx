"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function SetupChecklist() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set())

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index)
    } else {
      newOpenSections.add(index)
    }
    setOpenSections(newOpenSections)
  }

  const checklistSections = [
    {
      title: "Transportation Stand Assembly",
      duration: "2 min",
      steps: [
        "Assemble 4 components: pole, rolling base, locating washer, locking knob",
        "Invert rolling base over threaded pole stud",
        "Insert tapered locating washer",
        "Tighten with locking knob"
      ]
    },
    {
      title: "Table Mount Attachment",
      duration: "3 min",
      steps: [
        "Remove mount from transportation stand",
        "Slide mount onto table rails",
        "Push close to table edge",
        "Tighten securing knob"
      ]
    },
    {
      title: "Stabilizer Mounting",
      duration: "2 min",
      steps: [
        "Loosen quick-connect knob on table mount",
        "Align stabilizer dovetail plate with mount",
        "Slide plates together",
        "Tighten securing knob firmly"
      ]
    },
    {
      title: "EX3 Stepper Attachment",
      duration: "3 min",
      steps: [
        "Identify triangular plates on stepper base and stabilizer top",
        "Loosen side knob on stabilizer",
        "Slide stepper onto stabilizer (plates align)",
        "Tighten side knob securely"
      ]
    },
    {
      title: "6 Degrees of Freedom Setup",
      duration: "2 min",
      steps: [
        "Loosen control knob #1 (counterclockwise) - unit becomes free-floating",
        "Position stepper for patient access",
        "Test fine adjustment mechanism: X (left-right), Y (vertical), Z (forward-back)",
        "Test rotational adjustments: Pitch, Yaw, Roll",
        "Tighten control knob #1 when positioned"
      ]
    },
    {
      title: "Endocavity Balloon Application",
      duration: "4 min",
      steps: [
        "Apply gel to probe tip",
        "Identify smooth (non-stiff) balloon section",
        "Slide balloon over probe - smooth part at transducer elements",
        "Attach 20-30cc syringe with fluid",
        "Fill balloon vertically to remove air bubbles",
        "Tap and refill 2-3 times until air-free"
      ]
    },
    {
      title: "Probe Insertion into Cradle",
      duration: "3 min",
      steps: [
        "Select correct cradle for your probe model",
        "Loosen cradle opening knob",
        "Insert probe per manufacturer specifications",
        "Secure probe with cradle knob",
        "Verify probe is locked in position"
      ]
    },
    {
      title: "Sterile Draping",
      duration: "5 min",
      steps: [
        "Orient drape with 'TOP' marking and arrow toward patient",
        "Unfold drape over entire stepper/stabilizer setup",
        "Align yellow dots with grid mounting holes",
        "Remove adhesive tabs and secure drape sides",
        "Position small X marks over grid holes"
      ]
    },
    {
      title: "Template Grid Installation",
      duration: "2 min",
      steps: [
        "Check sterile grid packaging",
        "Confirm correct grid orientation (A-G or A-M side per ultrasound system)",
        "Punch mounting posts through drape at X marks",
        "Tighten grid mounting screws (can work through drape or underneath)"
      ]
    },
    {
      title: "Final Positioning",
      duration: "3 min",
      steps: [
        "Loosen main positioning knob",
        "Position probe just outside rectum",
        "Use ONLY fine adjustment mechanism for rectal insertion",
        "Loosen side knobs to advance grid to perineum",
        "Verify all adjustments locked before starting"
      ]
    },
    {
      title: "Post-Procedure Breakdown",
      duration: "5 min",
      steps: [
        "Loosen knob and retract from patient",
        "Remove drape and grid together (dispose properly)",
        "Remove probe from cradle",
        "Remove endocavity balloon",
        "Clean probe before high-level disinfection",
        "Optional: Remove cradle for reprocessing"
      ]
    }
  ]

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-medical-green)" }}>
          DIY Setup Checklist 🛠️
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Total Time:</strong> ~34 minutes (if you know what you're doing!)
        </p>
        <p className="text-sm text-orange-700 font-medium">
          Or... let our team handle it for you. ✨
        </p>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {checklistSections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection(index)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="text-left">
                  <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
                  <span className="text-xs text-gray-500 ml-2">({section.duration})</span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  openSections.has(index) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openSections.has(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 bg-gray-50">
                    <ul className="space-y-1.5">
                      {section.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-300">
        <p className="text-sm font-medium text-green-900 text-center">
          💡 <strong>Pro Tip:</strong> Our Application Specialists handle all of this on-site, so you can focus on the patient.
        </p>
      </div>
    </div>
  )
}

export default function FreehandFusionPage() {
  return (
    <>
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48">
        <div className="container-custom py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--color-medical-green)" }}>
              MRI/US Fusion Biopsy
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Advanced fusion technology merging pre-acquired MRI lesions with real-time ultrasound. Two approaches - choose based on your clinical needs.
            </p>
          </div>

          {/* Critical: The Missing Key */}
          <div className="bg-gradient-to-r from-red-900 via-orange-900 to-amber-900 text-white rounded-2xl p-8 mb-16 border-4 border-orange-500">
            <h2 className="text-3xl font-bold text-center mb-6">
              🔑 The Secret Missing Key Surgeons Don't Realize
            </h2>
            <p className="text-center text-lg mb-6 max-w-4xl mx-auto leading-relaxed">
              <strong>The precise matching of TARGET → PROBE POSITION → ULTRASOUND FIELD</strong> is what makes or breaks fusion accuracy.
            </p>
            <p className="text-center text-amber-100 mb-4 max-w-3xl mx-auto">
              Surgeons focus on the clinical decision. But they don't realize they're <strong>completely dependent</strong> on every interlocking step in the chain of precision - from Dr. Allen's virtual probe contouring, to millimeter-perfect equipment setup, to real-time field matching during the procedure.
            </p>
            <div className="bg-white/20 rounded-xl p-6 mt-6 border-2 border-amber-400">
              <p className="text-center font-bold text-xl mb-2">
                Without this precise chain, fusion is just guesswork.
              </p>
              <p className="text-center text-sm text-amber-100">
                That's why PCL's Application Specialists handle every technical detail - so surgeons can focus on what they do best.
              </p>
            </div>
          </div>

          {/* Two Approaches - Honest Comparison */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-16 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--color-medical-green)" }}>
              Two Proven Approaches to MRI Fusion
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Freehand Approach */}
              <div className="bg-white rounded-xl p-6 border-2 border-blue-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🎯</div>
                  <h3 className="text-xl font-bold text-blue-900">Freehand (TP Pivot Pro)</h3>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 italic">
                  Cognitive navigation with disposable needle guide - simple, fast, effective
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Minimal Setup</p>
                      <p className="text-xs text-gray-600">Disposable guide, no rigid template, quick to start</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Office-Based Procedures</p>
                      <p className="text-xs text-gray-600">Local anesthesia, outpatient setting, reduced costs</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Full Prostate Access</p>
                      <p className="text-xs text-gray-600">Pivots ±20°, height adjustable, reaches anterior zones</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Minimized Punctures</p>
                      <p className="text-xs text-gray-600">Coaxial needle reduces perineal puncture sites</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Best For:</p>
                  <p className="text-xs text-blue-800">
                    Experienced operators, targeted biopsies, office settings, fast turnaround
                  </p>
                </div>
              </div>

              {/* Stepper Approach */}
              <div className="bg-white rounded-xl p-6 border-2 border-emerald-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">📐</div>
                  <h3 className="text-xl font-bold text-emerald-900">Stepper (EX3 Grid)</h3>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 italic">
                  Rigid grid-based systematic sampling - reproducible mapping with coordinates
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">6 Degrees of Freedom</p>
                      <p className="text-xs text-gray-600">Precise positioning: X, Y, Z + pitch, yaw, roll</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Grid Coordinates (A-G, 1-7)</p>
                      <p className="text-xs text-gray-600">Every core location documented and reproducible</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Prostate Immobilization</p>
                      <p className="text-xs text-gray-600">No bending or drift - fusion stays accurate</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-green-600 text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Systematic Patterns</p>
                      <p className="text-xs text-gray-600">3D sampling captures full tumor heterogeneity</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                  <p className="text-xs font-semibold text-emerald-900 mb-1">Best For:</p>
                  <p className="text-xs text-emerald-800">
                    Complex cases, reproducible mapping, capturing heterogeneity, research protocols
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border-2 border-gray-300">
              <p className="text-center text-gray-800 font-medium mb-2">
                🤝 <strong>Both approaches use MRI fusion. Both work excellently.</strong>
              </p>
              <p className="text-center text-sm text-gray-600">
                The choice depends on your clinical workflow, case complexity, and whether you need systematic coordinate mapping. We support both - you decide.
              </p>
            </div>
          </div>

          {/* The Secret: Water Balloon Immobilization */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 mb-12 border-2 border-cyan-200">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--color-medical-green)" }}>
              🎈 The Key to Accurate Fusion: Prostate Immobilization
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white rounded-xl p-6 border border-cyan-300">
                  <h3 className="text-xl font-bold mb-4 text-cyan-900">Water-Filled Endocavity Balloon</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Whether freehand or stepper, <strong>both approaches use a water-filled balloon</strong> around the ultrasound probe. This is critical for fusion accuracy.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="text-2xl">🔒</div>
                      <div>
                        <p className="font-semibold text-sm">Prevents Prostate Distortion</p>
                        <p className="text-xs text-gray-600">The water cushion stops the prostate from bending or deforming during needle insertion</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="text-2xl">📍</div>
                      <div>
                        <p className="font-semibold text-sm">Positions the Gland</p>
                        <p className="text-xs text-gray-600">Gently positions the prostate optimally for imaging and targeting</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <p className="font-semibold text-sm">Maintains Fusion Accuracy</p>
                        <p className="text-xs text-gray-600">MRI overlay stays aligned - no drift between planning and sampling</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="text-2xl">🌊</div>
                      <div>
                        <p className="font-semibold text-sm">Enhanced Imaging</p>
                        <p className="text-xs text-gray-600">Fluid around the probe creates better acoustic window for clearer ultrasound</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="bg-cyan-900 text-white rounded-lg p-4 mb-4">
                  <p className="font-semibold mb-2">💡 Why This Matters</p>
                  <p className="text-sm text-cyan-50">
                    Without immobilization, the prostate bends and shifts during biopsy. Your carefully planned MRI targets would no longer align with the ultrasound view. The water balloon solves this.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-gray-800 mb-2">📋 Setup Process (from our checklist)</p>
                  <ul className="text-xs text-gray-700 space-y-1.5">
                    <li>• Apply gel to probe tip</li>
                    <li>• Slide balloon over probe (smooth section at transducer)</li>
                    <li>• Fill with 20-30cc fluid using syringe</li>
                    <li>• Remove air bubbles by tapping and refilling</li>
                    <li>• Result: Stable, immobilized prostate for accurate targeting</li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 italic">
                    This technique works for both freehand and stepper approaches
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
              TP Pivot Pro™ - The Freehand Approach
            </h2>
            <div className="aspect-video w-full max-w-3xl mx-auto mb-6">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/kEkCO35X5PA"
                title="TP Pivot Pro Freehand Fusion"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-gray-700 text-center text-sm">
              The smarter approach to transperineal prostate biopsies - freehand, minimally invasive, with precise access to the entire prostate gland
            </p>
          </div>

          {/* Why Rigid Stepper Alignment Matters */}
          <div className="bg-gradient-to-br from-blue-900 to-emerald-900 text-white rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why All This Complexity? The Clinical Advantage</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold mb-3">Rigid Grid Alignment</h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  The stepper's 6 degrees of freedom allow <strong>precise, repeatable positioning</strong> of the template grid. 
                  Once aligned, every biopsy core can be accurately mapped to MRI-contoured targets with millimeter precision.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-xl font-bold mb-3">Prostate Immobilization</h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  The rigid setup <strong>prevents prostate bending or distortion</strong> during sampling. 
                  This ensures your MRI fusion overlay remains accurate throughout the entire procedure - no drift, no guessing.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">📐</div>
                <h3 className="text-xl font-bold mb-3">3D Systematic Sampling</h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Target contoured areas with <strong>systematic 3D sampling patterns</strong> through the grid. 
                  Maximize your chance of capturing positive cores by thoroughly sampling the entire suspicious region.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-3">🧬</div>
                <h3 className="text-xl font-bold mb-3">Capture Heterogeneity</h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Prostate cancer is <strong>spatially heterogeneous</strong>. Systematic grid-based sampling captures the full range 
                  of tumor grades within the contoured volume - critical for accurate Gleason grading and treatment planning.
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/20 border-2 border-emerald-400 rounded-xl p-6 text-center">
              <p className="text-lg font-semibold mb-2">
                ⚡ <strong>The Bottom Line:</strong> Rigid alignment + Immobilization = Reproducible targeting
              </p>
              <p className="text-sm text-emerald-100">
                Without precise stepper positioning, MRI fusion becomes guesswork. With it, every core is mapped, tracked, and reproducible.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
                BK Medical Fusion Biopsy - Stepper in Action
              </h3>
              <div className="aspect-video w-full mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/g3qQb4zHu7c"
                  title="BK Medical Fusion Biopsy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <p className="text-gray-600 text-sm">
                See the BK fusion system with rigid stepper guidance for systematic MRI-targeted sampling
              </p>
            </div>

            <SetupChecklist />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Streamlined Workflow for Focal Therapy Planning
            </h2>
            <p className="text-gray-700 mb-4">
              Freehand MRI/ultrasound fusion fits seamlessly into focal therapy planning – MRI pinpoints the tumor focus
              beforehand, and during the procedure the clinician can dynamically align the ultrasound to that target in
              real time. The workflow is streamlined: target areas from mpMRI are imported or mentally registered, and
              the operator guides a biopsy needle or therapy applicator to the lesion using ultrasound, adjusting angles
              as needed.
            </p>
            <p className="text-gray-700 text-sm">
              This eliminates rigid templates and allows immediate fine-tuning of trajectory for precise, on-target
              sampling or ablation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <img
                src="/freehand-ultrasound-probe-with-mri-fusion-overlay-.jpg"
                alt="Freehand MRI/US Fusion Technology"
                className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
              />

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-medical-green)" }}>
                  Evidence-Based Clinical Benefits
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Studies show freehand transperineal MRI-US fusion achieves cancer detection rates comparable to
                  traditional grid-based guidance while eliminating infection risk and markedly lowering complications.
                  Equivalent yield with fewer samples and far less urinary retention (1% vs 10%).
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6" style={{ color: "var(--color-medical-green)" }}>
                Technique and Workflow
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Free Navigation Without Templates</h3>
                  <p className="text-gray-600 text-sm">
                    The surgeon navigates the ultrasound probe freely (often with a small tracker or cognitive
                    alignment), overlaying MRI-identified targets onto the live ultrasound. No rigid templates or bulky
                    stabilizing equipment required.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Outpatient Procedures Under Local Anesthesia</h3>
                  <p className="text-gray-600 text-sm">
                    Because the probe is not fixed in a stepper, procedures can often be done under local anesthesia in
                    an outpatient setting rather than under general anesthesia, reducing overhead and improving
                    efficiency.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Faster Setup and Cost Efficiency</h3>
                  <p className="text-gray-600 text-sm">
                    The lack of a template means fewer skin punctures and faster setup, translating to shorter procedure
                    times and cost efficiency. Streamlined workflow integration with minimal infrastructure
                    requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center" style={{ color: "var(--color-medical-green)" }}>
              Clinical Benefits in Focal Therapy
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Improved Targeting Accuracy</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Real-time alignment to exact MRI-visible lesions</li>
                  <li>• Direct sampling or treatment of identified targets</li>
                  <li>• Critical accuracy for focal therapy planning</li>
                  <li>• High rates of tumor control in targeted ablations</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Reduced Complications</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• No transrectal route eliminates infection risk</li>
                  <li>• Markedly lower urinary retention rates</li>
                  <li>• Fewer samples required for equivalent yield</li>
                  <li>• Minimal infrastructure and setup requirements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Precision Targeting
              </h3>
              <p className="text-gray-600 text-sm">
                Real-time MRI fusion overlay ensures accurate targeting of suspicious lesions with complete procedural
                flexibility.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Efficient Workflow
              </h3>
              <p className="text-gray-600 text-sm">
                Streamlined procedures with reduced setup time and enhanced workflow efficiency for busy clinical
                practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-medical-green)" }}>
                Expert Support
              </h3>
              <p className="text-gray-600 text-sm">
                Comprehensive training and on-site technical support ensure optimal outcomes and confident technology
                adoption.
              </p>
            </div>
          </div>

          <div className="text-center mb-40">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-medical-green)" }}>
              Experience Enhanced Fusion Technology
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Discover how freehand MRI/US fusion can enhance your procedural capabilities with flexible, on-demand
              access to cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                Request Demonstration
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                Technical Specifications
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
