import React from 'react'
import PatternBenefits from '@/app/assets/images/pattern-benefits.svg'
import CloudIcon from '@/app/assets/images/cloud-line.svg'
import BenefitCard from '@/app/components/ui/BenefitCard'
import BackgroundPattern from '@/app/components/ui/BackgroundPattern'
import BenefitsContent from '@/app/components/ui/BenefitsContent'
import CoinIcon from '@/app/assets/icons/coin.svg'
import LikeIcon from '@/app/assets/icons/like-shapes.svg'
import PeopleIcon from '@/app/assets/icons/people.svg'
import SectionContainer from '@/app/components/ui/SectionContainer'

export default function BenefitsSection() {
    return (
        <div className='relative overflow-hidden'>
            {/* Background Pattern */}
            <BackgroundPattern>
                <PatternBenefits className="absolute right-0 top-[80px] w-[873px] h-[529px]"/>
                <CloudIcon className='absolute left-0 top-[300px] w-[190px] h-[70px]' />
            </BackgroundPattern>

            <SectionContainer>
                <div className='flex flex-row justify-between'>
                    {/* Left Content */}
                    <BenefitsContent 
                        title="Comfort Is Our Top Priority For You"
                        description="We guarantee that the products we sell will make our customers happy because we are very concerned about our consumer satisfaction"
                    />

                    {/* Right Content - Benefits Cards */}
                    <div className='flex flex-col gap-[24px]'>
                        <BenefitCard 
                            icon={<CoinIcon className='w-[48px] h-[48px]' />}
                            title="Affordable Price"
                            description="We provide the best for you. The price we offer accordance with the quality we provide"
                        />
                        <BenefitCard 
                            icon={<LikeIcon className='w-[48px] h-[48px]' />}
                            title="Clear Legality"
                            description="Put your trust in us. We are a legal entity with official legality in the relevant government"
                        />
                        <BenefitCard 
                            icon={<PeopleIcon className='w-[48px] h-[48px]' />}
                            title="Experienced Agent"
                            description="We always work with agents in their fields so that we can provide the best quality"
                        />
                    </div>
                </div>
            </SectionContainer>
        </div>
    )
}