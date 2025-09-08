'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { DivIcon, LatLngExpression, Map as LeafletMap } from 'leaflet'
import { Property, SearchMapProps, PopupPosition } from '@/app/types/search-property'
import PropertyPopup from '../PropertyPopup'

const MapContainer = dynamic(
  async () => (await import('react-leaflet')).MapContainer,
  { ssr: false }
)
const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, { ssr: false })
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false })

function createPriceIcon(label: string, isActive?: boolean) {
  const bubbleBase = [
    'relative',
    'inline-flex',
    'items-center',
    'gap-3',
    'px-4',
    'py-2',
    'rounded-[12px]',
    'font-syne',
    isActive ? 'bg-black text-white' : 'bg-white text-[#0B0B0B]',
    'whitespace-nowrap',
    'shadow-lg'
  ].join(' ')

  const iconCircle = [
    'inline-flex',
    'items-center',
    'justify-center',
    'w-6',
    'h-6',
    'rounded-full',
    isActive ? 'bg-white text-black' : 'bg-[#B592FF] text-white'
  ].join(' ')

  const priceText = 'text-[16px] font-bold'

  const tail = isActive
    ? '<span class="absolute left-1/2 -bottom-[7px] -translate-x-1/2 w-3 h-3 rotate-45 bg-black shadow-lg"></span>'
    : ''

  const houseSvg = `
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66675 18.3333H18.3334" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.45825 18.3334L2.49992 8.30836C2.49992 7.80003 2.74159 7.31674 3.14159 7.00008L8.97492 2.4584C9.57492 1.99173 10.4166 1.99173 11.0249 2.4584L16.8583 6.99173C17.2666 7.3084 17.4999 7.7917 17.4999 8.30836V18.3334" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
      <path d="M10.8334 14.1667H9.16675C8.47508 14.1667 7.91675 14.7251 7.91675 15.4167V18.3334H12.0834V15.4167C12.0834 14.7251 11.5251 14.1667 10.8334 14.1667Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
      <path d="M7.91675 11.4584H6.25008C5.79175 11.4584 5.41675 11.0834 5.41675 10.6251V9.37508C5.41675 8.91675 5.79175 8.54175 6.25008 8.54175H7.91675C8.37508 8.54175 8.75008 8.91675 8.75008 9.37508V10.6251C8.75008 11.0834 8.37508 11.4584 7.91675 11.4584Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
      <path d="M13.75 11.4584H12.0833C11.625 11.4584 11.25 11.0834 11.25 10.6251V9.37508C11.25 8.91675 11.625 8.54175 12.0833 8.54175H13.75C14.2083 8.54175 14.5833 8.91675 14.5833 9.37508V10.6251C14.5833 11.0834 14.2083 11.4584 13.75 11.4584Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
      <path d="M15.8333 5.83325L15.8083 3.33325H12.1416" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `

  const html = `
    <div class="${bubbleBase}">
      <span class="${iconCircle}">${houseSvg}</span>
      <span class="${priceText}">${label}</span>
      ${tail}
    </div>
  `

  return new DivIcon({
    className: isActive ? 'z-[40]' : 'z-[30]',
    html,
    iconAnchor: [50, 30],
    popupAnchor: [0, -16],
  })
}

// Custom component to get map instance
function MapEventHandler({ onMapReady }: { onMapReady: (map: LeafletMap) => void }) {
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50 // 5 seconds max
    
    const findMap = () => {
      const mapContainer = document.querySelector('.leaflet-container') as any
      if (mapContainer && mapContainer._leaflet_map) {
        onMapReady(mapContainer._leaflet_map)
        return
      }
      
      attempts++
      if (attempts < maxAttempts) {
        setTimeout(findMap, 100)
      } else {
        console.error('Failed to find map after', maxAttempts, 'attempts')
      }
    }
    
    // Start searching after a small delay to let the map initialize
    setTimeout(findMap, 200)
  }, [onMapReady])
  
  return null
}

export default function SearchMap({
  center = [40.742, -73.98],
  zoom = 12,
  hideZoomControls = false,
}: SearchMapProps) {
  const tileUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
  
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        const data = await response.json()
        setProperties(data.properties)
      } catch (error) {
        console.error('Failed to fetch properties:', error)
      }
    }
    
    fetchProperties()
  }, [])
  
  // Calculate popup position below marker
  const updatePopupPosition = (propertyId: number) => {
    if (!mapRef.current || !containerRef.current) return
    
    const property = properties.find(p => p.id === propertyId)
    if (!property) return
    
    const point = mapRef.current.latLngToContainerPoint(property.coordinates)
    
    setPopupPosition({
      x: point.x,
      y: point.y + 40 // Position below marker
    })
  }
  
  // Handle marker click
  const handleMarkerClick = (propertyId: number) => {
    setSelectedId(propertyId)
    // Add delay to ensure map is ready
    setTimeout(() => {
      if (mapRef.current && properties.length > 0) {
        updatePopupPosition(propertyId)
      }
    }, 300)
  }
  
  // Handle map ready
  const handleMapReady = (map: LeafletMap) => {
    mapRef.current = map
    if (selectedId) {
      setTimeout(() => updatePopupPosition(selectedId), 100)
    }
  }
  
  // Update map view when center or zoom changes
  useEffect(() => {
    if (!mapRef.current) return
    
    const map = mapRef.current
    map.setView(center, zoom)
  }, [center, zoom])

  // Update popup position on map move/zoom
  useEffect(() => {
    if (!mapRef.current || !selectedId || properties.length === 0) return
    
    const map = mapRef.current
    const updatePosition = () => updatePopupPosition(selectedId)
    
    map.on('zoom', updatePosition)
    map.on('move', updatePosition)
    
    return () => {
      map.off('zoom', updatePosition)
      map.off('move', updatePosition)
    }
  }, [selectedId])
  
  const selectedProperty = properties.find(p => p.id === selectedId)
  
  // Show popup when we have selected property and either position or fallback to center
  const shouldShowPopup = selectedId && selectedProperty

  return (
    <div ref={containerRef} className={`relative w-full h-[400px] rounded-[16px] overflow-hidden border border-[#191A23] bg-white z-[1] ${hideZoomControls ? 'hide-zoom-controls' : ''}`}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom className="w-full h-full" attributionControl={false}>
        <TileLayer url={tileUrl} attribution='' />
        <MapEventHandler onMapReady={handleMapReady} />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={property.coordinates}
            icon={createPriceIcon(property.price, selectedId === property.id)}
            eventHandlers={{
              click: () => handleMarkerClick(property.id),
            }}
          />
        ))}
      </MapContainer>


      {/* Property Popup */}
      {shouldShowPopup && (
        <PropertyPopup 
          property={selectedProperty}
          popupPosition={popupPosition}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
