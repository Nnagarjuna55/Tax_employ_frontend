import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader: React.FC<{ size?: number, text?: string }> = ({ size = 24, text }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 text-gray-500">
            <Loader2 className="animate-spin" size={size} />
            {text && <span className="mt-2 text-sm">{text}</span>}
        </div>
    );
};
