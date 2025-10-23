"use client"
import { motion } from "framer-motion"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function NewsletterSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-custom">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <BlurPanel className="p-8 lg:p-12 bg-white/40 backdrop-blur-md grain-texture">
              <div className="text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                  <AnimatedText text="Connect with " delay={0.2} />
                  <span className="italic font-light">
                    <AnimatedText text="Prostate Care Limited." delay={0.5} />
                  </span>
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  Follow us for the latest updates on precision diagnostics and advanced prostate care technologies.
                </p>

                <div className="flex justify-center">
                  <motion.a
                    href="https://www.linkedin.com/company/the-focal-therapy-clinic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-[#0077B5] text-white rounded-full font-medium hover:bg-[#005885] transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </motion.a>
                </div>
              </div>
            </BlurPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
