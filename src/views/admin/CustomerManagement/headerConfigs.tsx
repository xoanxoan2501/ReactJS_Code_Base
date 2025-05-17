import { Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import iconEdit from '@/assets/icons/ProductManagement/iconEdit.png'
import { openModal } from '@/apis/product-management-redux'
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

export const RenderAction = (params: GridRenderCellParams) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center'>
      <ActionIcon
        key={`${params.row.id}-delete`}
        // key={params.row.id}
        icon={iconDelete}
        title={'Xoá khách hàng'}
        backgroundColor={'#FF070780'}
        handle={() => {
          dispatch(openModal({ id: params.row.id, name: params.row.productName }));
        }}
      />
      <ActionIcon
        key={`${params.row.id}-edit`}
        // key={params.row.id}
        icon={iconEdit}
        title={'Chỉnh sửa sản phẩm'}
        backgroundColor={'#F9ED6980'}
        handle={() => navigate(`/admin/custom-management/edit?id=${params.row.id}`)}
      />
    </Stack>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'customerId',
    headerName: 'Mã KH',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'fullname',
    headerName: 'Họ và tên',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'createdAt',
    headerName: 'Ngày đăng ký',
    flex: 1.5,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value) => {
      if (!value) return '' // Xử lý nếu giá trị null hoặc undefined
      return new Date(value).toLocaleDateString('vi-VN') // Định dạng ngày theo tiếng Việt
    },
    editable: false,
    resizable: false
  },
  {
    field: 'ordersNumber',
    headerName: 'Tổng số đơn hàng',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    type: 'number',
    editable: false,
    resizable: false
  },
  {
    field: 'ordersTotal',
    headerName: 'Tổng tiền',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    type: 'number',
    editable: false,
    resizable: false
  },
  {
    field: 'customerType',
    headerName: 'Loại KH',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: renderCustomerType,
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
