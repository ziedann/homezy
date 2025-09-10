'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '../shadCn/drawer'
import { Button } from '../shadCn/button'
import { FilterCriteria } from '@/app/types/search-property'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilter: (criteria: FilterCriteria) => void
  onClearFilters?: (clearedFields: string[]) => void
  currentSaleRent?: 'sale' | 'rent' | null
  currentSavedFilters?: FilterCriteria | null
}

export default function FilterModal({ isOpen, onClose, onApplyFilter, onClearFilters, currentSaleRent, currentSavedFilters }: FilterModalProps) {
  const [selectedType, setSelectedType] = useState<'sale' | 'rent' | null>(currentSaleRent || null)
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
  const [isFloorAreaOpen, setIsFloorAreaOpen] = useState(false)
  const [isMinYearOpen, setIsMinYearOpen] = useState(false)
  const [isMaxYearOpen, setIsMaxYearOpen] = useState(false)
  
  // Mobile state
  const [isMobile, setIsMobile] = useState(false)
  
  const modalRef = useRef<HTMLDivElement>(null)

  // Filter options
  const bedroomOptions = [
    { value: '1', label: '1 bed' },
    { value: '2', label: '2 beds' },
    { value: '3', label: '3 beds' },
  ]

  const bathroomOptions = [
    { value: '1', label: '1 bath' },
    { value: '2', label: '2 baths' },
    { value: '3', label: '3 baths' },
  ]

  const floorAreaOptions = [
    { value: '3x4', label: '3x4 m²' },
    { value: '3x5', label: '3x5 m²' },
    { value: '4x5', label: '4x5 m²' },
    { value: '4x6', label: '4x6 m²' },
    { value: '5x7', label: '5x7 m²' },
    { value: '6x8', label: '6x8 m²' },
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
    setIsFloorAreaOpen(false)
    setIsMinYearOpen(false)
    setIsMaxYearOpen(false)
  }

  // Clear sale/rent toggle
  const clearSaleRent = () => {
    setSelectedType(null) // Clear selection
    // Notify parent immediately about clearing sale/rent
    if (onClearFilters) {
      onClearFilters(['saleRent'])
    }
  }

  // Clear individual fields
  const clearBedrooms = () => {
    setSelectedBedrooms('')
    setSelectedBedroomsLabel('')
    // Don't notify parent immediately - wait for Apply Filter
  }

  const clearBathrooms = () => {
    setSelectedBathrooms('')
    setSelectedBathroomsLabel('')
    // Don't notify parent immediately - wait for Apply Filter
  }

  const clearFloorArea = () => {
    setSelectedFloorArea('')
    setSelectedFloorAreaLabel('')
    // Don't notify parent immediately - wait for Apply Filter
  }

  const clearYearBuilt = () => {
    setMinYear('')
    setMinYearLabel('')
    setMaxYear('')
    setMaxYearLabel('')
    // Don't notify parent immediately - wait for Apply Filter
  }

  // Clear all filters
  const clearAllFilters = () => {
    // Clear all local states
    setSelectedType(null)
    setSelectedBedrooms('')
    setSelectedBedroomsLabel('')
    setSelectedBathrooms('')
    setSelectedBathroomsLabel('')
    setSelectedFloorArea('')
    setSelectedFloorAreaLabel('')
    setMinYear('')
    setMinYearLabel('')
    setMaxYear('')
    setMaxYearLabel('')
    closeAllDropdowns()
    
    // Notify parent about clearing all filters
    if (onClearFilters) {
      onClearFilters(['saleRent', 'bedrooms', 'bathrooms', 'floorArea', 'minYear', 'maxYear', 'minPrice', 'maxPrice'])
    }
  }

  // Check if any filter is active
  const hasActiveFilters = () => {
    return selectedType !== null || selectedBedrooms || selectedBathrooms || 
           selectedFloorArea || minYear || maxYear
  }

  // Handle click outside to close modal (for desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
        closeAllDropdowns()
      }
    }

    if (isOpen && !isMobile) {
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
      <div>
        <div className="flex items-center justify-between mb-[12px]">
          <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23]">Property Type</label>
          {selectedType && (
            <button
              onClick={clearSaleRent}
              className="text-[12px] text-[#6B7280] hover:text-[#EF4444] transition-colors underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex gap-2 bg-[#F5F5F7] rounded-[16px] p-1">
          <button
            onClick={() => setSelectedType('sale')}
            className={`flex-1 py-3 px-6 rounded-[12px] font-semibold text-[16px] font-hanken transition-all duration-200 ${
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
      </div>


      {/* Bedrooms and Bathrooms Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bedrooms */}
        <div>
          <div className="flex items-center justify-between mb-[12px]">
            <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23]">Bedrooms</label>
            {selectedBedrooms && (
              <button
                onClick={clearBedrooms}
                className="text-[12px] text-[#6B7280] hover:text-[#EF4444] transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
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
          <div className="flex items-center justify-between mb-[12px]">
            <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23]">Bathrooms</label>
            {selectedBathrooms && (
              <button
                onClick={clearBathrooms}
                className="text-[12px] text-[#6B7280] hover:text-[#EF4444] transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
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
          <div className="flex items-center justify-between mb-[12px]">
            <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23]">Floor Area</label>
            {selectedFloorArea && (
              <button
                onClick={clearFloorArea}
                className="text-[12px] text-[#6B7280] hover:text-[#EF4444] transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
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
            placeholder="Select Area"
            showAbove={true}
          />
        </div>


              {/* Year Built */}
        <div>
          <div className="flex items-center justify-between mb-[12px]">
            <label className="block text-[16px] leading-[20px] font-hanken font-semibold text-[#191A23]">Year Built</label>
            {(minYear || maxYear) && (
              <button
                onClick={clearYearBuilt}
                className="text-[12px] text-[#6B7280] hover:text-[#EF4444] transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
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

        {/* Clear All Filters */}
        {hasActiveFilters() && (
          <div className="pt-4 border-t border-[#F1F5F9]">
            <button
              onClick={clearAllFilters}
              className="w-full py-3 px-4 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] text-[14px] font-medium text-[#DC2626] hover:bg-[#FEE2E2] hover:border-[#FCA5A5] transition-colors flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#DC2626]">
                <path d="M6 6L10 10M10 6L6 10M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Clear All Filters
            </button>
          </div>
        )}
    </div>
  )

  // Sync with parent state when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      // Sync saved filters first
      if (currentSavedFilters) {
        setSelectedType(currentSavedFilters.type || null)
        setSelectedBedrooms(currentSavedFilters.bedrooms || '')
        setSelectedBedroomsLabel(currentSavedFilters.bedrooms ? `${currentSavedFilters.bedrooms} bed${currentSavedFilters.bedrooms !== '1' ? 's' : ''}` : '')
        setSelectedBathrooms(currentSavedFilters.bathrooms || '')
        setSelectedBathroomsLabel(currentSavedFilters.bathrooms ? `${currentSavedFilters.bathrooms} bath${currentSavedFilters.bathrooms !== '1' ? 's' : ''}` : '')
        setSelectedFloorArea(currentSavedFilters.floorArea || '')
        setSelectedFloorAreaLabel(currentSavedFilters.floorArea || '')
        setMinYear(currentSavedFilters.minYear || '')
        setMinYearLabel(currentSavedFilters.minYear || '')
        setMaxYear(currentSavedFilters.maxYear || '')
        setMaxYearLabel(currentSavedFilters.maxYear || '')
      } else {
        // Use currentSaleRent if no saved filters
        setSelectedType(currentSaleRent || null)
        // Clear other saved filters if no current saved filters
        setSelectedBedrooms('')
        setSelectedBedroomsLabel('')
        setSelectedBathrooms('')
        setSelectedBathroomsLabel('')
        setSelectedFloorArea('')
        setSelectedFloorAreaLabel('')
        setMinYear('')
        setMinYearLabel('')
        setMaxYear('')
        setMaxYearLabel('')
      }
      
      // Close dropdowns
      closeAllDropdowns()
    }
  }, [isOpen, currentSaleRent, currentSavedFilters])

  // Check if we're on mobile or desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent className="h-[90vh] px-0 rounded-t-[32px] flex flex-col">
            <div className="flex flex-col h-full">
              {/* Custom visible drag handle */}
              <div className="flex justify-center pt-4 pb-3" style={{ zIndex: 1000 }}>
                <div 
                  className="w-12 h-[6px] rounded-full bg-[#ececec]"
                ></div>
              </div>
              
              <DrawerHeader className="text-left px-6 flex-shrink-0 pt-2">
                <DrawerTitle className="text-[20px] leading-[28px] font-semibold font-syne text-[#191A23]">
                  More Filter
                </DrawerTitle>
              </DrawerHeader>
              
              <div className="flex-1 px-6 py-4 overflow-y-auto scrollbar-thin min-h-0">
                <FilterContent />
              </div>

              <DrawerFooter className="px-6 mb-6 flex flex-col gap-2 flex-shrink-0 border-t border-gray-100 bg-white">
                <Button
                  onClick={() => {
                    const filterCriteria: FilterCriteria = {
                      type: selectedType, // Pass null if clear state
                      category: '',
                      bedrooms: selectedBedrooms,
                      bathrooms: selectedBathrooms,
                      floorArea: selectedFloorArea,
                      location: '',
                      minYear: minYear,
                      maxYear: maxYear,
                      minPrice: '',
                      maxPrice: '',
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
        // Desktop Modal
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
                        type: selectedType, // Pass null if clear state
                        category: '',
                        bedrooms: selectedBedrooms,
                        bathrooms: selectedBathrooms,
                        floorArea: selectedFloorArea,
                        location: '',
                        minYear: minYear,
                        maxYear: maxYear,
                        minPrice: '',
                        maxPrice: '',
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