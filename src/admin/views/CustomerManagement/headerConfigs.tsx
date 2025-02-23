import { Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

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

export const headerConfigs: GridColDef[] = [
  {
    field: 'customerId',
    headerName: 'Mã KH',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'fullname',
    headerName: 'Họ và tên',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
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
    }
  },
  {
    field: 'orders',
    headerName: 'Tổng số đơn hàng',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    type: 'number'
  },
  {
    field: 'orders',
    headerName: 'Tổng tiền',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    type: 'number'
  },
  {
    field: 'customerType',
    headerName: 'Loại KH',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: renderCustomerType
  }
]
