import React from 'react'

interface SectionContainerProps {
  children: React.ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className='w-full min-h-full mt-[120px]'>
      <div className='mx-auto lg:max-w-[1160px] max-w-[335px]'>
        {children}
      </div>
    </div>
  )
}