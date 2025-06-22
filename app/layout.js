import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CarHub - Find Your Perfect Car",
  description:
    "Discover the best cars from top brands. Browse our extensive collection of vehicles with detailed specifications and competitive prices.",
  openGraph: {
    title: "CarHub - Find Your Perfect Car",
    description:
      "Browse top-brand vehicles with detailed specs and competitive pricing on CarHub.",
    url: "https://www.carhub.com",
    siteName: "CarHub",
    images: [
      {
        url: "https://www.carhub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CarHub - Browse Cars",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/favicon.png" />

      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
