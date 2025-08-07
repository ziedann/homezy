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
        <div className="relative w-full h-[380px] bg-[#C1A5FF] rounded-[24px] border-[2px] border-[#191A23] overflow-hidden">
            {/* Pattern Background */}
            <PatternCta className="absolute inset-0 left-[265px] w-[1173px] h-full" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-center w-[420px] h-full px-[64px]">
                {/* Content */}
                <div className="flex flex-col gap-[32px] w-[420px]">
                    <div className="flex flex-col gap-[16px]">
                        <h2 className="text-[48px] leading-[56px] tracking-[-0.04em] w-[358px] font-semibold font-syne text-white">
                            {title}
                        </h2>
                        <p className="w-[420px] text-[18px] leading-[28px] font-light font-hanken text-[#E7DCFF]">
                            {description}
                        </p>
                    </div>
                    <div className="flex p-[8px] bg-white rounded-[15px] w-[414px]">
                        <input
                            type="email"
                            placeholder={placeholder}
                            className="w-[320px] px-[16px] text-[16px] leading-[26px] font-light font-hanken text-[#B7B8C1] focus:outline-none"
                        />
                        <button className="flex items-center justify-center gap-[8px] h-[48px] px-[24px] bg-[#191A23] rounded-[12px] hover:bg-[#2C2D3C] transition-colors">
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
