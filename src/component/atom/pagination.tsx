// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <button 
                onClick={handlePrev} 
                disabled={currentPage === 1} 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
            >
                Previous
            </button>
            <div className="flex items-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index} 
                        onClick={() => handlePageClick(index + 1)} 
                        className={`mx-1 px-3 py-1 text-sm font-medium rounded ${
                            currentPage === index + 1 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages} 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
