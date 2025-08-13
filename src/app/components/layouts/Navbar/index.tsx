'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Logo from '@assets/icons/logo.svg'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Menu from '@assets/icons/menu.svg'
import NavbarButton from '@/app/components/ui/NavbarButton'
import { NAV_ITEMS } from '@/app/components/layouts/Navbar/types'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const getNavbarBackground = () => {
    return pathname === '/search-property' ? 'bg-[#FBFAFF]' : 'bg-[#F7F2FF]'
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Effect to handle body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])
  const renderNavLinks = () => {
    return NAV_ITEMS.map((item) => (
      <a 
        key={item.label}
        href={item.href} 
        className="text-dark-100 text-[18px] font-regular flex items-center gap-1"
      >
        {item.label}
        {item.hasDropdown && <ArrowDown className="w-4 h-4" />}
      </a>
    ))
  }

  const renderMobileMenuButton = () => (
    <button 
      className="lg:hidden p-2 text-gray-500 hover:text-gray-700 z-50"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? (
        <svg
          className="h-[24px] w-[24px] md:h-[32px] md:w-[32px] lg:h-[40px] lg:w-[40px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  )

  return (
    <nav className={`navbar ${getNavbarBackground()} relative`}>
      <div className="lg:max-w-[1160px] md:max-w-[720px] w-[90%] mx-auto">
        <div className="flex items-center justify-between md:h-[100px] h-[70px]">
          {/* Logo */}
          <Logo className="lg:h-[40px] md:h-[32px] h-[24px] w-auto" />

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-[64px]">
            {renderNavLinks()}
          </div>
          
          {/* Contact Button - Desktop */}
          <div className="hidden lg:block">
            <NavbarButton>
              Contact Us
            </NavbarButton>
          </div>

          {/* Mobile Menu Button */}
          {renderMobileMenuButton()}

          {/* Mobile Menu Overlay */}
          <div 
            ref={menuRef}
            className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-6 pt-24">
              <div className="flex flex-col gap-6">
                {NAV_ITEMS.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="text-dark-100 text-[18px] font-regular flex items-center gap-1 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.hasDropdown && <ArrowDown className="w-4 h-4" />}
                  </a>
                ))}
                <div className="pt-4">
                  <NavbarButton className="w-full">
                    Contact Us
                  </NavbarButton>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Background */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  )
}