'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
            
            // Enhanced ecommerce for real estate
            gtag('config', '${gaId}', {
              custom_map: {
                'custom_parameter_1': 'property_type',
                'custom_parameter_2': 'property_price',
                'custom_parameter_3': 'property_location'
              }
            });
          `,
        }}
      />
    </>
  );
}

// Utility functions for real estate specific tracking
export const trackPropertyView = (propertyId: string, propertyData: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'property_view', {
      property_id: propertyId,
      property_type: propertyData.type || 'unknown',
      property_price: propertyData.price || 0,
      property_location: propertyData.location || 'unknown',
      value: propertyData.price || 0,
      currency: 'USD'
    });
  }
};

export const trackPropertySearch = (searchParams: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'search', {
      search_term: searchParams.query || '',
      property_type: searchParams.type || '',
      price_range: searchParams.price || '',
      location: searchParams.location || ''
    });
  }
};

export const trackPropertyInquiry = (propertyId: string, inquiryType: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      property_id: propertyId,
      inquiry_type: inquiryType, // 'contact', 'tour', 'info'
      value: 1,
      currency: 'USD'
    });
  }
};
