import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Syne } from "next/font/google";
import Navbar from "@/app/components/layouts/Navbar";
import HomePage from "./components/pages/homepage";
import Footer from "@/app/components/layouts/Footer";
import LogoIcon from "@/app/assets/icons/logo-icon.svg";
import "./globals.css";

// Google Fonts
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

// Load Syne with correct weights
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homezy - Your Dream Property",
  description: "Find your dream property with Homezy. We offer a wide range of properties including houses, apartments, and commercial spaces.",
  icons: [
    {
      rel: 'icon',
      url: '/logo-icon.svg',
      type: 'image/svg+xml',
      sizes: 'any'
    },
    {
      rel: 'apple-touch-icon',
      url: '/logo-icon.svg',
    }
  ],
  themeColor: '#7F56D9',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${syne.variable}`}
    >
      <head>
        <link rel="icon" href="/logo-icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
      </head>
      <body className="bg-[#FBFAFF] font-hanken">
        <Navbar />
        <HomePage />
        {children}
        <Footer />
      </body>
    </html>
  );
}