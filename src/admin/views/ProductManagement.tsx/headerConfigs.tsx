import { Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const ActionIcon = ({
  icon,
  title,
  actionKey
}: {
  icon: string
  title: string
  actionKey: string
}) => {
  return (
    <img
      src={icon}
      alt={title}
      style={{ width: 24, height: 24, cursor: 'pointer' }}
      onClick={(event) => {
        event.stopPropagation()
      }}
    />
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
        (action: { title: string; icon: string; key: string }) => (
          <ActionIcon
            key={action.key}
            icon={action.icon}
            title={action.title}
            actionKey={action.title}
          />
        )
      )}
    </Stack>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'productName',
    headerName: 'Tên sản phẩm',
    flex: 2,
    sortable: false,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'image',
    headerName: 'Hình ảnh',
    flex: 1.5,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'price',
    headerName: 'Giá tiền',
    flex: 1.5,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'category',
    headerName: 'Danh mục',
    flex: 1.5,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: renderAction
  }
]
