'use client'

import { useReportWebVitals } from 'next/web-vitals'

interface WebVitalsProps {
  onMetric?: (metric: any) => void
}

export default function WebVitals({ onMetric }: WebVitalsProps) {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        navigationType: metric.navigationType,
      })
    }
    
    // Send to analytics service (customize as needed)
    if (onMetric) {
      onMetric(metric)
    }
    
    // Example: Send to Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        custom_map: { metric_id: 'web_vitals' },
        metric_id: 'web_vitals',
        metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_delta: Math.round(metric.name === 'CLS' ? (metric.delta || 0) * 1000 : (metric.delta || 0)),
      })
    }
  })

  return null
}
