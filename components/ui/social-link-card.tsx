import { ReactNode } from 'react'

interface SocialLinkCardProps {
  href: string
  icon: ReactNode
  label: string
}

export const SocialLinkCard = ({ href, icon, label }: SocialLinkCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-3 sm:p-4 border border-border/50 hover:border-primary transition-all"
      aria-label={label}
    >
      <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      {icon}
    </a>
  )
}
