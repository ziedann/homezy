import React from 'react'

interface ButtonTextProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

export default function ButtonText({ 
  children, 
  variant = 'primary', 
  onClick,
  className = ''
}: ButtonTextProps) {
  const baseStyle = 'rounded-[15px] font-bold text-[16px] leading-[20px]'
  const variants = {
    primary: 'bg-[#191A23] text-white px-[40px] py-[18px] hover:bg-[#191A23]/80 transition-all duration-300',
    secondary: 'border border-[#191A23] px-[32px] py-[16px] hover:bg-gray-50'
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}