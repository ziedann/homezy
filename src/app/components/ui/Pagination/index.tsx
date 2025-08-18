'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPrevious,
  onNext
}: PaginationProps) {
  // Calculate display info
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Only show pagination if more than 1 page
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <button 
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-colors ${
          currentPage === 1 
            ? 'border-[#E7DCFF] text-[#9CA3AF] cursor-not-allowed' 
            : 'border-[#E7DCFF] hover:bg-[#F7F2FF] text-[#686A79]'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Page Numbers */}
      {(() => {
        const pages = []
        const showPages = 5 // Maximum pages to show
        let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
        let endPage = Math.min(totalPages, startPage + showPages - 1)
        
        // Adjust start if we're near the end
        if (endPage - startPage + 1 < showPages) {
          startPage = Math.max(1, endPage - showPages + 1)
        }
        
        // Show first page if not included
        if (startPage > 1) {
          pages.push(
            <button
              key={1}
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]"
            >
              1
            </button>
          )
          if (startPage > 2) {
            pages.push(<span key="dots1" className="px-2 text-[#686A79]">...</span>)
          }
        }
        
        // Show page range
        for (let i = startPage; i <= endPage; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                currentPage === i
                  ? 'bg-[#191A23] text-white'
                  : 'border border-[#E7DCFF] hover:bg-[#F7F2FF] text-[#686A79]'
              }`}
            >
              {i}
            </button>
          )
        }
        
        // Show last page if not included
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            pages.push(<span key="dots2" className="px-2 text-[#686A79]">...</span>)
          }
          pages.push(
            <button
              key={totalPages}
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]"
            >
              {totalPages}
            </button>
          )
        }
        
        return pages
      })()}
      
      {/* Next Button */}
      <button 
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-colors ${
          currentPage === totalPages 
            ? 'border-[#E7DCFF] text-[#9CA3AF] cursor-not-allowed' 
            : 'border-[#E7DCFF] hover:bg-[#F7F2FF] text-[#686A79]'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
