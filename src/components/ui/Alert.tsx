import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AlertProps {
    type?: 'info' | 'success' | 'warning' | 'error' | 'violet';
    title?: string;
    message: string;
    onClose?: () => void;
    closeable?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
    type = 'info',
    title,
    message,
    onClose,
    closeable = true,
}) => {
    const typeStyles = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: 'text-blue-600',
        },
        success: {
            bg: 'bg-success-50',
            border: 'border-success-200',
            text: 'text-success-800',
            icon: 'text-success-600',
        },
        warning: {
            bg: 'bg-warning-50',
            border: 'border-warning-200',
            text: 'text-warning-800',
            icon: 'text-warning-600',
        },
        error: {
            bg: 'bg-accent-50',
            border: 'border-accent-200',
            text: 'text-accent-800',
            icon: 'text-accent-600',
        },
        violet: {
            bg: 'bg-violet-50',
            border: 'border-violet-200',
            text: 'text-violet-800',
            icon: 'text-violet-600',
        },
    };

    const style = typeStyles[type];

    const icons = {
        info: <Info size={20} />,
        success: <CheckCircle size={20} />,
        warning: <AlertCircle size={20} />,
        error: <XCircle size={20} />,
        violet: <Info size={20} />,
    };

    return (
        <div className={`${style.bg} ${style.border} border rounded-lg p-4 flex gap-4 items-start`}>
            <div className={`${style.icon} flex-shrink-0 mt-0.5`}>
                {icons[type]}
            </div>
            <div className="flex-1">
                {title && <h4 className={`${style.text} font-semibold mb-1`}>{title}</h4>}
                <p className={`${style.text} text-sm`}>{message}</p>
            </div>
            {closeable && (
                <button
                    onClick={onClose}
                    className={`${style.text} flex-shrink-0 hover:opacity-70 transition-opacity`}
                    aria-label="Close"
                >
                    ✕
                </button>
            )}
        </div>
    );
};
