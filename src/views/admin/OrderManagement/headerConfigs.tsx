import { ORDER_STATUS } from '@/utils/constants'
import { Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const RenderStatus = (params: GridRenderCellParams) => {}

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
  }
]
