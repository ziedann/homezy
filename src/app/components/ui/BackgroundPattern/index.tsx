import React from 'react'

interface BackgroundPatternProps {
    children: React.ReactNode;
    className?: string;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`absolute inset-0 z-[-1] top-12 w-full ${className}`}>
            <div className="relative mx-auto max-w-[1160px]">
                {children}
            </div>
        </div>
    )
}

export default BackgroundPattern