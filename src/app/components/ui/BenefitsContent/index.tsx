import React from 'react'

interface BenefitsContentProps {
    title: string;
    description: string;
}

const BenefitsContent: React.FC<BenefitsContentProps> = ({
    title,
    description
}) => {
    return (
        <div className='flex flex-col gap-[24px] lg:w-[460px] w-full'>
            <h2 className='lg:text-[48px] text-[32px] lg:leading-[56px] leading-[40px] tracking-[-0.04em] font-semibold font-syne'>
                {title}
            </h2>
            <p className='lg:w-[430px] w-full text-[18px] leading-[28px] font-light font-hanken text-[#686A79]'>
                {description}
            </p>
        </div>
    )
}

export default BenefitsContent