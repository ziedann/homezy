'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Define authentication pages where navbar and footer should be hidden
  const authPages = [
    '/sign-in',
    '/sign-up', 
    '/404'
  ]
  
  const isAuthPage = authPages.includes(pathname)
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <main id="main-content">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  )
}
