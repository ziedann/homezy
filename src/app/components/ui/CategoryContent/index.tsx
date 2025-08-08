import React from 'react'
import CategoryCard from '../CategoryCard'
import SkeletonCategoryCard from '../SkeletonCategoryCard'

interface CategoryContentProps {
  categories?: Array<{
    icon: React.ReactNode
    title: string
    listingCount: string
  }>
  isLoading?: boolean
}

export default function CategoryContent({ categories, isLoading }: CategoryContentProps) {
  if (isLoading) {
    return (
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[32px] gap-[24px]'>
        {[...Array(3)].map((_, index) => (
          <SkeletonCategoryCard key={index} />
        ))}
      </div>
    )
  }

  if (!categories) {
    return null
  }

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[32px] gap-[24px]'>
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          icon={category.icon}
          title={category.title}
          listingCount={category.listingCount}
        />
      ))}
    </div>
  )
}