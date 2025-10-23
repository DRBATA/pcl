"use client"
import { Card, CardContent } from "@/components/ui/card"

export function ExpertiseSection() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-balance mb-6 text-primary">
            Prostate Care Limited delivers consistent, state-of-the-art expertise to support your clinical and
            operational practice
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image and text */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e6AFU0kzSnctSQ22isJANeicpbR3Kx.png"
                alt="Dr Clare Allen, Consultant Radiologist"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <p className="text-foreground leading-relaxed">
                  Prostate Care Limited has introduced the most efficient, accurate and consistent approach to MRI
                  contouring and biopsy planning to hospitals across the UK. Our expert radiologist, Dr Clare Allen,
                  prepares your patients' biopsy plans using reports from your local radiologist.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Middle column - Image and text */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e6AFU0kzSnctSQ22isJANeicpbR3Kx.png"
                alt="Medical professionals in theatre"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <p className="text-foreground leading-relaxed">
                  Prostate Care Limited provides trained, dedicated specialists in fusion software management, theatre
                  operation and clinical workflow.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right column - Research paper */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e6AFU0kzSnctSQ22isJANeicpbR3Kx.png"
                alt="Research publication"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <p className="text-foreground leading-relaxed">
                  Prostate Care Limited has sponsored leading-edge research and clinical trials – including the largest
                  study of image-fusion TP targeted biopsies across multiple users and centres.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
