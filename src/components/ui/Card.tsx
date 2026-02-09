import React from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'default' | 'elevated' | 'outline';
}

export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    className = '',
    onClick,
    variant = 'default'
}) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';

    const variantStyles = {
        default: 'bg-white shadow-light border border-gray-100 hover:shadow-xl hover:border-violet-100',
        elevated: 'bg-white shadow-medium border border-gray-100 hover:shadow-xl hover:border-violet-100',
        outline: 'bg-transparent border-2 border-gray-200 hover:border-violet-400',
    };

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} p-6 group ${className}`}
            onClick={onClick}
        >
            {title && (
                <div className="mb-5">
                    <h3 className="text-xl font-bold text-gray-950 line-clamp-2 leading-tight group-hover:text-violet-600 transition-colors">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-2 font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            <div className="text-gray-600 leading-relaxed">
                {children}
            </div>
        </div>
    );
};
