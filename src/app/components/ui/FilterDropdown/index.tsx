'use client'

import React, { useState, useRef, useEffect } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  icon: React.ReactNode
  label: string
  value: string
  options: FilterOption[]
  onValueChange: (value: string, label: string) => void
  className?: string
}

export default function FilterDropdown({ 
  icon, 
  label, 
  value, 
  options, 
  onValueChange, 
  className = '' 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Find the selected option based on value
  const selectedOption = options.find(option => option.value === value)
  const selectedLabel = selectedOption ? selectedOption.label : value

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option: FilterOption) => {
    onValueChange(option.value, option.label)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row gap-[12px] items-center w-full h-[60px] p-0 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className='flex items-center justify-center w-[40px] h-[40px] rounded-[15px] bg-[#E7DCFF]'>
          {icon}
        </div>
        <div className="flex-1 text-left">
          <p className='font-hanken text-[14px] text-[#686A79] font-light leading-[24px]'>
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p className='font-hanken text-[16px] leading-[20px] font-semibold'>
              {selectedLabel}
            </p>
            <div className="flex items-center justify-center w-[20px] h-[20px] ml-2">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                className={`transform transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <path d="M4 6L8 10L12 6" stroke="#686A79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </button>

             {/* Dropdown Menu */}
       {isOpen && (
         <div className="absolute top-full left-[52px] right-0 mt-2 bg-white border border-[#E7DCFF] rounded-[15px] shadow-lg z-50 max-h-[200px] overflow-y-auto min-w-[200px]">
           {options.map((option) => (
             <button
               key={option.value}
               onClick={() => handleOptionClick(option)}
               className={`w-full px-4 py-3 text-left hover:bg-[#F7F2FF] transition-colors first:rounded-t-[15px] last:rounded-b-[15px] ${
                 option.value === value ? 'bg-[#F7F2FF] font-semibold' : ''
               }`}
             >
               <span className="font-hanken text-[16px] text-[#191A23]">
                 {option.label}
               </span>
             </button>
           ))}
         </div>
       )}
    </div>
  )
}
