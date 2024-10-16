// src/components/DataTable.tsx
import React, { useState } from 'react';
import Pagination from '../atom/pagination';

interface DataTableProps {
    data: any[]; // Ganti dengan tipe data yang sesuai
    columns: { header: string; accessor: string }[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // Ubah sesuai kebutuhan
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [filter, setFilter] = useState('');

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredData = data.filter(item =>
        columns.some(column =>
            item[column.accessor].toString().toLowerCase().includes(filter.toLowerCase())
        )
    );

    const sortedData = filteredData.sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const result = a[key] < b[key] ? -1 : 1;
        return direction === 'asc' ? result : -result;
    });

    const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded p-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor} className="border px-4 py-2 cursor-pointer" onClick={() => handleSort(column.accessor)}>
                                {column.header}
                                {sortConfig && sortConfig.key === column.accessor ? (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽') : null}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => (
                            <tr key={index} className="border-b">
                                {columns.map((column) => (
                                    <td key={column.accessor} className="border px-4 py-2">
                                        {item[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="border px-4 py-2 text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </div>
    );
};

export default DataTable;
