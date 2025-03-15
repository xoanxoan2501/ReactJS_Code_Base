import { openModal } from '@/apis/product-management-redux'
import { Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import iconEdit from '@/assets/icons/ProductManagement/iconEdit.png'
import type { ActionIcon } from '../ProductManagement/headerConfigs'

const renderCustomerType = (params: GridRenderCellParams) => {
  return (
    <Typography
      sx={{
        backgroundColor: params.value === 'available' ? '#1AFB9A' : '#1AFB9A',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        display: 'inline-block'
      }}
    >
      {params.value === 'available' ? 'VIP' : 'VIP'}
    </Typography>
  )
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
        icon={iconEdit}
        title={'Chỉnh sửa sản phẩm'}
        backgroundColor={'#F9ED6980'}
        handle={() =>
          navigate(
            `/admin/order-management/edit?id=${params.row.orderId}&limit=${params.row.limit}&page=${params.row.page}`
          )
        }
      />
    </Stack>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'Mã đơn hàng',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'fullName',
    headerName: 'Tên KH',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'orderDate',
    headerName: 'Ngày đặt hàng',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'shippingMethod',
    headerName: 'Hình thức giao hàng',
    flex: 1.5,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'total',
    headerName: 'Tổng tiền',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    type: 'number',
    editable: false,
    resizable: false
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
