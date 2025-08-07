import React from 'react'

interface NavigationButtonProps {
    icon: React.ReactNode
    onClick: () => void
}

export default function NavigationButton({ icon, onClick }: NavigationButtonProps) {
    return (
        <button 
            onClick={onClick}
            className='flex items-center justify-center p-[10px] bg-[#191A23] rounded-[15px] hover:bg-[#2C2D3C] transition-colors'
        >
            {icon}
        </button>
    )
}
