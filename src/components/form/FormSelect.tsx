import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    icon?: LucideIcon;
    required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    icon: Icon,
    required = false,
}) => {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {Icon && <Icon size={14} className="inline mr-1" />}
                {label} {required && '*'}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

