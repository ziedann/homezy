import React from 'react'
import Logo from '@/app/assets/icons/logo.svg'
import ArrowDown from '@/app/assets/icons/arrow-down.svg'
import Menu from '@/app/assets/icons/menu.svg'
import NavbarButton from '@/app/components/ui/NavbarButton'
import { NAV_ITEMS } from '@/app/components/layouts/Navbar/types'

export default function Navbar() {
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
    <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
      <Menu className="h-6 w-6" />
    </button>
  )

  return (
    <nav className="navbar bg-[#F7F2FF]">
      <div className="lg:max-w-[1160px] max-w-[335px] mx-auto">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Logo className="h-[40px] w-auto" />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-[64px]">
            {renderNavLinks()}
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <NavbarButton>
              Contact Us
            </NavbarButton>
          </div>

          {/* Mobile Menu Button */}
          {renderMobileMenuButton()}
        </div>
      </div>
    </nav>
  )
}