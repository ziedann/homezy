"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@assets/icons/logo.svg";
import CloudLine from "@assets/images/cloud-line.svg";
import PatternHero from "@assets/images/pattern-hero.svg";
import TestimonialCard from "@/app/components/ui/TestimonialCard";
import ButtonText from "@/app/components/ui/ButtonText";
import Footer from "@/app/components/layouts/Footer";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in data:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content Container */}
      <div className="flex-1 flex">
        {/* Left Section - Sign In Form (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col px-8 lg:px-16">
          {/* Logo Container - Top */}
          <div className="pt-8 pb-4">
            <Link href="/">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Main Content Container - Center */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-[500px] mx-auto w-full">
              <div className="my-[40px] flex flex-col gap-2">
                <h1 className="text-[32px] md:text-[40px] text-dark-[#191A23] leading-[40px] font-bold font-syne">
                  Welcome back!
                </h1>
                <p className="text-[#686A79] text-[16px] font-hanken">
                  Amet minim mollit non deserunt ullamco
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-dark-100 text-[16px] font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-200 rounded-[15px] text-[16px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-dark-100 text-[16px] font-bold mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-[15px] text-[16px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        {showPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 hover:cursor-pointer"
                    />
                    <span className="ml-2 text-[#868893] font-hanken font-light text-[16px]">
                      Remember Me
                    </span>
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#191A23] text-white rounded-[15px] text-[16px] font-bold hover:bg-[#191A23]/80 transition-all duration-300"
                >
                  Sign In
                </button>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-gray-200 rounded-[15px] text-dark-100 text-[16px] font-medium hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign In with Google
                </button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-dark-60 text-[14px]">
                    Don't you have an account?{" "}
                  </span>
                  <Link
                    href="/sign-up"
                    className="text-primary-500 text-[14px] font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Section - Testimonial (50%) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#CFB9FD] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            {/* Pattern Hero SVG */}
            <div className="absolute bottom-[-50px] right-[-280px]">
              <PatternHero className="w-[1250px] h-full" />
            </div>

            {/* Cloud Line Pattern */}
            <div className="absolute top-24 left-10 z-20">
              <CloudLine className="w-[300px] h-full [&_path]:fill-white" />
            </div>
            <div className="absolute top-8 right-[-80px] z-20">
              <CloudLine className="w-[300px] h-full [&_path]:fill-white" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="flex items-center justify-center w-full p-12 relative z-10">
            <TestimonialCard
              variant="auth"
              review="Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
              name="Brooklyn Simmons"
              role="CEO of Asana"
              rating={5}
              showCompanyLogo={true}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
