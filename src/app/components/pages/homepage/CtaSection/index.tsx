import React, { useEffect, useState } from 'react'
import SectionContainer from '@/app/components/ui/SectionContainer'
import CtaCard from '@/app/components/ui/CtaCard'

interface CtaData {
    title: string
    description: string
    buttonText: string
    placeholderText: string
}

export default function CtaSection() {
    const [data, setData] = useState<CtaData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/home/cta')
                const jsonData = await response.json()
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching CTA data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (
        <SectionContainer>
                <CtaCard
                    title={data.title}
                    description={data.description}
                    placeholder={data.placeholderText}
                    buttonText={data.buttonText}
                />
        </SectionContainer>
    )
}