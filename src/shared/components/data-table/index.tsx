import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

// const columns: GridColDef[] = [
//   { field: 'product', headerName: 'Sản phẩm', width: 70 },
//   { field: 'price', headerName: 'Giá', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (_value, row) => `${row.firstName || ''} ${row.lastName || ''}`
//   }
// ]

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ]

const paginationModelDefault = { page: 0, pageSize: 5 }

export default function DataTable({
  headerConfigs,
  data,
  paginationModel,
  sx,
  handleRowSelectionModelChange
}: {
  headerConfigs: GridColDef[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  paginationModel?: { page: number; pageSize: number }
  sx?: Record<string, unknown>
  // eslint-disable-next-line no-unused-vars
  handleRowSelectionModelChange?: (selection: GridRowSelectionModel) => void
}) {
  return (
    <Paper sx={{ padding: '0 2rem' }}>
      <DataGrid
        rows={data}
        columns={headerConfigs}
        initialState={{
          pagination: {
            paginationModel: paginationModel || paginationModelDefault
          }
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowHeight={64}
        sx={{ border: 0, ...sx }}
        onRowSelectionModelChange={(selection) => {
          if (handleRowSelectionModelChange) {
            handleRowSelectionModelChange(selection)
          }
        }}
      />
    </Paper>
  )
}
