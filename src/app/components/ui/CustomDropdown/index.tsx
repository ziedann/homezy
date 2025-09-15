'use client'

import { useState, useEffect, useRef } from 'react'

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  selectedValue: string
  onSelect: (value: string, label: string) => void
  options: DropdownOption[]
  placeholder: string
  selectedLabel?: string
  showAbove?: boolean
  className?: string
}

export default function CustomDropdown({
  isOpen,
  setIsOpen,
  selectedValue,
  onSelect,
  options,
  placeholder,
  selectedLabel,
  showAbove = false,
  className = ""
}: CustomDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [shouldShowAbove, setShouldShowAbove] = useState(showAbove)

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      const dropdownHeight = 250
      
      // Show above if not enough space below but enough space above
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setShouldShowAbove(true)
      } else if (showAbove) {
        setShouldShowAbove(true)
      } else {
        setShouldShowAbove(false)
      }
    }
  }, [isOpen, showAbove])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 border border-[#E5E7EB] rounded-[16px] bg-white text-[#6B7280] text-left text-[16px] focus:outline-none focus:border-black flex items-center justify-between"
      >
        <span className={selectedValue ? 'text-[#191A23]' : 'text-[#6B7280]'}>
          {selectedValue ? selectedLabel : placeholder}
        </span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          className={`transform transition-transform ${isOpen ? (shouldShowAbove ? 'rotate-0' : 'rotate-180') : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className={`absolute left-0 right-0 ${shouldShowAbove ? 'bottom-full mb-1' : 'top-full mt-1'} bg-white rounded-[16px] shadow-xl border border-[#E5E7EB] z-50 overflow-hidden`}>
          {/* Selected option at top with dark background */}
          {selectedValue && (
            <div className="bg-[#2B2D42] text-white px-4 py-3 text-[16px] font-medium">
              {selectedLabel}
            </div>
          )}
          
          {/* Other options */}
          <div className="max-h-[200px] overflow-y-auto scrollbar-thin">
            {options
              .filter(option => option.value !== selectedValue)
              .map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSelect(option.value, option.label)
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left text-[16px] text-[#191A23] hover:bg-[#F8FAFC] transition-colors"
                >
                  {option.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
