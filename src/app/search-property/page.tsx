'use client'

import React from 'react'

export default function SearchPropertyPage() {
  return (
    <main className="min-h-screen bg-[#FBFAFF]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Search Properties
        </h1>
        
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">Any Price</option>
                <option value="0-100000">$0 - $100,000</option>
                <option value="100000-500000">$100,000 - $500,000</option>
                <option value="500000+">$500,000+</option>
              </select>
            </div>
          </div>
          <button className="mt-4 w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Search Properties
          </button>
        </div>
        
        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Search Results
          </h2>
          <div className="text-gray-600">
            <p>Search results will appear here...</p>
          </div>
        </div>
      </div>
    </main>
  )
}