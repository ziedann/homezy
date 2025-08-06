import React from 'react'
import CategoryCard from '../CategoryCard'

interface CategoryContentProps {
  categories: Array<{
    icon: React.ReactNode
    title: string
    listingCount: string
  }>
}

export default function CategoryContent({ categories }: CategoryContentProps) {
  return (
    <div className='flex flex-row justify-between'>
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