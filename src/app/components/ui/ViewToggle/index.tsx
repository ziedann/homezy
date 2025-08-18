'use client'

import React from 'react'
import GridIcon from '@assets/icons/grid.svg'
import RowVerticalIcon from '@assets/icons/row-vertical.svg'

interface ViewToggleProps {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-[#F8FAFC] p-1 rounded-[12px]">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center justify-center w-12 h-12 rounded-[8px] transition-all duration-200 ${
          viewMode === 'grid' 
            ? 'bg-white border border-[#191A23] shadow-sm' 
            : 'hover:bg-white/50'
        }`}
      >
        <GridIcon className={`w-5 h-5 ${viewMode === 'grid' ? 'text-[#191A23]' : 'text-[#9CA3AF]'}`} />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`flex items-center justify-center w-12 h-12 rounded-[8px] transition-all duration-200 ${
          viewMode === 'list' 
            ? 'bg-white border border-[#191A23] shadow-sm' 
            : 'hover:bg-white/50'
        }`}
      >
        <RowVerticalIcon className={`w-5 h-5 ${viewMode === 'list' ? 'text-[#191A23]' : 'text-[#9CA3AF]'}`} />
      </button>
    </div>
  )
}
