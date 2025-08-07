import React from 'react'
import PatternCta from '@/app/assets/images/pattern-cta.svg'

interface CtaCardProps {
    title: string
    description: string
    placeholder: string
    buttonText: string
}

export default function CtaCard({
    title,
    description,
    placeholder,
    buttonText
}: CtaCardProps) {
    return (
        <div className="relative w-full lg:h-[380px] h-[500px] bg-[#C1A5FF] rounded-[24px] border-[2px] border-[#191A23] overflow-hidden">
            {/* Pattern Background */}
            <PatternCta className="absolute inset-0 lg:left-[265px] lg:w-[1173px] top-[150px] right-[30px] w-full h-full" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col lg:w-[420px] w-full h-full lg:px-[64px] p-[24px]">
                {/* Content */}
                <div className="flex flex-col lg:gap-[32px] gap-[24px] lg:w-[420px] w-full">
                    <div className="flex flex-col lg:gap-[16px] gap-3">
                        <h2 className="lg:text-[48px] text-[32px] lg:leading-[56px] leading-[40px] tracking-[-0.04em] lg:w-[358px] w-full font-semibold font-syne text-white">
                            {title}
                        </h2>
                        <p className="lg:w-[420px] w-full text-[18px] leading-[28px] font-light font-hanken text-[#E7DCFF]">
                            {description}
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:p-[8px] p-0 lg:bg-white lg:rounded-[15px] rounded-none lg:w-[414px] w-full gap-[8px] lg:gap-0">
                        <input
                            type="email"
                            placeholder={placeholder}
                            className="lg:w-[320px] w-full px-[16px] h-[56px] text-[16px] leading-[26px] font-light font-hanken text-[#B7B8C1] focus:outline-none rounded-[15px] lg:rounded-none"
                        />
                        <button className="flex items-center justify-center h-[56px] lg:px-[24px] bg-[#191A23] lg:rounded-[12px] rounded-[15px] hover:bg-[#2C2D3C] transition-colors w-full lg:w-auto">
                            <span className="text-[16px] leading-[24px] font-semibold font-hanken text-white">
                                {buttonText}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}