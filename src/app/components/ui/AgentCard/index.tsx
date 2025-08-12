import React from 'react'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import Phone from "@assets/icons/phone.svg"
import Instagram from "@assets/icons/instagram.svg"
import Facebook from "@assets/icons/facebook.svg"
import Twitter from "@assets/icons/twitter.svg"

interface AgentCardProps {
  image: StaticImageData | string
  name: string
  role: string
}

export default function AgentCard({ image, name, role }: AgentCardProps) {
  return (
    <div className="flex flex-row lg:gap-[20px] gap-[14px] bg-white rounded-[15px] p-[24px] border border-[#E7DCFF] lg:w-[368px] w-[330px] h-[156px]">
      <div className="w-[108px] h-[108px] rounded-[15px] bg-[#FFE1F2] overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
          width={108}
          height={108}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[2px]">
          <h3 className="lg:text-[24px] text-[22px] lg:leading-[32px] leading-[24px] lg:tracking-[-0.04em] tracking-[-0.05em] font-semibold font-syne text-secondary-dark-100">
            {name}
          </h3>
          <p className="text-[16px] leading-[26px] font-light font-hanken text-[#686A79]">
            {role}
          </p>
        </div>
        <div className="flex gap-4">
          <Phone className="h-6 w-auto text-secondary-dark-100 hover:text-secondary-dark-60" />
          <a href="#" className="text-secondary-dark-100 hover:text-secondary-dark-60">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-secondary-dark-100 hover:text-secondary-dark-60">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-secondary-dark-100 hover:text-secondary-dark-60">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  )
}
