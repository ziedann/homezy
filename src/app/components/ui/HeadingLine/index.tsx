import React from 'react'

interface HeadingLineProps {
  text: string
  icon?: React.ReactNode
  className?: string
}

export default function HeadingLine({ text, icon, className = '' }: HeadingLineProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <h1 className='font-syne lg:text-[72px] text-[42px] font-medium lg:leading-[88px] leading-[50px] tracking-[-0.04em] text-secondary-dark-100'>
        {text}
      </h1>
      {icon && (
        <div className='flex items-center'>
          {icon}
        </div>
      )}
    </div>
  )
}