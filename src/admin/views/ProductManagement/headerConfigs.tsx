import { Box, Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import iconEdit from '@/assets/icons/ProductManagement/iconEdit.png'
import { useDispatch } from 'react-redux'
import { openModal } from '@/apis/productManagement'
import { useNavigate } from 'react-router-dom'

const ActionIcon = ({
  icon,
  title,
  actionKey,
  backgroundColor,
  handle
}: {
  icon: string
  title: string
  actionKey: string
  backgroundColor: string
  handle?: () => void
}) => {
  return (
    <img
      src={icon}
      alt={title}
      style={{
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        borderRadius: '40px',
        backgroundColor: backgroundColor,
        padding: '3px'
      }}
      onClick={(event) => {
        event.stopPropagation()
        if (handle) {
          handle()
        }
      }}
    />
  )
}

export const RenderAction = (params: GridRenderCellParams) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center'>
      <ActionIcon
        key={1}
        icon={iconDelete}
        title={'Xoá sản phẩm'}
        actionKey={'Xoá sản phẩm'}
        backgroundColor={'#FF070780'}
        handle={() => {
          dispatch(openModal(params.row.productName))
        }}
      />
      <ActionIcon
        key={2}
        icon={iconEdit}
        title={'Chỉnh sửa sản phẩm'}
        actionKey={'Chỉnh sửa sản phẩm'}
        backgroundColor={'#F9ED6980'}
        handle={() => navigate(`/admin/product-management/edit/${params.row.id}`)}
      />
    </Stack>
  )
}

const renderImage = (params: GridRenderCellParams) => {
  return (
    <Box
      component='img'
      src={params.value}
      alt='Thumbnail'
      sx={{
        width: '70px',
        height: '70px',
        borderRadius: '20px',
        objectFit: 'cover'
      }}
    />
  )
}

const renderStatus = (params: GridRenderCellParams) => {
  return (
    <Typography
      sx={{
        backgroundColor: params.value === 'available' ? '#1AFB9A' : '#FF0707',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        display: 'inline-block'
      }}
    >
      {params.value === 'available' ? 'Còn hàng' : 'Hết hàng'}
    </Typography>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'productName',
    headerName: 'Tên sản phẩm',
    flex: 2,
    sortable: false,
    align: 'left',
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
    headerAlign: 'center',
    renderCell: renderImage
  },
  {
    field: 'status',
    headerName: 'Tình trạng',
    align: 'center',
    headerAlign: 'center',
    renderCell: renderStatus
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
    renderCell: RenderAction
  }
]
