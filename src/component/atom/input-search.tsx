// src/components/InputSearch.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import an icon from react-icons (you can use any other icon library)

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    error?: string;
    onSearch: (value: string) => void; // Function to handle search
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
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Search Icon */}
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`border rounded pl-10 pr-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onKeyDown={handleKeyDown}
                    {...props}
                />
            </div>
            {error && <span className="mt-1 text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default InputSearch;
