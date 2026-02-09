import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo SVG - Tax document with checkmark */}
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />

        {/* Document shape */}
        <path
          d="M20 18 L20 46 L44 46 L44 28 L36 28 L36 18 Z"
          fill="white"
          fillOpacity="0.95"
        />
        <path
          d="M36 18 L36 28 L44 28"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Horizontal lines (document text) */}
        <line x1="24" y1="24" x2="40" y2="24" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="30" x2="36" y2="30" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="36" x2="38" y2="36" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />

        {/* Checkmark */}
        <circle cx="48" cy="16" r="8" fill="url(#checkGradient)" />
        <path
          d="M45 16 L47.5 18.5 L51 14"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text */}
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent ${textSizes[size]}`}>

        </span>
      )}
    </div>
  );
};

export default Logo;
