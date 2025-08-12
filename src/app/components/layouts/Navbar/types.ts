export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/routes/homepage'
  },
  {
    label: 'Properties',
    href: '/routes/search-property'
  },
  {
    label: 'Agents',
    href: '/'
  },
  {
    label: 'Pages',
    href: '#',
    hasDropdown: true
  }
]