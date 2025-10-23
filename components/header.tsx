"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleDropdownEnter = (dropdown: string) => {
    if (!activeDropdown) {
      setActiveDropdown(dropdown)
    }
  }

  const handleDropdownLeave = () => {
    // Only close if not clicked/locked open
    setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 animate-slide-down",
          "bg-gradient-to-r from-primary to-primary/80 text-white py-2 sm:py-4 text-xs sm:text-sm font-medium tracking-wide min-h-[48px] sm:min-h-[56px] flex items-center",
          "backdrop-blur-md border-b border-white/10",
          isScrolled ? "shadow-lg" : "",
        )}
      >
        <div className="container-custom flex justify-center items-center gap-4 sm:gap-16 w-full px-4">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="font-medium truncate">0207 036 8850</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="font-medium truncate">info@prostatecare.co.uk</span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "fixed top-12 sm:top-14 left-0 right-0 z-[99] transition-all duration-300 animate-slide-down",
          "backdrop-blur-md border-b border-border/50",
          isScrolled ? "bg-background/98 shadow-lg" : "bg-background/95",
        )}
        style={{ animationDelay: "0.1s" }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18 relative py-2 px-4 sm:px-0">
            <div className="flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <Link href="/" className="flex items-center" aria-label="Prostate Care Limited Home">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%202%2C%202025%2C%2004_52_58%20PM-0V8eZCYOc0it3OPujSqYjhV2h32Oid.png"
                  alt="Prostate Care Limited"
                  width={280}
                  height={75}
                  className="h-22 lg:h-35 w-auto"
                  priority
                />
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
            </button>

            <nav className="hidden lg:flex items-center space-x-12">
              <Link
                href="/"
                className="text-primary hover:text-primary/80 font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("about")}
                onMouseLeave={handleDropdownLeave}
              >
                <button 
                  onClick={() => handleDropdownToggle("about")}
                  className="flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group"
                >
                  About
                  <ChevronDown
                    className={cn("w-4 h-4 transition-all duration-300", activeDropdown === "about" && "rotate-180")}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
                {activeDropdown === "about" && (
                  <div className="absolute top-full left-0 mt-1 w-64 glass-panel rounded-2xl shadow-2xl border border-border/20 py-4 overflow-hidden animate-fade-in-scale">
                    <Link
                      href="/about/pcl"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      About PCL
                    </Link>
                    <Link
                      href="/about/partners"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      Clinician Experience
                    </Link>
                    <Link
                      href="/about/equipment-services"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      Equipment & Services
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("services")}
                onMouseLeave={handleDropdownLeave}
              >
                <button 
                  onClick={() => handleDropdownToggle("services")}
                  className="flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group"
                >
                  Services
                  <ChevronDown
                    className={cn("w-4 h-4 transition-all duration-300", activeDropdown === "services" && "rotate-180")}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 mt-1 w-64 glass-panel rounded-2xl shadow-2xl border border-border/20 py-4 overflow-hidden animate-fade-in-scale">
                    <Link
                      href="/services/biopsy-plan"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      mpMRI Fusion
                    </Link>
                    <Link
                      href="/services/freehand-fusion"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      On-The-Day Setup
                    </Link>
                    <Link
                      href="/services"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      How It Works
                    </Link>
                    <Link
                      href="/services/hifu"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      HIFU
                    </Link>
                    <Link
                      href="/services/ire-nanoknife"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      IRE/NanoKnife
                    </Link>
                    <Link
                      href="/services/patient-referral"
                      className="block px-6 py-3.5 hover:bg-muted/50 text-primary hover:text-primary/80 font-medium text-[14px] tracking-wide transition-all duration-200"
                    >
                      Patient Referral-FTC
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/the-focal-therapy-clinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-all duration-300 p-2.5 rounded-full hover:bg-muted/50 hover:shadow-md hover:scale-110 hover:-rotate-3"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden bg-background border-t border-border py-4 animate-fade-in">
              <nav className="flex flex-col space-y-4 px-4">
                <Link
                  href="/"
                  className="text-primary font-medium text-[15px] tracking-wide py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="space-y-2">
                  <div className="text-primary font-medium text-[15px] tracking-wide py-2">About</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/about/pcl"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About PCL
                    </Link>
                    <Link
                      href="/about/partners"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Clinician Experience
                    </Link>
                    <Link
                      href="/about/equipment-services"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Equipment & Services
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-primary font-medium text-[15px] tracking-wide py-2">Services</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/services/biopsy-plan"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Biopsy Planning
                    </Link>
                    <Link
                      href="/services/fusion-biopsy"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      On-Site Fusion
                    </Link>
                    <Link
                      href="/services/freehand-fusion"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Freehand MRI/US Fusion
                    </Link>
                    <Link
                      href="/services/hifu"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      HIFU
                    </Link>
                    <Link
                      href="/services/ire-nanoknife"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      IRE/NanoKnife
                    </Link>
                    <Link
                      href="/services/patient-referral"
                      className="block text-[14px] py-1 text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Patient Referral-FTC
                    </Link>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="text-primary font-medium text-[15px] tracking-wide py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
