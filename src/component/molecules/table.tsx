import React, { useState } from 'react';

interface Column<T> {
  Header: string;
  accessor?: keyof T;
  Cell?: (props: { row: T }) => React.ReactNode; 
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
}

const Table = <T extends Record<string, any>>({ columns, data, pageSize = 5 }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const sortedData = data; // You can add sorting logic here based on your needs

  const paginatedData = sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th key={column.Header} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.Header} className="px-4 py-2 text-sm text-gray-600">
                  {column.Cell ? column.Cell({ row }) : row[column.accessor!]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
