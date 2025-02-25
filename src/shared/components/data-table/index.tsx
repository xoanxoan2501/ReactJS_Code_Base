import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

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
    <Paper>
      <DataGrid
        rows={data}
        columns={headerConfigs}
        initialState={{
          pagination: {
            paginationModel: paginationModel
          }
        }}
        getRowId={(row) => row._id}
        checkboxSelection
        rowHeight={70}
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
