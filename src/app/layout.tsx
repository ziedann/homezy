import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Syne } from "next/font/google";
import Navbar from "@/app/components/layouts/Navbar";
import HomePage from "./components/pages/homepage";
import Footer from "@/app/components/layouts/Footer";
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
  description: "Home Page",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${syne.variable}`}
    >
      <body className="bg-[#FBFAFF] font-hanken">
        <Navbar />
        <HomePage />
        {children}
        <Footer />
      </body>
    </html>
  );
}