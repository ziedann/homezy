import React from 'react'

interface SectionContainerProps {
  children: React.ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className='w-full min-h-full lg:mt-[120px] md:mt-[80px] mt-[64px]'>
      <div className='mx-auto lg:max-w-[1160px] md:max-w-[720px] px-5 lg:px-0'>
        {children}
      </div>
    </div>
  )
}