import React, { useState, Fragment } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton, styled } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import { useGerbangs, useDeleteGerbang } from "../../services"; // Ensure you import your custom hooks
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify"; // Import toast
import GerbangForm from "./gerbang-form";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#FFF',
  },
  '& .MuiDataGrid-cell': {
    backgroundColor: '#FFF',
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#FFF',
  },
}));

interface SearchI {
  keyword: string;
}

const TableMasterGate: React.FC<SearchI> = ({ keyword }) => {
  const { data, isLoading, isError } = useGerbangs();
  const { mutate: deleteGerbang } = useDeleteGerbang(); // Use the delete hook

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false); // State for form modal
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null); // State to store form data

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "IdCabang", headerName: "Cabang ID", width: 150 },
    { field: "NamaGerbang", headerName: "Nama Gerbang", width: 500 },
    { field: "NamaCabang", headerName: "Nama Cabang", width: 450 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleView(params.row)} color="info">
            <MdOutlineRemoveRedEye />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} color="secondary">
            <MdDelete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (row: any) => {
    setFormData(row); // Set form data with selected row
    setFormModalOpen(true); // Open the form modal
  };

  const handleView = (row: any) => {
    setSelectedRow(row);
    setDetailModalOpen(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      deleteGerbang({ id: selectedRow.id, IdCabang: selectedRow.IdCabang }, {
        onSuccess: () => {
          toast.success("Item deleted successfully!"); // Show success toast
          setDeleteModalOpen(false);
          // Optionally, you might want to refetch or update your data here
        },
        onError: () => {
          toast.error("Error deleting item."); // Show error toast if needed
        },
      });
    }
  };

  if (isLoading) return <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>;
  if (isError) return <div>Error fetching data</div>;

  const filteredRows = data?.data?.rows?.rows.filter((row: any) => {
    return (
      row.NamaGerbang.toLowerCase().includes(keyword.toLowerCase()) || 
      row.NamaCabang.toLowerCase().includes(keyword.toLowerCase())
    );
  }) || [];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <StyledDataGrid
        rows={filteredRows} 
        columns={columns}
        pagination
        autoPageSize
        getRowId={(row) => row.IdCabang}
      />

      {/* Gerbang Form Modal */}
      {isFormModalOpen && (
        <GerbangForm
          show={isFormModalOpen}
          setIsOpen={setFormModalOpen}
          initialValues={formData} // Pass form data as initial values
        />
      )}

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setDeleteModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 mx-auto bg-white rounded shadow-lg">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>Are you sure you want to delete this item?</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button 
                      className="mr-2 text-gray-500"
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Detail Modal */}
      <Transition appear show={isDetailModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setDetailModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 mx-auto bg-white rounded shadow-lg">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Detail
                  </Dialog.Title>
                  <div className="mt-2">
                    {selectedRow && (
                      <div>
                        <p><strong>ID:</strong> {selectedRow.id}</p>
                        <p><strong>Cabang ID:</strong> {selectedRow.IdCabang}</p>
                        <p><strong>Nama Gerbang:</strong> {selectedRow.NamaGerbang}</p>
                        <p><strong>Nama Cabang:</strong> {selectedRow.NamaCabang}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button 
                      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                      onClick={() => setDetailModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TableMasterGate;
