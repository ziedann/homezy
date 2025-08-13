'use client'

import React, { useState, useEffect, useRef } from 'react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [selectedType, setSelectedType] = useState<'sale' | 'rent'>('sale')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string>('')
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('')
  const [selectedBedroomsLabel, setSelectedBedroomsLabel] = useState<string>('')
  const [selectedBathrooms, setSelectedBathrooms] = useState<string>('')
  const [selectedBathroomsLabel, setSelectedBathroomsLabel] = useState<string>('')
  const [selectedFloorArea, setSelectedFloorArea] = useState<string>('')
  const [selectedFloorAreaLabel, setSelectedFloorAreaLabel] = useState<string>('')
  const [minYear, setMinYear] = useState<string>('')
  const [minYearLabel, setMinYearLabel] = useState<string>('')
  const [maxYear, setMaxYear] = useState<string>('')
  const [maxYearLabel, setMaxYearLabel] = useState<string>('')
  
  // Dropdown open states
  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false)
  const [isBathroomsOpen, setIsBathroomsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isFloorAreaOpen, setIsFloorAreaOpen] = useState(false)
  const [isMinYearOpen, setIsMinYearOpen] = useState(false)
  const [isMaxYearOpen, setIsMaxYearOpen] = useState(false)
  
  // Drag state for mobile drawer
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const modalRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // Dropdown options
  const bedroomOptions = [
    { value: '2', label: '2 beds' },
    { value: '3', label: '3 beds' },
    { value: '4', label: '4 beds' },
  ]

  const bathroomOptions = [
    { value: '1', label: '1 bath' },
    { value: '2', label: '2 baths' },
    { value: '3', label: '3 baths' },
  ]

  const categoryOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'studio', label: 'Studio' },
    { value: 'loft', label: 'Loft' },
  ]

  const floorAreaOptions = [
    { value: 'small', label: 'Small (< 500 sqft)' },
    { value: 'medium', label: 'Medium (500-1000 sqft)' },
    { value: 'large', label: 'Large (1000-2000 sqft)' },
    { value: 'extra-large', label: 'Extra Large (> 2000 sqft)' },
  ]

  const yearOptions = [
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
  ]

  // Custom dropdown component
  const CustomDropdown = ({ 
    isOpen, 
    setIsOpen, 
    selectedValue, 
    onSelect, 
    options, 
    placeholder,
    selectedLabel
  }: {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    selectedValue: string
    onSelect: (value: string, label: string) => void
    options: { value: string; label: string }[]
    placeholder: string
    selectedLabel?: string
  }) => {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (!isOpen) {
              closeAllDropdowns()
            }
            setIsOpen(!isOpen)
          }}
          className="w-full px-4 py-4 border border-[#E5E7EB] rounded-[16px] bg-white text-[#6B7280] text-left text-[16px] focus:outline-none focus:border-[#9CA3AF] flex items-center justify-between"
        >
          <span className={selectedValue ? 'text-[#191A23]' : ''}>
            {selectedLabel || placeholder}
          </span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M4 6L8 10L12 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[16px] shadow-xl border border-[#E5E7EB] z-50 overflow-hidden">
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

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsBedroomsOpen(false)
    setIsBathroomsOpen(false)
    setIsCategoryOpen(false)
    setIsFloorAreaOpen(false)
    setIsMinYearOpen(false)
    setIsMaxYearOpen(false)
  }

  // Handle touch/drag events for mobile drawer
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setCurrentY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return
    
    const touchY = e.touches[0].clientY
    setCurrentY(touchY)
    
    // Calculate drag distance
    const dragDistance = touchY - startY
    
    if (drawerRef.current) {
      // Prevent default to avoid scroll
      e.preventDefault()
      
      // Remove transition during drag for immediate response
      drawerRef.current.style.transition = 'none'
      
      // Real-time height adjustment based on drag
      if (dragDistance >= 0) {
        // Dragging down - reduce height by moving drawer down
        const newHeight = Math.max(200, window.innerHeight * 0.85 - dragDistance)
        drawerRef.current.style.height = `${newHeight}px`
        drawerRef.current.style.transform = `translateY(0px)`
      } else {
        // Dragging up - slight resistance, increase height slightly
        const resistanceFactor = 0.2
        const heightIncrease = Math.abs(dragDistance) * resistanceFactor
        const maxHeight = window.innerHeight * 0.9
        const newHeight = Math.min(maxHeight, window.innerHeight * 0.85 + heightIncrease)
        drawerRef.current.style.height = `${newHeight}px`
        drawerRef.current.style.transform = `translateY(0px)`
      }
      
      // Dynamic backdrop opacity
      if (backdropRef.current) {
        const opacity = dragDistance > 0 
          ? Math.max(0.5 - (dragDistance / 400), 0.1)
          : Math.min(0.5 + (Math.abs(dragDistance) / 800), 0.7)
        backdropRef.current.style.opacity = opacity.toString()
      }
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    setIsAnimating(true)
    
    const dragDistance = currentY - startY
    
    if (dragDistance > 150) {
      // Close drawer
      handleCloseWithAnimation()
    } else {
      // Snap back to original height
      if (drawerRef.current) {
        drawerRef.current.style.transition = 'height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        drawerRef.current.style.height = '85vh'
      }
      if (backdropRef.current) {
        backdropRef.current.style.transition = 'opacity 0.3s ease-out'
        backdropRef.current.style.opacity = '0.5'
      }
      
      setTimeout(() => {
        setIsAnimating(false)
        if (drawerRef.current) {
          drawerRef.current.style.transition = ''
          drawerRef.current.style.height = ''
        }
        if (backdropRef.current) {
          backdropRef.current.style.transition = ''
          backdropRef.current.style.opacity = ''
        }
      }, 300)
    }
    
    setStartY(0)
    setCurrentY(0)
  }

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseWithAnimation()
        closeAllDropdowns()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllDropdowns()
        handleCloseWithAnimation()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen])

  // Prevent background scrolling when drawer is open on mobile ONLY
  useEffect(() => {
    const checkScreenSize = () => {
      return window.innerWidth < 1024 // lg breakpoint is 1024px
    }

    const handleScrollPrevention = () => {
      if (isOpen) {
        // Only prevent scrolling on mobile/tablet, NOT on lg+ screens
        if (checkScreenSize()) {
          document.body.style.overflow = 'hidden'
          document.body.style.touchAction = 'none'
        } else {
          // On lg+ screens, allow background scrolling
          document.body.style.overflow = ''
          document.body.style.touchAction = ''
        }
      } else {
        // Always restore scrolling when drawer is closed
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
      }
    }

    // Initial check
    handleScrollPrevention()

    // Listen for window resize to handle screen size changes
    const handleResize = () => {
      handleScrollPrevention()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup when component unmounts or modal closes
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  // Handle smooth close animation
  const handleCloseWithAnimation = () => {
    if (drawerRef.current && backdropRef.current) {
      // Add closing animation classes
      drawerRef.current.classList.remove('animate-slide-up')
      drawerRef.current.classList.add('animate-slide-down')
      backdropRef.current.classList.remove('animate-fade-in')
      backdropRef.current.classList.add('animate-fade-out')
      
      // Close after animation completes
      setTimeout(() => {
        onClose()
      }, 300)
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  // Common content component
  const FilterContent = () => (
    <>
      {/* For Sale / For Rent Toggle */}
      <div className="flex gap-2 bg-[#F5F5F7] rounded-[16px] p-1">
        <button
          onClick={() => setSelectedType('sale')}
          className={`flex-1 py-3 px-6 rounded-[12px] font-semibold text-[16px] transition-all duration-200 ${
            selectedType === 'sale'
              ? 'bg-[#191A23] text-white shadow-sm'
              : 'bg-transparent text-[#6B7280] hover:text-[#374151]'
          }`}
        >
          For Sale
        </button>
        <button
          onClick={() => setSelectedType('rent')}
          className={`flex-1 py-3 px-6 rounded-[12px] font-semibold text-[16px] transition-all duration-200 ${
            selectedType === 'rent'
              ? 'bg-[#191A23] text-white shadow-sm'
              : 'bg-transparent text-[#6B7280] hover:text-[#374151]'
          }`}
        >
          For Rent
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23] mb-[12px]">Category</label>
        <CustomDropdown
          isOpen={isCategoryOpen}
          setIsOpen={setIsCategoryOpen}
          selectedValue={selectedCategory}
          selectedLabel={selectedCategoryLabel}
          onSelect={(value, label) => {
            setSelectedCategory(value)
            setSelectedCategoryLabel(label)
          }}
          options={categoryOptions}
          placeholder="Category"
        />
      </div>

      {/* Bedrooms and Bathrooms Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bedrooms */}
        <div>
          <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23] mb-[12px]">Bedrooms</label>
          <CustomDropdown
            isOpen={isBedroomsOpen}
            setIsOpen={setIsBedroomsOpen}
            selectedValue={selectedBedrooms}
            selectedLabel={selectedBedroomsLabel}
            onSelect={(value, label) => {
              setSelectedBedrooms(value)
              setSelectedBedroomsLabel(label)
            }}
            options={bedroomOptions}
            placeholder="Select"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23] mb-[12px]">Bathrooms</label>
          <CustomDropdown
            isOpen={isBathroomsOpen}
            setIsOpen={setIsBathroomsOpen}
            selectedValue={selectedBathrooms}
            selectedLabel={selectedBathroomsLabel}
            onSelect={(value, label) => {
              setSelectedBathrooms(value)
              setSelectedBathroomsLabel(label)
            }}
            options={bathroomOptions}
            placeholder="Select"
          />
        </div>
      </div>

      {/* Floor Area */}
      <div>
        <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23] mb-[12px]">Floor Area</label>
        <CustomDropdown
          isOpen={isFloorAreaOpen}
          setIsOpen={setIsFloorAreaOpen}
          selectedValue={selectedFloorArea}
          selectedLabel={selectedFloorAreaLabel}
          onSelect={(value, label) => {
            setSelectedFloorArea(value)
            setSelectedFloorAreaLabel(label)
          }}
          options={floorAreaOptions}
          placeholder="Category"
        />
      </div>

      {/* Year Built */}
      <div>
        <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23] mb-[12px]">Year Built</label>
        <div className="grid grid-cols-2 gap-4">
          <CustomDropdown
            isOpen={isMinYearOpen}
            setIsOpen={setIsMinYearOpen}
            selectedValue={minYear}
            selectedLabel={minYearLabel}
            onSelect={(value, label) => {
              setMinYear(value)
              setMinYearLabel(label)
            }}
            options={yearOptions}
            placeholder="Min Year"
          />
          <CustomDropdown
            isOpen={isMaxYearOpen}
            setIsOpen={setIsMaxYearOpen}
            selectedValue={maxYear}
            selectedLabel={maxYearLabel}
            onSelect={(value, label) => {
              setMaxYear(value)
              setMaxYearLabel(label)
            }}
            options={yearOptions}
            placeholder="Max Year"
          />
        </div>
      </div>
    </>
  )

  // Common footer buttons
  const FooterButtons = () => (
    <div className="flex-shrink-0 px-6 py-6 border-t border-[#F1F5F9] flex gap-3 bg-white">
      <button
        onClick={handleCloseWithAnimation}
        className="flex-1 py-4 px-6 rounded-[16px] font-semibold text-[16px] text-[#191A23] bg-[#F7F2FF] hover:bg-[#F1F5F9] transition-all duration-200"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          // Apply filter logic here
          handleCloseWithAnimation()
        }}
        className="flex-1 py-4 px-6 rounded-[16px] font-semibold text-[16px] text-white bg-[#191A23] hover:bg-[#1A1B2E] transition-all duration-200"
      >
        Apply Filter
      </button>
    </div>
  )

  return (
    <>
      {/* Mobile Drawer */}
      <div className="lg:hidden fixed inset-0 z-[1000]">
        {/* Backdrop */}
        <div 
          ref={backdropRef}
          className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in" 
          onClick={handleCloseWithAnimation} 
        />
        
        {/* Drawer Content */}
        <div 
          ref={drawerRef}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl max-h-[85vh] overflow-hidden transform transition-transform duration-500 ease-out animate-slide-up"
        >
          <div className="flex flex-col h-full max-h-[85vh]">
            {/* Drag Handle Area */}
            <div 
              className={`flex-shrink-0 w-full py-4 px-4 select-none touch-manipulation ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onTouchStart={(e) => {
                e.preventDefault()
                handleTouchStart(e)
              }}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => {
                if (!isDragging && Math.abs(currentY - startY) < 10) {
                  handleCloseWithAnimation()
                }
              }}
              style={{ 
                touchAction: 'pan-y',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-1.5 bg-gray-400 rounded-full mb-2"></div>
                <span className="h-[7px] bg-[#f2f2f2] w-[100px] rounded-full"></span>
              </div>
            </div>
            
            {/* Header */}
            <div className="flex-shrink-0 px-6 pb-4">
              <h2 className="text-[20px] leading-[28px] font-semibold font-syne text-[#191A23]">More Filter</h2>
            </div>

            {/* Content - Scrollable */}
            <div 
              className="flex-1 px-6 py-4 space-y-6 overflow-y-auto scrollbar-thin scroll-smooth" 
              style={{ scrollBehavior: 'smooth' }}
            >
              <FilterContent />
            </div>

            {/* Footer Buttons */}
            <FooterButtons />
          </div>
        </div>
      </div>

      {/* Desktop Dropdown */}
      <div ref={modalRef} className="hidden lg:block absolute top-full right-0 mt-2 z-[1000] w-[440px]">
        {/* Modal Content */}
        <div className="bg-white rounded-[24px] shadow-2xl max-h-[80vh] overflow-hidden scroll-smooth">
          <div className="flex flex-col h-full max-h-[80vh]">
            {/* Header */}
            <div className="flex-shrink-0 p-[24px] border-b border-[#F1F5F9]">
              <h2 className="text-[20px] leading-[28px] font-semibold font-syne text-[#191A23]">More Filter</h2>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto scrollbar-thin scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
              <FilterContent />
            </div>

            {/* Footer Buttons */}
            <FooterButtons />
          </div>
        </div>
      </div>
    </>
  )
}