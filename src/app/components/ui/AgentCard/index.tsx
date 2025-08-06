import React from 'react'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import Phone from "@/app/assets/icons/phone.svg"
import Instagram from "@/app/assets/icons/instagram.svg"
import Facebook from "@/app/assets/icons/facebook.svg"
import Twitter from "@/app/assets/icons/twitter.svg"

interface AgentCardProps {
  image: StaticImageData
  name: string
  role: string
}

export default function AgentCard({ image, name, role }: AgentCardProps) {
  return (
    <div className="flex flex-row gap-[20px] bg-white rounded-[15px] p-[24px] border border-[#E7DCFF] w-[368px] h-[156px]">
      <div className="w-[108px] h-[108px] rounded-[15px] bg-[#FFE1F2] overflow-hidden">
        <Image src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[2px]">
          <h3 className="text-[24px] leading-[32px] tracking-[-0.04em] font-semibold font-syne">
            {name}
          </h3>
          <p className="text-[16px] leading-[26px] font-light font-hanken text-[#686A79]">
            {role}
          </p>
        </div>
        <div className="flex gap-4">
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
    </div>
  )
}