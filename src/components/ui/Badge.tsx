import React from 'react';

type Variant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'violet';

interface BadgeProps {
    label: string;
    variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
    primary: 'bg-primary-100 text-primary-700 border border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    accent: 'bg-accent-100 text-accent-700 border border-accent-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
    violet: 'bg-violet-100 text-violet-700 border border-violet-200',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary' }) => {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${VARIANTS[variant]}`}>
            {label}
        </span>
    );
};
