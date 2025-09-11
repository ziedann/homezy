import React from 'react'

interface NavbarButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function NavbarButton({ children, onClick, className = '' }: NavbarButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-[32px] py-[16px] text-[16px] leading-[20px] font-bold border border-[#191A23] rounded-[15px] hover:bg-[#191A23] hover:text-white transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  )
}