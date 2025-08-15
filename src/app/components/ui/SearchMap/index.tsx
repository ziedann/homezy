'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { LatLngExpression, Map as LeafletMap } from 'leaflet'
import { createPriceIcon } from '../MapMarker'
import PropertyPopup from '../PropertyPopup'

const MapContainer = dynamic(
  async () => (await import('react-leaflet')).MapContainer,
  { ssr: false }
)
const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, { ssr: false })
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false })

interface Property {
  id: number
  price: string
  title: string
  location: string
  beds: number
  baths: number
  area: string
  image: any
  coordinates: LatLngExpression
  isMonthly: boolean
}

interface PopupPosition {
  x: number
  y: number
}

interface SearchMapProps {
  center?: LatLngExpression
  zoom?: number
  hideZoomControls?: boolean
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
          position={popupPosition}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
