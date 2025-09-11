'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '@assets/icons/logo.svg'
import ButtonText from '@/app/components/ui/ButtonText'
import Footer from '@/app/components/layouts/Footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle forgot password logic here
    console.log('Forgot password email:', email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="px-4 md:px-5 lg:px-0 pt-8">
          <div className="max-w-[1160px] mx-auto">
            <Link href="/">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>
        </div>

        <div className="flex min-h-[calc(100vh-120px)]">
          {/* Left Section - Success Message */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center px-4 md:px-5 lg:px-0">
            <div className="max-w-[400px] mx-auto w-full text-center">
              <div className="mb-8">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-[32px] md:text-[40px] font-bold text-dark-100 mb-2">
                  Check Your Email
                </h1>
                <p className="text-dark-60 text-[16px] mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-dark-60 text-[14px]">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-500 hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>

              <div className="space-y-4">
                <Link href="/sign-in">
                  <ButtonText variant="primary" className="w-full py-4 text-[16px]">
                    Back to Sign In
                  </ButtonText>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Testimonial */}
          <div className="hidden lg:flex lg:w-3/5 bg-[#F7F2FF] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <path d="M50 50h300v300H50z" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M100 100l200 200M300 100L100 300" stroke="white" strokeWidth="2"/>
              </svg>
            </div>

            {/* Testimonial Card */}
            <div className="flex items-center justify-center w-full p-12">
              <div className="bg-white rounded-[20px] p-8 shadow-lg max-w-md w-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-dark-100 text-[16px] leading-relaxed mb-6">
                  "Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-dark-100 text-[16px]">Brooklyn Simmons</p>
                    <p className="text-dark-60 text-[14px]">CEO of Asana</p>
                  </div>
                  <div className="w-12 h-12 bg-dark-100 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-[20px]">N</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 md:px-5 lg:px-0 pt-8">
        <div className="max-w-[1160px] mx-auto">
          <Link href="/">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Left Section - Forgot Password Form */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center px-4 md:px-5 lg:px-0">
          <div className="max-w-[400px] mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-[32px] md:text-[40px] font-bold text-dark-100 mb-2">
                Forgot Password?
              </h1>
              <p className="text-dark-60 text-[16px]">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-dark-100 text-[16px] font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-[15px] text-[16px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Reset Password Button */}
              <ButtonText 
                variant="primary" 
                className="w-full py-4 text-[16px]"
                onClick={handleSubmit}
              >
                Reset Password
              </ButtonText>

              {/* Back to Sign In Link */}
              <div className="text-center pt-4">
                <span className="text-dark-60 text-[14px]">Remember your password? </span>
                <Link href="/sign-in" className="text-primary-500 text-[14px] font-medium hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Testimonial */}
        <div className="hidden lg:flex lg:w-3/5 bg-[#F7F2FF] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <path d="M50 50h300v300H50z" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M100 100l200 200M300 100L100 300" stroke="white" strokeWidth="2"/>
            </svg>
          </div>

          {/* Testimonial Card */}
          <div className="flex items-center justify-center w-full p-12">
            <div className="bg-white rounded-[20px] p-8 shadow-lg max-w-md w-full">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-dark-100 text-[16px] leading-relaxed mb-6">
                "Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-dark-100 text-[16px]">Brooklyn Simmons</p>
                  <p className="text-dark-60 text-[14px]">CEO of Asana</p>
                </div>
                <div className="w-12 h-12 bg-dark-100 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-[20px]">N</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
