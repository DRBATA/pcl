import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://prostatecare.co.uk"),
  title: "Prostate Care Limited | Specialist Equipment & Managed Services",
  description:
    "Advanced ultrasound and HIFU equipment rental for healthcare providers. Fully managed MRI/US fusion biopsy and focal therapy services with on-site support.",
  keywords: "prostate biopsy, HIFU, ultrasound rental, MRI fusion, bkFusion, Navigo, Sonablate, Ablatherm, surgical equipment",
  generator: "v0.app",
  alternates: {
    canonical: "https://prostatecare.co.uk/",
  },
  openGraph: {
    siteName: "Prostate Care Limited",
    title: "Prostate Care Limited | Specialist Equipment & Managed Services",
    description:
      "Advanced ultrasound and HIFU equipment rental for healthcare providers. Fully managed MRI/US fusion biopsy and focal therapy services with on-site support.",
    type: "website",
    url: "https://prostatecare.co.uk/",
    images: [
      {
        url: "/og-image-prostate-care.jpg",
        alt: "Prostate Care Limited | Specialist Equipment & Managed Services",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prostate Care Limited | Specialist Equipment & Managed Services",
    description:
      "Advanced ultrasound and HIFU equipment rental for healthcare providers. Fully managed MRI/US fusion biopsy and focal therapy services with on-site support.",
    images: [
      {
        url: "/og-image-prostate-care.jpg",
        alt: "Prostate Care Limited | Specialist Equipment & Managed Services",
      },
    ],
    site: "@prostatecare",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground overflow-x-hidden">{children}</body>
    </html>
  )
}
