import React from 'react'
import Logo from '@/app/assets/icons/logo.svg'
import Phone from '@/app/assets/icons/phone.svg'
import Instagram from '@/app/assets/icons/instagram.svg'
import Facebook from '@/app/assets/icons/facebook.svg'
import Twitter from '@/app/assets/icons/twitter.svg'

export default function FooterLogo() {
  return (
    <div className="max-w-[360px]">
      <Logo className="h-8 w-auto mb-[24px]" />
      <p className="text-dark-60 text-sm font-light font-hanken">
        We are creative people who provide the best way to you who want to have a new comfortable and suitable place to live
      </p>
      <div className="flex gap-[24px] mt-[24px]">
        <Phone className="h-6 w-auto" />
        <a href="#" className="text-dark-100 hover:text-dark-60">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#" className="text-dark-100 hover:text-dark-60">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" className="text-dark-100 hover:text-dark-60">
          <Twitter className="w-6 h-6" />
        </a>
      </div>
    </div>
  )
}
