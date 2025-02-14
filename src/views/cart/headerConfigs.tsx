import { Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

export const renderProductImage = (params: GridRenderCellParams) => {
  return (
    <Stack
      sx={{ height: '100%' }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <img
        src={params.value?.thumbnail as string}
        alt="product"
        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 5 }}
      />
      <Typography variant="subtitle1">{params.value?.title}</Typography>
    </Stack>
  )
}

export const renderAction = (params: GridRenderCellParams) => {
  return (
    <Stack
      sx={{ height: '100%' }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      {params.value?.map(
        (action: { title: string; icon: string }, index: number) => (
          <img
            key={index}
            src={action.icon}
            alt={action.title}
            style={{ width: 24, height: 24, cursor: 'pointer' }}
            onClick={(event) => {
              event.stopPropagation()
            }}
          />
        )
      )}
    </Stack>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'product',
    headerName: 'Sản phẩm',
    flex: 1.5,
    sortable: false,
    renderCell: renderProductImage,
    align: 'left', // Align content to the left
    headerAlign: 'left' // Align header to the left,
  },
  {
    field: 'price',
    headerName: 'Giá (VNĐ)',
    type: 'number',
    flex: 1,
    align: 'left', // Align content to the left
    headerAlign: 'left' // Align header to the left
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    type: 'number',
    flex: 1,
    align: 'left', // Align content to the left
    headerAlign: 'left' // Align header to the left
  },
  {
    field: 'total',
    headerName: 'Tổng tiền (VNĐ)',
    type: 'number',
    flex: 1,
    valueGetter: (_value, row) => row.price * row.quantity,
    align: 'left', // Align content to the left
    headerAlign: 'left' // Align header to the left
  },
  {
    field: 'action',
    headerName: 'Hành động',
    sortable: false,
    flex: 1,
    align: 'left', // Align content to the left
    headerAlign: 'left',
    renderCell: renderAction
  }
]

export const sxConfig = {
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#F2C2CF80',
    color: 'black',
    fontWeight: 'bold'
  }
}
