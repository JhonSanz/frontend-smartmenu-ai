import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PAGE_SIZE } from '@/utils/constant';


function Table({
  columns,
  rows,
  rowOptions,
  paginationModel,
  setPaginationModel,
  count,
  loading = false,
  options = ["edit", "delete"],
  pageSize = PAGE_SIZE
}) {
  const finalColumns = [
    ...columns,
    rowOptions !== null ? {
      field: 'monthlyDownloadsBar',
      headerName: 'Options',
      renderCell: (params) => (
        <Box display="flex">
          {
            options.includes("edit") && <EditIcon
              style={{
                cursor: params.row.disabled ? "" : "pointer",
                color: params.row.disabled ? "gray" : "#000"
              }}
              onClick={() => {
                if (!params.row.disabled) rowOptions("edit", params.row)
              }}
              disabled={true}
            />
          }
          {
            options.includes("delete") && <DeleteIcon
              style={{
                cursor: params.row.disabled ? "" : "pointer",
                color: params.row.disabled ? "gray" : "#000"
              }}
              onClick={() => {
                if (!params.row.disabled) rowOptions("delete", params.row)
              }}
            />
          }
        </Box>
      ),
      width: 80,
    } : {}
  ]

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  return (
    <Box height="65vh" width="100%">
      <DataGrid
        rows={rows || []}
        columns={finalColumns}
        checkboxSelection={false}
        disableRowSelectionOnClick

        loading={loading}
        pageSizeOptions={[pageSize]}
        rowCount={count ?? 10}
        paginationMode="server"
        onPaginationModelChange={handlePaginationModelChange}
        paginationModel={paginationModel}
        disableColumnMenu={true}
      />
    </Box>
  )
}

export default Table;
