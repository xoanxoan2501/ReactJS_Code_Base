import { Box, Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import iconEdit from '@/assets/icons/ProductManagement/iconEdit.png'
import { useDispatch } from 'react-redux'
import { openModal } from '@/apis/product-management-redux'
import { useNavigate } from 'react-router-dom'

interface ActionIcon {
  icon: string
  title: string
  backgroundColor: string
  handle?: () => void
}

const ActionIcon = ({ icon, title, backgroundColor, handle }: ActionIcon) => {
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
        key={params.row._id}
        icon={iconDelete}
        title={'Xoá voucher'}
        backgroundColor={'#FF070780'}
        handle={() => {
          dispatch(openModal({ id: params.row.id, name: params.row.productName }))
        }}
      />
      <ActionIcon
        key={params.row._id}
        icon={iconEdit}
        title={'Chỉnh sửa voucher'}
        backgroundColor={'#F9ED6980'}
        handle={() => navigate(`/admin/product-management/edit?id=${params.row.id}`)}
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
    field: 'voucherCode',
    headerName: 'Mã code voucher',
    flex: 1,
    sortable: false,
    align: 'left',
    headerAlign: 'center'
  },
  {
    field: 'discountType',
    headerName: 'Loại giảm giá',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'discountValue',
    headerName: 'Giá trị giảm',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: renderImage
  },
  {
    field: 'expirationDate',
    headerName: 'Ngày két thúc',
    align: 'center',
    headerAlign: 'center',
    renderCell: renderStatus
  },
  {
    field: 'usageCount',
    headerName: 'Đã sử dụng',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: renderImage
  },
  {
    field: 'minOrderValue',
    headerName: 'Đơn hàng tối thiếu',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'isActive',
    headerName: 'Tình trạng',
    flex: 1,
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
