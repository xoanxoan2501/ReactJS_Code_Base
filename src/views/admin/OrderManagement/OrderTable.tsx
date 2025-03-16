import { Order, ORDER_STATUS_VI } from '@/apis/order'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { headerConfigs } from './headerConfigs'
import { DEFAULT_LIMIT_PER_PAGE, ORDER_SIZES } from '@/utils/constants'
import { useCallback, useMemo, useState } from 'react'
import { formatNumber } from '@/utils/formatter'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import { useOrders } from '@/shared/hook/useOrders'

const formatOrderDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
}

const OrderTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_LIMIT_PER_PAGE,
    page: 0
  })

  const { data, isLoading } = useOrders({
    page: paginationModel.page + 1, // Chuyển thành one-based index
    limit: paginationModel.pageSize,
    isKeepPreviousData: true
  })
  console.log(data?.data[0].shippingMethod)
  const rows = useMemo(
    () =>
      data?.data?.map((item: Order) => ({
        id: item._id,
        orderId: item.orderId,
        fullName: item.fullName,
        orderDate: formatOrderDate(Number(item.orderDate) || 0),
        status: ORDER_STATUS_VI[item.status as keyof typeof ORDER_STATUS_VI],
        shippingMethod: item.shippingMethod,
        total: formatNumber(item.total)
      })) || [],
    [data]
  )

  const handleOnRowSelectionModelChange = useCallback(
    (selectedIds: GridRowSelectionModel) => {
      if (selectedIds.length === rows.length) {
        // console.log('Tất cả hàng đã được chọn:', selectedIds)
      } else {
        // console.log('Các hàng được chọn:', selectedIds)
      }
    },
    [rows.length]
  )

  if (isLoading) return <div></div>

  return (
    <>
      <DataGridTable
        rows={rows}
        columns={headerConfigs}
        rowCount={data?.total || rows.length} // Tổng số hàng thực tế
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        onRowSelectionModelChange={(selectedIds) => handleOnRowSelectionModelChange(selectedIds)}
        disableAutosize
        disableColumnResize
        checkBoxColor='#0d47a1'
        checkBoxBorderWidth='1px'
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f5f5f5'
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#d3d6d8 !important',
            borderBottom: '1px solid #ccc'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold'
          },
          '& .MuiDataGrid-cell': {
            borderRight: '1px solid #ccc'
          }
        }}
      />
    </>
  )
}

export default OrderTable

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
