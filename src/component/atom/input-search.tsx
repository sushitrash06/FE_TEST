// src/components/InputSearch.tsx
import React from 'react';

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    error?: string;
    onSearch: (value: string) => void; // Fungsi untuk menangani pencarian
}

const InputSearch: React.FC<InputSearchProps> = ({
    label,
    placeholder,
    error,
    className,
    onSearch,
    ...props
}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch((event.target as HTMLInputElement).value);
        }
    };

    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-1 text-sm font-medium">{label}</label>}
            <input
                type="text"
                placeholder={placeholder}
                className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                onKeyDown={handleKeyDown}
                {...props}
            />
            {error && <span className="mt-1 text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default InputSearch;
