import React from 'react'
import SectionContainer from '@/app/components/ui/SectionContainer'
import CtaCard from '@/app/components/ui/CtaCard'

export default function CtaSection() {
    return (
        <SectionContainer>
            <CtaCard
                title="Subscribe To Our Newsletter"
                description="Join our newsletter to stay up to date on features and releases."
                placeholder="Enter Your Email Address"
                buttonText="Subscibe"
            />
        </SectionContainer>
    )
}