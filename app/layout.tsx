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
  title: "Prostate Care Limited — Precision diagnostics for prostate cancer",
  description:
    "State-of-the-art MR/US fusion biopsy and HIFU services. Expert radiologist contouring and mobile equipment solutions.",
  generator: "v0.app",
  alternates: {
    canonical: "https://prostatecare.co.uk/",
  },
  openGraph: {
    siteName: "Prostate Care Limited",
    title: "Precision diagnostics for prostate cancer | Prostate Care Limited",
    description:
      "State-of-the-art MR/US fusion biopsy and HIFU services. Expert radiologist contouring and mobile equipment solutions.",
    type: "website",
    url: "https://prostatecare.co.uk/",
    images: [
      {
        url: "/og-image-prostate-care.jpg",
        alt: "Prostate Care Limited — Precision diagnostics for prostate cancer",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision diagnostics for prostate cancer | Prostate Care Limited",
    description:
      "State-of-the-art MR/US fusion biopsy and HIFU services. Expert radiologist contouring and mobile equipment solutions.",
    images: [
      {
        url: "/og-image-prostate-care.jpg",
        alt: "Prostate Care Limited — Precision diagnostics for prostate cancer",
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
