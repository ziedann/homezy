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
      <h3 className="text-dark-100 text-base font-semibold font-syne mb-6">{title}</h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="text-dark-60 text-sm font-light font-hanken hover:text-dark-100">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
