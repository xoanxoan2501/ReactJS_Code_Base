import { Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import iconDecreaseCart from '@/assets/icons/iconDecreaseCart.png'
import iconIncreaseCart from '@/assets/icons/iconIncreaseCart.png'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { updateProductQuantity } from '@/apis/cart'

export const RenderProductImage = (params: GridRenderCellParams) => {
  const navigate = useNavigate()

  return (
    <Stack
      onClick={(event) => {
        event.stopPropagation()
        navigate(`/product/${params?.row?._id}`)
      }}
      sx={{
        height: '100%',
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      direction='row'
      spacing={2}
      alignItems='center'
    >
      <img
        src={params.value?.thumbnail as string}
        alt='product'
        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 5 }}
      />
      <Typography variant='subtitle1'>{params.value?.title}</Typography>
    </Stack>
  )
}

const ActionIcon = ({ icon, title, actionKey }: { icon: string; title: string; actionKey: string }) => {
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
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center' justifyContent={'center'}>
      {params.value?.map((action: { title: string; icon: string; key: string }) => (
        <ActionIcon key={action.key} icon={action.icon} title={action.title} actionKey={action.title} />
      ))}
    </Stack>
  )
}

export const RenderQuantity = (params: GridRenderCellParams) => {
  console.log('🚀 ~ RenderQuantity ~ params:', params)
  const dispatch = useAppDispatch()

  return (
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center' justifyContent={'center'}>
      <img
        src={iconDecreaseCart}
        alt={'decrease'}
        style={{ width: 16, height: 16, cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation()
          // dispatch(updateProductQuantity({}))
        }}
      />
      <Typography variant='subtitle1'>{params.value}</Typography>
      <img
        src={iconIncreaseCart}
        alt={'increase'}
        style={{ width: 16, height: 16, cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation()
        }}
      />
    </Stack>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'product',
    headerName: 'Sản phẩm',
    flex: 2,
    sortable: false,
    renderCell: RenderProductImage,
    align: 'left',
    headerAlign: 'left'
  },
  {
    field: 'size',
    headerName: 'Kích cỡ',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'price',
    headerName: 'Giá (VNĐ)',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: RenderQuantity
  },
  {
    field: 'total',
    headerName: 'Tổng tiền (VNĐ)',
    type: 'number',
    flex: 1,
    valueGetter: (_value, row) => row.price * row.quantity,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    sortable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
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
