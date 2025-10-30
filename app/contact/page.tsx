import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-32 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 min-h-screen relative overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent"></div>
        
        <div className="container-custom py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            {/* Contact Info Card - Glassmorphism */}
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800 mb-1">Phone</p>
                    <p className="text-slate-600 text-lg">0207 036 8850</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800 mb-1">Email</p>
                    <p className="text-slate-600 text-lg">info@prostatecare.co.uk</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800 mb-1">Address</p>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Milton Park Innovation Centre
                      <br />
                      99 Park Drive
                      <br />
                      Abingdon
                      <br />
                      OX14 4RY
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-2xl p-7 border border-emerald-200/50 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Operations Team
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  To book our service or find out more, please contact our operations team:
                </p>
                <div className="space-y-2 text-slate-800">
                  <p className="font-semibold">Claire Lloyd</p>
                  <p className="font-semibold">Emma Frame</p>
                  <p className="font-semibold">Maggie Weir</p>
                  <p className="font-semibold">Jane Terry</p>
                </div>
              </div>
            </div>
            
            {/* Form Card - Glassmorphism */}
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">
                  Ready to <span className="italic bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Elevate</span> Your Practice?
                </h2>
                <p className="text-slate-600 text-lg">
                  Quick contact - we'll handle the rest
                </p>
              </div>

              <form action="mailto:info@prostatecare.co.uk" method="post" encType="text/plain" className="space-y-6">
                {/* Name inputs */}
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Title"
                    className="px-4 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="px-4 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                  />
                </div>
                
                {/* Email */}
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-5 py-5 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-lg text-slate-800 placeholder-slate-400 shadow-sm"
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </button>
                
                <p className="text-center text-sm text-slate-500 mt-4">
                  We'll contact you within 24 hours to arrange everything
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
