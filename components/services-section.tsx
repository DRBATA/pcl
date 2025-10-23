"use client"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ServicesSection() {
  const services = [
    "Equipment Hire, Installation and De-installation",
    "State-of-the-art pre-biopsy image contouring",
    "Fast and reliable histopathology",
    "Technology & Application Expertise",
    "Immediate on-site reporting",
    "Proctoring",
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-balance mb-6">MR/US Fusion biopsy and HIFU</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <p className="text-lg text-foreground leading-relaxed">{service}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
