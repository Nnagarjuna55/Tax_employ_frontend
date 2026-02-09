import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'violet';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    fullWidth = false,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const variantStyles = {
        primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
        secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
        danger: 'bg-accent-600 text-white hover:bg-accent-700 hover:shadow-lg',
        violet: 'bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 hover:shadow-violet-500/30',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${className}`}
        >
            {icon && iconPosition === 'left' && icon}
            <span>{children}</span>
            {icon && iconPosition === 'right' && icon}
        </button>
    );
};
