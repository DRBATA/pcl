"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Stethoscope, Shield, Users, Award } from "lucide-react"

export function MedicalHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 medical-texture opacity-30" />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display text-balance mb-6">
            Innovators in <span className="text-primary">precision biopsy</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
            Committed to developing access to state-of-the-art precision diagnostics for prostate cancer
          </p>

          <div className="mb-12">
            <p className="text-lg text-foreground text-balance mb-4 max-w-4xl mx-auto">
              Are you considering joining the many hospitals now offering MR/US fusion biopsy to your prostate cancer
              patients?
            </p>
            <p className="text-lg text-foreground text-balance max-w-4xl mx-auto">
              What do you need to make this work for you, your patients and your hospital?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6">
              Learn More About Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Contact Us Today
            </Button>
          </div>

          {/* Key benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Setup and process that respects and supports your theatre operation
              </h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Proven technology that integrates with your existing systems
              </h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Experts that provide smooth workflow and optimise your patients' experience
              </h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Access to innovation & state-of-the-art practice</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
