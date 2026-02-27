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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "mask-icon",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
        url: "/smallpcl.png",
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
        url: "/smallpcl.png",
        alt: "Prostate Care Limited | Specialist Equipment & Managed Services",
      },
    ],
    site: "@prostatecare",
  },
}

// Schema.org JSON-LD Structured Data for SEO
const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://prostatecare.co.uk/#organization",
      "name": "Prostate Care Limited",
      "alternateName": "PCL",
      "description": "Precision diagnostics and nuanced care for prostate cancer. Specialist MRI/US fusion biopsy and HIFU equipment services for urological surgeons across the UK.",
      "url": "https://prostatecare.co.uk",
      "logo": "https://prostatecare.co.uk/smallpcl.png",
      "telephone": "+44 207 036 8850",
      "email": "info@prostatecare.co.uk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "99 Park Drive, Milton Park Innovation Centre",
        "addressLocality": "Abingdon",
        "addressRegion": "Oxfordshire",
        "postalCode": "OX14 4RY",
        "addressCountry": "GB"
      },
      "medicalSpecialty": ["Urology", "Oncology"],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "MR/US Fusion Biopsy",
          "description": "Precision prostate biopsy using MRI-ultrasound fusion technology"
        },
        {
          "@type": "MedicalProcedure", 
          "name": "HIFU Treatment",
          "description": "High-Intensity Focused Ultrasound for focal prostate therapy"
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "foundingDate": "2003",
      "numberOfEmployees": "10-50",
      "slogan": "Precision Diagnostics and Nuanced Care"
    },
    {
      "@type": "WebSite",
      "@id": "https://prostatecare.co.uk/#website",
      "url": "https://prostatecare.co.uk",
      "name": "Prostate Care Limited",
      "publisher": { "@id": "https://prostatecare.co.uk/#organization" }
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(w){w.unregister()})})}
        `}} />
      </head>
      <body className="font-sans bg-background text-foreground overflow-x-hidden">{children}</body>
    </html>
  )
}
