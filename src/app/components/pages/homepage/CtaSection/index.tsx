import React from 'react'
import PatternCta from '@/app/assets/images/pattern-cta.svg'
import Send from '@/app/assets/icons/send.svg'
import SectionContainer from '@/app/components/ui/SectionContainer'

export default function CtaSection() {
    return (
        <SectionContainer>
            <div className="relative w-full h-[380px] bg-[#C1A5FF] rounded-[24px] border-[2px] border-[#191A23] overflow-hidden">
                {/* Pattern Background */}
                <PatternCta className="absolute inset-0 left-[265px] w-full h-full w-[1173px] " />

                {/* Content Container */}
                <div className="relative z-10 flex flex-row justify-between h-full">
                    {/* Left Content */}
                    <div className="flex flex-col gap-[16px] p-[64px]">
                        <div>
                            <h2 className="text-[48px] leading-[56px] tracking-[-0.04em] font-semibold font-syne text-white">
                                Subscribe To<br />Our Newsletter
                            </h2>
                            <p className="text-[18px] leading-[28px] font-light font-hanken text-[#E7DCFF]">
                                Join our newsletter to stay up to date on features<br />and releases.
                            </p>
                        </div>
                        <div className="flex flex-row gap-[16px]">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    className="w-[320px] h-[56px] px-[24px] rounded-[12px] bg-white text-[16px] leading-[24px] font-regular font-hanken text-[#686A79] focus:outline-none focus:ring-2 focus:ring-[#E7DCFF]"
                                />
                            </div>
                            <button className="flex items-center justify-center gap-[8px] h-[56px] px-[24px] bg-[#191A23] rounded-[12px] hover:bg-[#2C2D3C] transition-colors">
                                <span className="text-[16px] leading-[24px] font-semibold font-hanken text-white">
                                    Subscribe
                                </span>
                                <Send className="w-[20px] h-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    )
}