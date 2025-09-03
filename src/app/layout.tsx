import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Syne } from "next/font/google";
import Navbar from "@/app/components/layouts/Navbar";
import Footer from "@/app/components/layouts/Footer";
import WebVitals from "@/app/components/utils/WebVitals";
import LogoIcon from "@assets/icons/logo-icon.svg";
import "./globals.css";

// Google Fonts with optimized loading
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Load Syne with correct weights and fallbacks
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const metadata: Metadata = {
  title: {
    default: "Homezy - Find Your Dream Property | Houses & Apartments for Sale",
    template: "%s | Homezy - Premium Real Estate Platform"
  },
  description: "🏡 Find your dream property with Homezy! Browse 1000+ verified listings of houses, apartments & commercial spaces. Expert agents, prime locations, competitive prices. Start your property search today!",
  keywords: [
    // Primary Keywords
    "real estate", "property search", "houses for sale", "apartments for rent",
    // Long-tail Keywords  
    "dream property finder", "verified property listings", "real estate platform",
    "property investment opportunities", "premium homes for sale",
    // Local SEO Keywords
    "real estate agent near me", "property listings United States",
    // Action Keywords
    "buy house online", "rent apartment", "property search engine",
    "real estate marketplace", "home buying platform"
  ],
  authors: [{ name: "Homezy Team" }],
  creator: "Homezy",
  publisher: "Homezy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://homezy-zidan.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://homezy-zidan.vercel.app',
    title: 'Homezy - Find Your Dream Property | Premium Real Estate Platform',
    description: '🏡 Find your dream property with Homezy! Browse 1000+ verified listings of houses, apartments & commercial spaces. Expert agents, prime locations, competitive prices.',
    siteName: 'Homezy',
    images: [
      {
        url: '/logo-icon.svg',
        width: 1200,
        height: 630,
        alt: 'Homezy - Premium Real Estate Platform for Houses and Apartments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Homezy - Find Your Dream Property | Premium Real Estate',
    description: '🏡 Browse 1000+ verified property listings! Houses, apartments & commercial spaces. Expert agents, prime locations. Start your search today!',
    images: ['/logo-icon.svg'],
    creator: '@homezy',
    site: '@homezy',
  },
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Homezy",
    "url": "https://homezy-zidan.vercel.app",
    "logo": "https://homezy-zidan.vercel.app/logo-icon.svg",
    "description": "Premium real estate platform with 1000+ verified property listings. We help clients find their dream homes, apartments, and commercial spaces with expert agents and competitive prices.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "United States"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "service": {
      "@type": "Service",
      "name": "Real Estate Services",
      "serviceType": "Property Search, Property Listing, Real Estate Consultation"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "sameAs": [
      "https://twitter.com/homezy",
      "https://facebook.com/homezy",
      "https://instagram.com/homezy"
    ]
  };

  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${syne.variable}`}
    >
      <head>
        <link rel="icon" href="/logo-icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-[#FBFAFF] font-hanken">
        <WebVitals />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

