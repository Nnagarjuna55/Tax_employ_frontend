import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    icon?: LucideIcon;
    rows?: number;
    maxLength?: number;
    showCount?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    required = false,
    icon: Icon,
    rows,
    maxLength,
    showCount = false,
}) => {
    const isTextarea = rows !== undefined;

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {Icon && <Icon size={14} className="inline mr-1" />}
                {label} {required && '*'}
            </label>
            <div className="relative">
                {Icon && !isTextarea && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                )}
                {isTextarea ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        maxLength={maxLength}
                        required={required}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                    />
                )}
            </div>
            {showCount && maxLength && (
                <p className="text-xs text-gray-500 mt-1">{value.length}/{maxLength}</p>
            )}
        </div>
    );
};

