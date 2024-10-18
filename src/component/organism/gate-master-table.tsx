import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton, styled } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import { useGerbangs } from "../../services";

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
    keyword: string
}

const TableMasterGate: React.FC<SearchI> = ({keyword}) => {
  const { data, isLoading, isError } = useGerbangs();

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
          <IconButton onClick={() => handleEdit(params.row.IdCabang)} color="primary">
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => handleView(params.row.IdCabang)} color="info">
            <MdOutlineRemoveRedEye />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.IdCabang)}
            color="secondary"
          >
            <MdDelete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    console.log("Edit item with id:", id);
  };

  const handleView = (id: number) => {
    console.log("View item with id:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete item with id:", id);
  };

  if (isLoading) return <div>Loading...</div>;
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
    </div>
  );
};

export default TableMasterGate;
