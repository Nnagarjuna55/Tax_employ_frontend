import React from 'react';

interface TaxIllustrationProps {
  className?: string;
}

const TaxIllustration: React.FC<TaxIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="200"
        height="80"
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto"
      >
        <defs>
          <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Main Document */}
        <g transform="translate(20, 10)">
          {/* Document shadow */}
          <rect x="2" y="2" width="50" height="60" rx="4" fill="#E5E7EB" opacity="0.3" />
          
          {/* Document */}
          <rect x="0" y="0" width="50" height="60" rx="4" fill="url(#docGradient)" />
          
          {/* Document fold corner */}
          <path d="M 0 0 L 15 0 L 15 15 L 0 15 Z" fill="#5B21B6" />
          <path d="M 0 0 L 15 0 L 0 15 Z" fill="#4C1D95" />
          
          {/* Document lines */}
          <line x1="8" y1="25" x2="42" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <line x1="8" y1="32" x2="38" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <line x1="8" y1="39" x2="40" y2="39" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <line x1="8" y1="46" x2="35" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          
          {/* Checkmark badge */}
          <circle cx="45" cy="5" r="8" fill="url(#checkGradient)" />
          <path
            d="M 42 5 L 44.5 7.5 L 48 3"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Calculator */}
        <g transform="translate(90, 15)">
          {/* Calculator body */}
          <rect x="0" y="0" width="45" height="50" rx="4" fill="#1F2937" />
          <rect x="3" y="3" width="39" height="12" rx="2" fill="#111827" />
          
          {/* Calculator screen */}
          <rect x="5" y="5" width="35" height="8" rx="1" fill="#10B981" />
          <text x="38" y="11" fill="white" fontSize="6" fontFamily="monospace" textAnchor="end">₹</text>
          
          {/* Calculator buttons */}
          <g>
            {/* Row 1 */}
            <rect x="5" y="18" width="8" height="6" rx="1" fill="#374151" />
            <rect x="15" y="18" width="8" height="6" rx="1" fill="#374151" />
            <rect x="25" y="18" width="8" height="6" rx="1" fill="#7C3AED" />
            <rect x="32" y="18" width="8" height="6" rx="1" fill="#7C3AED" />
            
            {/* Row 2 */}
            <rect x="5" y="26" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="15" y="26" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="25" y="26" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="32" y="26" width="8" height="6" rx="1" fill="#7C3AED" />
            
            {/* Row 3 */}
            <rect x="5" y="34" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="15" y="34" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="25" y="34" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="32" y="34" width="8" height="6" rx="1" fill="#7C3AED" />
            
            {/* Row 4 */}
            <rect x="5" y="42" width="18" height="6" rx="1" fill="#4B5563" />
            <rect x="25" y="42" width="8" height="6" rx="1" fill="#4B5563" />
            <rect x="32" y="42" width="8" height="6" rx="1" fill="#7C3AED" />
          </g>
        </g>

        {/* Chart/Graph */}
        <g transform="translate(150, 20)">
          {/* Chart background */}
          <rect x="0" y="0" width="40" height="40" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="2" />
          
          {/* Chart bars */}
          <rect x="5" y="30" width="6" height="8" fill="url(#docGradient)" />
          <rect x="13" y="25" width="6" height="13" fill="url(#docGradient)" />
          <rect x="21" y="20" width="6" height="18" fill="url(#docGradient)" />
          <rect x="29" y="15" width="6" height="23" fill="url(#checkGradient)" />
          
          {/* Chart line */}
          <path
            d="M 8 28 Q 16 25, 24 20 T 32 15"
            stroke="#7C3AED"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default TaxIllustration;
