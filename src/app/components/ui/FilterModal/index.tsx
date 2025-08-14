'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export interface FilterCriteria {
  type: 'sale' | 'rent'
  category: string
  bedrooms: string
  bathrooms: string
  floorArea: string
  minYear: string
  maxYear: string
  minPrice: string
  maxPrice: string
}

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilter: (criteria: FilterCriteria) => void
}

export default function FilterModal({ isOpen, onClose, onApplyFilter }: FilterModalProps) {
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
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  
  // Dropdown open states
  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false)
  const [isBathroomsOpen, setIsBathroomsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isFloorAreaOpen, setIsFloorAreaOpen] = useState(false)
  const [isMinYearOpen, setIsMinYearOpen] = useState(false)
  const [isMaxYearOpen, setIsMaxYearOpen] = useState(false)
  
  // Mobile state
  const [isMobile, setIsMobile] = useState(false)
  
  const modalRef = useRef<HTMLDivElement>(null)

  // Dropdown options
  const bedroomOptions = [
    { value: '1', label: '1 bed' },    // Studio apartments from API
    { value: '2', label: '2 beds' },  // Modern Downtown Apartment, Greenwich Village Loft, Chelsea Modern Apartment
    { value: '3', label: '3 beds' },  // Beach Pros Realty Inc., Beacon Homes LLC, Herringbone Realty, Tribeca Penthouse
  ]

  const bathroomOptions = [
    { value: '1', label: '1 bath' },  // Brooklyn Heights Studio, Greenwich Village Loft, Upper West Side Studio
    { value: '2', label: '2 baths' }, // Beach Pros Realty Inc., Beacon Homes LLC, Modern Downtown Apartment, Chelsea Modern Apartment
    { value: '3', label: '3 baths' }, // Tribeca Penthouse
  ]

  const categoryOptions = [
    { value: 'studio', label: 'Studio' },        // Brooklyn Heights Studio, Upper West Side Studio
    { value: 'apartment', label: 'Apartment' },  // Modern Downtown Apartment, Chelsea Modern Apartment
    { value: 'loft', label: 'Loft' },           // Greenwich Village Loft
    { value: 'penthouse', label: 'Penthouse' },  // Tribeca Penthouse
    { value: 'realty', label: 'Realty' },       // Beach Pros Realty Inc., Herringbone Realty, Beacon Homes LLC
  ]

  const floorAreaOptions = [
    { value: '3x4', label: '3x4 m²' },   // Brooklyn Heights Studio (12 m²)
    { value: '3x5', label: '3x5 m²' },   // Upper West Side Studio (15 m²)
    { value: '4x5', label: '4x5 m²' },   // Greenwich Village Loft (20 m²)
    { value: '4x6', label: '4x6 m²' },   // Modern Downtown Apartment, Chelsea Modern Apartment (24 m²)
    { value: '5x7', label: '5x7 m²' },   // Beach Pros Realty Inc., Beacon Homes LLC, Herringbone Realty (35 m²)
    { value: '6x8', label: '6x8 m²' },   // Tribeca Penthouse (48 m²)
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

  // Custom dropdown component with smart positioning
  const CustomDropdown = ({ 
    isOpen, 
    setIsOpen, 
    selectedValue, 
    onSelect, 
    options, 
    placeholder,
    selectedLabel,
    showAbove = false
  }: {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    selectedValue: string
    onSelect: (value: string, label: string) => void
    options: { value: string; label: string }[]
    placeholder: string
    selectedLabel?: string
    showAbove?: boolean
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [shouldShowAbove, setShouldShowAbove] = useState(showAbove)

    useEffect(() => {
      if (isOpen && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top
        const dropdownHeight = 250 // Approximate height of dropdown
        
        // If there's not enough space below but enough space above, show above
        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          setShouldShowAbove(true)
        } else if (showAbove) {
          setShouldShowAbove(true)
        } else {
          setShouldShowAbove(false)
        }
      }
    }, [isOpen, showAbove])

    return (
      <div className="relative" ref={dropdownRef}>
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

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsBedroomsOpen(false)
    setIsBathroomsOpen(false)
    setIsCategoryOpen(false)
    setIsFloorAreaOpen(false)
    setIsMinYearOpen(false)
    setIsMaxYearOpen(false)
  }



  // Handle click outside to close modal (for desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
        closeAllDropdowns()
      }
    }

    if (isOpen && !isMobile) { // Only for desktop
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, isMobile])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllDropdowns()
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  // Common filter content component
  const FilterContent = () => (
    <div className="space-y-6">
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
            showAbove={true}
          />
        </div>

      {/* Price Range */}
      <div>
        <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23] mb-[12px]">Price Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] text-[16px]">$</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
              className="w-full pl-8 pr-4 py-4 border border-[#E5E7EB] rounded-[16px] bg-white text-[#191A23] text-[16px] placeholder:text-[#6B7280] focus:outline-none focus:border-[#9CA3AF] focus:ring-0"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] text-[16px]">$</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              className="w-full pl-8 pr-4 py-4 border border-[#E5E7EB] rounded-[16px] bg-white text-[#191A23] text-[16px] placeholder:text-[#6B7280] focus:outline-none focus:border-[#9CA3AF] focus:ring-0"
            />
          </div>
        </div>
        
        {/* Quick Price Options */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Under $2K', min: '', max: '2000' },
              { label: '$2K - $3K', min: '2000', max: '3000' },
              { label: '$3K - $4K', min: '3000', max: '4000' },
              { label: 'Over $4K', min: '4000', max: '' },
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => {
                  setMinPrice(range.min)
                  setMaxPrice(range.max)
                }}
                className="px-3 py-2 text-[14px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] text-[#6B7280] hover:bg-[#F1F5F9] hover:text-[#374151] transition-colors"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Validation */}
        {minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice) && (
          <p className="text-red-500 text-[14px] mt-2">Min price cannot be greater than max price</p>
        )}
        
        {/* Clear Price Range */}
        {(minPrice || maxPrice) && (
          <button
            onClick={() => {
              setMinPrice('')
              setMaxPrice('')
            }}
            className="text-[14px] text-[#6B7280] hover:text-[#374151] mt-2 underline"
          >
            Clear price range
          </button>
        )}
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
              showAbove={true}
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
              showAbove={true}
            />
          </div>
        </div>
    </div>
  )

  // Check if we're on mobile or desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    // Check on mount
    checkMobile()
    
    // Check on resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
            {/* Mobile Drawer using shadcn Drawer */}
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent className="h-[85vh] px-0 rounded-t-[32px]">
            <div className="mx-auto w-full">
              {/* Drawer handle is built into shadcn Drawer */}
              <DrawerHeader className="text-left px-6">
                <DrawerTitle className="text-[20px] leading-[28px] font-semibold font-syne text-[#191A23]">
                  More Filter
                </DrawerTitle>
              </DrawerHeader>
              
              <div className="px-6 py-4 overflow-y-auto scrollbar-thin max-h-[calc(85vh-200px)]">
                <FilterContent />
              </div>

              <DrawerFooter className="px-6 py-6 flex flex-col gap-3">
                <Button
                  onClick={() => {
                    const filterCriteria: FilterCriteria = {
                      type: selectedType,
                      category: selectedCategory,
                      bedrooms: selectedBedrooms,
                      bathrooms: selectedBathrooms,
                      floorArea: selectedFloorArea,
                      minYear: minYear,
                      maxYear: maxYear,
                      minPrice: minPrice,
                      maxPrice: maxPrice,
                    }
                    onApplyFilter(filterCriteria)
                    onClose()
                  }}
                  className="w-full py-4 px-6 h-auto rounded-[16px] font-semibold text-[16px] text-white bg-[#191A23] hover:bg-[#1A1B2E]"
                >
                  Apply Filter
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full py-4 px-6 h-auto rounded-[16px] font-semibold text-[16px] text-[#191A23] bg-[#F7F2FF] border-[#F7F2FF] hover:bg-[#F1F5F9] hover:border-[#F1F5F9]"
                >
                  Cancel
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        /* Desktop Modal */
        <div ref={modalRef} className="absolute top-full right-0 mt-2 z-[1001] w-[440px]">
          {isOpen && (
            <div className="bg-white rounded-[24px] shadow-2xl max-h-[80vh] overflow-hidden border border-[#E5E7EB]">
              <div className="flex flex-col h-full max-h-[80vh]">
                {/* Header */}
                <div className="flex-shrink-0 p-[24px] border-b border-[#F1F5F9]">
                  <h2 className="text-[20px] leading-[28px] font-semibold font-syne text-[#191A23]">More Filter</h2>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 px-6 py-6 overflow-y-auto scrollbar-thin">
                  <FilterContent />
                </div>

                {/* Footer Buttons */}
                <div className="flex-shrink-0 px-6 py-6 border-t border-[#F1F5F9] flex gap-3 bg-white">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 py-4 px-6 h-auto rounded-[16px] font-semibold text-[16px] text-[#191A23] bg-[#F7F2FF] border-[#F7F2FF] hover:bg-[#F1F5F9] hover:border-[#F1F5F9]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const filterCriteria: FilterCriteria = {
                        type: selectedType,
                        category: selectedCategory,
                        bedrooms: selectedBedrooms,
                        bathrooms: selectedBathrooms,
                        floorArea: selectedFloorArea,
                        minYear: minYear,
                        maxYear: maxYear,
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                      }
                      onApplyFilter(filterCriteria)
                      onClose()
                    }}
                    className="flex-1 py-4 px-6 h-auto rounded-[16px] font-semibold text-[16px] text-white bg-[#191A23] hover:bg-[#1A1B2E]"
                  >
                    Apply Filter
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}