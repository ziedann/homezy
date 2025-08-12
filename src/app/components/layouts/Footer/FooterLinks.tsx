import React from 'react'

interface FooterLinksProps {
  title: string
  links: Array<{
    href: string
    text: string
  }>
}

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h3 className="text-[#686A79] text-[16px] leading-[26px] font-light font-hanken mb-[32px]">{title}</h3>
      <ul className="space-y-[16px]">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="text-[#191A23] text-[16px] leading-[20px] font-medium font-hanken hover:text-dark-100">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
