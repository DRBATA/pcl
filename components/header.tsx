"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, X } from "lucide-react"
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const target = event.target as HTMLElement
        // Check if click is outside dropdown and button
        if (!target.closest('[data-dropdown-container]') && !target.closest('[data-dropdown-button]')) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [activeDropdown])

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleDropdownEnter = (dropdown: string) => {
    if (!activeDropdown) {
      setActiveDropdown(dropdown)
    }
  }

  const handleDropdownLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
          isScrolled ? "shadow-2xl" : "",
        )}
      >
        {/* Pink Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500"></div>
        
        {/* Main Header */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            isScrolled
              ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
              : "bg-white/95 backdrop-blur-md"
          )}
        >
          {/* Accent line at bottom - changes color based on scroll */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 ease-in-out",
              isScrolled
                ? "bg-teal-500 shadow-[0_2px_8px_rgba(20,184,166,0.3)]"
                : "bg-teal-600 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            )}
          />
          
          <div className="container-custom">
            <div className="flex items-center h-20 lg:h-24 relative py-4 px-4 sm:px-0">
              {/* Logo - Left */}
              <div className="flex-shrink-0 hover:scale-105 transition-transform duration-300 w-[300px] lg:w-[380px]">
                <Link href="/" className="flex items-center" aria-label="Prostate Care Limited Home">
                  <Image
                    src="/logos/PCL.png"
                    alt="Prostate Care Limited"
                    width={380}
                    height={100}
                    className="h-16 lg:h-20 w-auto"
                    priority
                  />
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className={cn(
                  "lg:hidden ml-auto p-2 rounded-md transition-all duration-300",
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-slate-900 hover:bg-slate-100"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Navigation - Centered */}
              <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12 absolute left-1/2 -translate-x-1/2">
                <Link
                  href="/"
                  className={cn(
                    "font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group",
                    isScrolled
                      ? "text-white hover:text-teal-400"
                      : "text-slate-900 hover:text-teal-600"
                  )}
                >
                  Home
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                      isScrolled ? "bg-teal-400" : "bg-teal-600"
                    )}
                  ></span>
                </Link>

                {/* About Dropdown */}
                <div className="relative">
                  <button 
                    data-dropdown-button
                    onClick={() => handleDropdownToggle("about")}
                    className={cn(
                      "flex items-center gap-1.5 font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group",
                      isScrolled
                        ? "text-white hover:text-teal-400"
                        : "text-slate-900 hover:text-teal-600"
                    )}
                  >
                    About
                    <ChevronDown
                      className={cn("w-4 h-4 transition-all duration-300", activeDropdown === "about" && "rotate-180")}
                    />
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                        isScrolled ? "bg-teal-400" : "bg-teal-600"
                      )}
                    ></span>
                  </button>
                </div>

                {/* Services Dropdown */}
                <div className="relative">
                  <button 
                    data-dropdown-button
                    onClick={() => handleDropdownToggle("services")}
                    className={cn(
                      "flex items-center gap-1.5 font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group",
                      isScrolled
                        ? "text-white hover:text-teal-400"
                        : "text-slate-900 hover:text-teal-600"
                    )}
                  >
                    Services
                    <ChevronDown
                      className={cn("w-4 h-4 transition-all duration-300", activeDropdown === "services" && "rotate-180")}
                    />
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                        isScrolled ? "bg-teal-400" : "bg-teal-600"
                      )}
                    ></span>
                  </button>
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    "font-medium text-[15px] tracking-wide transition-all duration-300 hover:scale-105 relative group",
                    isScrolled
                      ? "text-white hover:text-teal-400"
                      : "text-slate-900 hover:text-teal-600"
                  )}
                >
                  Contact
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                      isScrolled ? "bg-teal-400" : "bg-teal-600"
                    )}
                  ></span>
                </Link>
              </nav>

              {/* Full-Width Mega Menu Dropdowns */}
              {activeDropdown === "about" && (
                <div
                  data-dropdown-container
                  className="fixed left-0 right-0 top-[97px] z-40 animate-fade-in"
                >
                  <div
                    className={cn(
                      "border-t transition-all duration-300",
                      isScrolled
                        ? "bg-slate-800/95 backdrop-blur-md border-slate-700"
                        : "bg-white/95 backdrop-blur-md border-slate-200"
                    )}
                  >
                    <div className="container-custom pt-20 pb-12">
                      <div className="grid grid-cols-12 gap-8">
                        {/* Left Column - Links */}
                        <div className="col-span-7">
                          <h3
                            className={cn(
                              "text-sm font-semibold uppercase tracking-wider mt-7 mb-6",
                              isScrolled ? "text-teal-400" : "text-teal-600"
                            )}
                          >
                            About Prostate Care Limited
                          </h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <Link
                                href="/about/pcl"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  About PCL
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Our mission and expertise
                                </p>
                              </Link>
                              <Link
                                href="/about/partners"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  Clinician Experience
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Expert surgical teams
                                </p>
                              </Link>
                            </div>
                            <div className="space-y-4">
                              <Link
                                href="/about/equipment-services"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  Equipment & Technology
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Our technology partners
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Team Image */}
                        <div className="col-span-5 flex items-center justify-end pr-8">
                          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            {/* Gradient overlay to blend white edges */}
                            <div className={cn(
                              "absolute inset-0 pointer-events-none z-10",
                              isScrolled
                                ? "bg-gradient-to-br from-slate-800/40 via-transparent to-slate-800/40"
                                : "bg-gradient-to-br from-white/40 via-transparent to-white/40"
                            )} />
                            <Image
                              src="/images/team.png"
                              alt="Prostate Care Team"
                              width={400}
                              height={300}
                              className={cn(
                                "rounded-2xl object-cover transition-all duration-300",
                                isScrolled ? "opacity-90 mix-blend-luminosity" : "opacity-95"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === "services" && (
                <div
                  data-dropdown-container
                  className="fixed left-0 right-0 top-[97px] z-40 animate-fade-in"
                >
                  <div
                    className={cn(
                      "border-t transition-all duration-300",
                      isScrolled
                        ? "bg-slate-800/95 backdrop-blur-md border-slate-700"
                        : "bg-white/95 backdrop-blur-md border-slate-200"
                    )}
                  >
                    <div className="container-custom pt-20 pb-12">
                      <div className="grid grid-cols-12 gap-8">
                        {/* Left Column - Links */}
                        <div className="col-span-7">
                          <h3
                            className={cn(
                              "text-sm font-semibold uppercase tracking-wider mt-7 mb-6",
                              isScrolled ? "text-teal-400" : "text-teal-600"
                            )}
                          >
                            Our Services
                          </h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <Link
                                href="/services/biopsy-plan"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  Biopsy Planning
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Expert radiologist contouring
                                </p>
                              </Link>
                              <Link
                                href="/services/freehand-fusion"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  MR/US Fusion Biopsy
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Precision diagnostic imaging
                                </p>
                              </Link>
                              <Link
                                href="/services/hifu"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  HIFU Treatment
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Advanced focal therapy
                                </p>
                              </Link>
                            </div>
                            <div className="space-y-4">
                              <Link
                                href="/services/patient-referral"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  Patient Referral
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Seamless care coordination
                                </p>
                              </Link>
                              <Link
                                href="/services"
                                className={cn(
                                  "block group",
                                  isScrolled ? "text-slate-300" : "text-slate-700"
                                )}
                              >
                                <div className="font-semibold text-[15px] mb-1 group-hover:text-teal-500 transition-colors">
                                  How It Works
                                </div>
                                <p className={cn("text-sm", isScrolled ? "text-slate-400" : "text-slate-600")}>
                                  Our service process
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Team Image */}
                        <div className="col-span-5 flex items-center justify-end pr-8">
                          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            {/* Gradient overlay to blend white edges */}
                            <div className={cn(
                              "absolute inset-0 pointer-events-none z-10",
                              isScrolled
                                ? "bg-gradient-to-br from-slate-800/40 via-transparent to-slate-800/40"
                                : "bg-gradient-to-br from-white/40 via-transparent to-white/40"
                            )} />
                            <Image
                              src="/images/team.png"
                              alt="Prostate Care Team"
                              width={400}
                              height={300}
                              className={cn(
                                "rounded-2xl object-cover transition-all duration-300",
                                isScrolled ? "opacity-90 mix-blend-luminosity" : "opacity-95"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn - Right */}
              <div className="hidden lg:flex items-center ml-auto w-[240px] lg:w-[280px] justify-end">
                <a
                  href="https://www.linkedin.com/company/prostate-care-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-all duration-300 p-2.5 rounded-full hover:shadow-md hover:scale-110 hover:-rotate-3",
                    isScrolled
                      ? "text-white hover:text-teal-400 hover:bg-white/10"
                      : "text-slate-900 hover:text-teal-600 hover:bg-slate-100"
                  )}
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={cn(
                "lg:hidden border-t py-4 animate-fade-in transition-all duration-300",
                isScrolled
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              )}
            >
              <nav className="flex flex-col space-y-4 px-4">
                <Link
                  href="/"
                  className={cn(
                    "font-medium text-[15px] tracking-wide py-2",
                    isScrolled ? "text-white" : "text-slate-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "font-medium text-[15px] tracking-wide py-2",
                      isScrolled ? "text-white" : "text-slate-900"
                    )}
                  >
                    About
                  </div>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/about/pcl"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About PCL
                    </Link>
                    <Link
                      href="/about/partners"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Clinician Experience
                    </Link>
                    <Link
                      href="/about/equipment-services"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Equipment & Technology Partners
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "font-medium text-[15px] tracking-wide py-2",
                      isScrolled ? "text-white" : "text-slate-900"
                    )}
                  >
                    Services
                  </div>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/services/biopsy-plan"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Biopsy Planning
                    </Link>
                    <Link
                      href="/services/freehand-fusion"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      MR/US Fusion Biopsy
                    </Link>
                    <Link
                      href="/services/hifu"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      HIFU
                    </Link>
                    <Link
                      href="/services/patient-referral"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Patient Referral
                    </Link>
                    <Link
                      href="/services"
                      className={cn(
                        "block text-[14px] py-1",
                        isScrolled ? "text-slate-400" : "text-slate-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className={cn(
                    "font-medium text-[15px] tracking-wide py-2",
                    isScrolled ? "text-white" : "text-slate-900"
                  )}
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
