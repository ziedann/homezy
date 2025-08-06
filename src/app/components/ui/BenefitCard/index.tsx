import React from 'react'

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
    icon,
    title,
    description
}) => {
    return (
        <div className='flex flex-row gap-[24px] w-[578px] p-[24px] bg-white rounded-[15px] border border-[#191A23] items-center'>
            <div className='p-[8px]'>
                {icon}
            </div>
            <div className='flex flex-col gap-[8px]'>
                <h3 className='text-[24px] leading-[32px] tracking-[4%] font-semibold font-syne'>
                    {title}
                </h3>
                <p className='text-[16px] leading-[26px] font-regular font-hanken text-[#686A79]'>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default BenefitCard