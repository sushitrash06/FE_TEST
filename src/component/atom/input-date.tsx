// src/components/InputDate.tsx
import React from 'react';

interface InputDateProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const InputDate: React.FC<InputDateProps> = ({ label, error, className, ...props }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-1 text-sm font-medium">{label}</label>}
            <input
                type="date"
                className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                {...props}
            />
            {error && <span className="mt-1 text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default InputDate;
