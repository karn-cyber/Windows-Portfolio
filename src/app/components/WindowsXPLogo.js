'use client'

export default function WindowsXPLogo({ className = "w-16 h-16" }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#FF6B35', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#D2001F', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#9AE24E', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#7CB342', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#4A90E2', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#2E5BBA', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#FFD23F', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#FF8F00', stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      {/* Red section (top-left) */}
      <path d="M 10 10 L 45 10 L 40 45 L 10 50 Z" fill="url(#redGradient)" />
      
      {/* Green section (top-right) */}
      <path d="M 55 10 L 90 10 L 90 50 L 60 45 Z" fill="url(#greenGradient)" />
      
      {/* Blue section (bottom-left) */}
      <path d="M 10 60 L 40 55 L 45 90 L 10 90 Z" fill="url(#blueGradient)" />
      
      {/* Yellow section (bottom-right) */}
      <path d="M 60 55 L 90 60 L 90 90 L 55 90 Z" fill="url(#yellowGradient)" />
    </svg>
  )
}
