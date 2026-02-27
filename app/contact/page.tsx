"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

function ContactForm() {
  const searchParams = useSearchParams()
  const enquiryType = searchParams.get('type')
  const [title, setTitle] = useState("")
  const [firstName, setFirstName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [selectedType, setSelectedType] = useState(enquiryType || "")
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSelectedType(enquiryType || "")
  }, [enquiryType])
  
  const getHeadline = () => {
    if (selectedType === 'equipment') return 'Request Equipment'
    if (selectedType === 'consultation') return 'Book a Consultation'
    return 'Ready to Elevate Your Practice?'
  }
  
  const getSubtext = () => {
    if (selectedType === 'equipment') return 'Tell us about your equipment needs'
    if (selectedType === 'consultation') return 'Schedule a call with our team'
    return "Quick contact - we'll handle the rest"
  }

  const handleOpenEmail = () => {
    const name = [title, firstName, surname].filter(Boolean).join(' ') || 'PCL website visitor'
    const subjectBase = selectedType ? selectedType.replace(/^\w/, (c: string) => c.toUpperCase()) : 'Website'
    const subject = `${subjectBase} enquiry from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\nEnquiry Type: ${selectedType || 'Not specified'}\n\nMessage:\n${message}`
    const mailtoLink = `mailto:claire.lloyd@prostatecare.co.uk?cc=brian.lynch@prostatecare.co.uk&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">
          {selectedType ? (
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{getHeadline()}</span>
          ) : (
            <>Ready to <span className="italic bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Elevate</span> Your Practice?</>
          )}
        </h2>
        <p className="text-slate-600 text-lg">{getSubtext()}</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleOpenEmail() }} className="space-y-6">
        {/* Name inputs */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="px-4 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="px-4 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            className="px-4 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm text-slate-800 placeholder-slate-400 shadow-sm"
          />
        </div>
        
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full px-5 py-5 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-lg text-slate-800 placeholder-slate-400 shadow-sm"
        />

        {/* Enquiry Type Dropdown */}
        <select 
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
          className="w-full px-5 py-5 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-lg text-slate-800 shadow-sm appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
        >
          <option value="" disabled>Select enquiry type...</option>
          <option value="equipment">Equipment Enquiry</option>
          <option value="consultation">Consultation Request</option>
          <option value="general">General Enquiry</option>
          <option value="partnership">Partnership Discussion</option>
        </select>

        <textarea
          placeholder="How can we help?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-base text-slate-800 placeholder-slate-400 shadow-sm resize-none"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {selectedType === 'equipment' ? 'Send equipment enquiry' : selectedType === 'consultation' ? 'Send consultation request' : 'Send message'}
        </button>

      </form>
    </div>
  )
}

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
                    <a href="tel:02070368850" className="text-slate-600 text-lg hover:text-teal-600 transition-colors">0207 036 8850</a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800 mb-1">Email</p>
                    <a href="mailto:info@prostatecare.co.uk" className="text-slate-600 text-lg hover:text-teal-600 transition-colors">info@prostatecare.co.uk</a>
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
                  <p className="font-semibold">Jane Terry</p>
                </div>
              </div>
            </div>
            
            {/* Form Card - Dynamic based on URL params */}
            <Suspense fallback={<div className="bg-white/40 backdrop-blur-xl rounded-3xl p-10 animate-pulse h-96" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
