/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowHeightParams,
  GridRowHeightReturnValue,
  GridRowIdGetter,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { vietnameseLocaleText } from '@/utils/constants'

interface DataGridTableProps {
  rows: readonly any[]
  columns: readonly GridColDef<any>[]
  paginationModel?: GridPaginationModel
  pageSizeOptions?: number[]
  onPaginationModelChange?: (newModel: GridPaginationModel) => void
  onRowSelectionModelChange?:
    | ((rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => void)
    | undefined
  checkboxSelection?: boolean
  slotProps?: any
  localeText?: any
  getRowHeight?: ((params: GridRowHeightParams) => GridRowHeightReturnValue) | undefined
  sx?: any
  getRowId?: GridRowIdGetter<any> | undefined
}

const BoxIcon = () => (
  <span
    style={{
      width: 24,
      height: 24,
      border: '1px solid #0d47a1',
      borderRadius: 4,
      display: 'flex'
    }}
  />
)

const CheckBoxIcon = () => (
  <span
    style={{
      width: 24,
      height: 24,
      border: '1px solid #0d47a1',
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <svg style={{ width: 16, height: 16, fill: '#0d47a1' }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
    </svg>
  </span>
)

const DataGridTable = ({
  rows,
  columns: headerConfigs,
  paginationModel,
  pageSizeOptions,
  onPaginationModelChange,
  onRowSelectionModelChange,
  checkboxSelection,
  localeText,
  getRowHeight,
  slotProps,
  getRowId,
  sx
}: DataGridTableProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={headerConfigs}
      paginationModel={paginationModel}
      pageSizeOptions={pageSizeOptions}
      onPaginationModelChange={onPaginationModelChange}
      onRowSelectionModelChange={onRowSelectionModelChange}
      checkboxSelection={checkboxSelection || true}
      localeText={localeText || vietnameseLocaleText}
      getRowHeight={getRowHeight}
      getRowId={getRowId}
      slotProps={
        slotProps || {
          baseCheckbox: {
            icon: <BoxIcon />,
            checkedIcon: <CheckBoxIcon />
          }
        }
      }
      sx={{
        '& .MuiDataGrid-cell:focus': {
          outline: 'none'
        },
        '& .MuiDataGrid-footerContainer': {
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          margin: 0,
          alignSelf: 'center'
        },
        backgroundColor: 'white',
        minHeight: 550,
        maxHeight: 550,
        overflowY: 'auto',
        ...sx
      }}
    />
  )
}

export default DataGridTable
