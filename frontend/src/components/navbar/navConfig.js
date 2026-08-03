import {
  BadgeDollarSign,
  Award,
  CircleHelp,
  Layers3,
  MessageCircle,
  Settings,
  User,
  Rocket,
} from 'lucide-react'

export const publicNavLinks = [
  { to: '/features', label: 'Features' },
  // { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  // { to: '/contact', label: 'Contact' },
]

export const privateNavLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  // { to: '/groups', label: 'Groups' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/analytics', label: 'Analytics' },
]

export const profileMenuLinks = [
  { to: '/profile', label: 'My Profile', icon: User },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/billing', label: 'Billing', icon: BadgeDollarSign },
  { to: '/contact', label: 'Support', icon: CircleHelp },
]

export const profileQuickLinks = [
  { to: '/profile', label: 'My Profile', icon: User },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/billing', label: 'Billing', icon: BadgeDollarSign },
  { to: '/support', label: 'Support', icon: MessageCircle },
]

export const footerLinks = [
  { to: '/features', label: 'Features' },
  // { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  // { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/support', label: 'Support' },
]

export const footerSocialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: Rocket },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Layers3 },
]
