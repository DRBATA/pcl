"use client"
import { motion } from "framer-motion"
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")

  const footerLinks = {
    Services: [
      { name: "Biopsy Planning", href: "/services/biopsy-plan" },
      { name: "MR/US Fusion Biopsy", href: "/services/freehand-fusion" },
      { name: "HIFU Treatment", href: "/services/hifu" },
      { name: "How It Works", href: "/services" },
    ],
    Company: [
      { name: "About PCL", href: "/about/pcl" },
      { name: "Clinician Experience", href: "/about/partners" },
      { name: "Equipment & Technology", href: "/about/equipment-services" },
      { name: "Privacy Statement", href: "/about/privacy" },
    ],
    Contact: [
      { name: "Get in Touch", href: "/contact" },
      { name: "Request Equipment", href: "/contact" },
      { name: "Book Consultation", href: "/contact" },
    ],
  }

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/prostate-care-limited/" },
  ]

  const partners = [
    { name: "SonaCare Medical", logo: "/partners/sonacare.png" },
    { name: "BK Ultrasound", logo: "/partners/bk.png" },
    { name: "MIM Software", logo: "/partners/mim.png" },
    { name: "Civco Medical", logo: "/partners/civco.png" },
    { name: "Parity Medical", logo: "/partners/parity.png" },
    { name: "AngioDynamics", logo: "/partners/angio.png" },
    { name: "Koelis", logo: "/partners/koelis.png" },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter signup logic here
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Pink Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500"></div>
      
      {/* Main Footer */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container-custom py-16 lg:py-20">
          
          {/* Top Section - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Prostate Care Limited
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                Innovators in precision biopsy. We provide state-of-the-art MR/US fusion biopsy and HIFU services,
                bringing advanced prostate cancer diagnostics directly to your hospital.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-3 mb-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSubmit} className="mt-6">
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Stay Updated</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {footerLinks.Services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm group flex items-center"
                    >
                      <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {footerLinks.Company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm group flex items-center"
                    >
                      <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 mt-6">
                {footerLinks.Contact.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm group flex items-center"
                    >
                      <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Info</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="tel:02070368850" 
                    className="flex items-start gap-3 text-slate-400 hover:text-emerald-400 transition-colors group"
                  >
                    <Phone size={18} className="mt-0.5 text-emerald-500" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Phone</p>
                      <p className="text-sm">0207 036 8850</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@prostatecare.co.uk" 
                    className="flex items-start gap-3 text-slate-400 hover:text-emerald-400 transition-colors group"
                  >
                    <Mail size={18} className="mt-0.5 text-emerald-500" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Email</p>
                      <p className="text-sm break-all">info@prostatecare.co.uk</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-slate-400">
                    <MapPin size={18} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Address</p>
                      <p className="text-sm">Milton Park Innovation Centre<br />Abingdon<br />OX14 4RY</p>
                    </div>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Partner Logos Scrolling Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-slate-700 pt-12 mb-12"
          >
            <h4 className="text-center text-sm uppercase tracking-wider text-slate-400 mb-8">
              Our Technology Partners
            </h4>
            
            {/* Scrolling Container */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                {partners.map((partner, index) => (
                  <motion.div
                    key={`partner-1-${index}`}
                    className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="h-12 w-32 flex items-center justify-center bg-slate-800/50 rounded-lg px-4">
                      <span className="text-slate-400 text-sm font-medium">{partner.name}</span>
                    </div>
                  </motion.div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner, index) => (
                  <motion.div
                    key={`partner-2-${index}`}
                    className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="h-12 w-32 flex items-center justify-center bg-slate-800/50 rounded-lg px-4">
                      <span className="text-slate-400 text-sm font-medium">{partner.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Gradient Overlays */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="pt-8 border-t border-slate-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p>&copy; {currentYear} Prostate Care Limited. All rights reserved.</p>
                <span className="hidden md:inline text-slate-600">|</span>
                <a href="/about/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
                <span className="hidden md:inline text-slate-600">|</span>
                <span>No cookies used</span>
              </div>
              <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                <p className="text-xs text-slate-400">
                  <span className="text-emerald-400">●</span> For Healthcare Professionals Only
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS for scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </footer>
  )
}
