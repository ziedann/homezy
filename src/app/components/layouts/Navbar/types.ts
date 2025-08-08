export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Properties',
    href: '/'
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