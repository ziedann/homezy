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
        <div className='flex flex-col gap-[24px] w-[460px]'>
            <h2 className='text-[48px] leading-[56px] tracking-[4%] font-semibold font-syne'>
                {title}
            </h2>
            <p className='w-[430px] text-[18px] leading-[28px] font-regular font-hanken text-[#686A79]'>
                {description}
            </p>
        </div>
    )
}

export default BenefitsContent