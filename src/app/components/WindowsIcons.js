'use client'

import Image from 'next/image'

// Icon mapping to Windows XP icon files
const iconMap = {
  user: 'User Accounts.png',
  document: 'Generic Document.png',
  folder: 'Folder Closed.png',
  briefcase: 'Briefcase.png',
  globe: 'Internet Explorer 6.png',
  rocket: 'System Properties.png',
  mail: 'OE Create Mail.png',
  link: 'Shortcut.png',
  github: 'Internet Explorer 6.png',
  palette: 'Paint.png',
  notepad: 'Notepad.png',
  calculator: 'Calculator.png',
  computer: 'My Computer.png',
  chat: 'MSN Messenger.png',
}

// Icon wrapper component with Windows XP styling
export const WindowsIcon = ({ type, size = 32, className = '' }) => {
  const iconFile = iconMap[type] || 'Document.png'
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={`/xp-icons/${iconFile}`}
        alt={type}
        width={size}
        height={size}
        unoptimized
        onError={(e) => {
          // Fallback if icon doesn't exist
          e.target.style.display = 'none'
        }}
      />
    </div>
  )
}
