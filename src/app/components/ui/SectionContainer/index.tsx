import React from 'react'

interface SectionContainerProps {
  children: React.ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className='w-full min-h-full mt-[120px]'>
      <div className='mx-auto max-w-[1160px]'>
        {children}
      </div>
    </div>
  )
}