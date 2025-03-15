import { Delete } from '@mui/icons-material'
import { Box, Stack, Typography, Grid, Button } from '@mui/material'
import { color } from '../ProductManagement/FormProduct'
import { GridColDef } from '@mui/x-data-grid'
import OrderManagementLayout from './layout'
import { useParams, useSearchParams } from 'react-router-dom'
import { useOrders } from '@/shared/hook/useOrders'
import { Skeleton } from 'antd'
import { formatOrderDate } from './OrderTable'
import { Order, ORDER_STATUS_VI, OrderDetail, OrderStatus } from '@/apis/order'
import { ORDER_SIZES } from '@/utils/constants'
import { useCallback, useMemo, useState } from 'react'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import iconClock from '@/assets/icons/OrderManagement/Clock.svg'
import iconBowPrepare from '@/assets/icons/OrderManagement/BowPrepare.svg'
import iconTruck from '@/assets/icons/OrderManagement/Truck.svg'
import iconComplete from '@/assets/icons/OrderManagement/Complete.svg'
import iconRefund from '@/assets/icons/OrderManagement/Refund.svg'
import ModalCustom from './ModalCustom'
import { set } from 'lodash'

export interface Modal {
  isModalOpening: boolean
  content: Content
}

interface Content {
  orderId: string
  nextStatusCode: OrderStatus
  nextStatusText: string
}

const FormOrder = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const limit = parseInt(searchParams.get('limit') || '')
  const page = parseInt(searchParams.get('page') || '')
  const [modal, setModal] = useState<Modal>({
    isModalOpening: false,
    content: { orderId: '', nextStatusCode: OrderStatus.PENDING, nextStatusText: '' }
  })

  const { data: orderData, isLoading } = useOrders({
    page: page,
    limit: limit,
    isKeepPreviousData: true
  })

  const order = useMemo(() => orderData?.data?.find((item) => item.orderId === id), [orderData, id])
  const totalProduct = useMemo(() => {
    return order?.orderDetails.reduce((sum, item) => sum + item.total, 0)
  }, [order])
  const rows = useMemo(
    () =>
      order?.orderDetails?.map((item: OrderDetail) => ({
        id: item.productId + item.size,
        name: item.title,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        note: item.note
      })) || [],
    [order?.orderDetails]
  )

  const orderStatusConfig = useMemo(() => orderStatusConfigs.find((item) => item.value === order?.status), [order])

  const handleNextStatus = useCallback(
    (item: NextStatusConfig) => {
      setModal({
        isModalOpening: true,
        content: {
          orderId: order?._id || '',
          nextStatusCode: item.value,
          nextStatusText: item.label
        }
      })
    },
    [order?._id]
  )

  if (isLoading) return <Skeleton active />
  if (!order)
    return <Typography variant='h6'>Đường link không đúng, hãy truy cập đơn hàng từ danh sách đơn hàng</Typography>

  return (
    <OrderManagementLayout>
      <Box p={2} bgcolor='#e5f5ff' borderRadius={2}>
        {/* Title */}
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          alignContent={'center'}
          sx={{
            borderBottom: `2px solid ${color.deepBlue}`
          }}
        >
          <Typography variant='h6' mb={2}>
            Mã đơn hàng: {id} - {ORDER_STATUS_VI[order.status ?? OrderStatus.PENDING]}
          </Typography>
          <Stack direction='row' spacing={2}>
            {orderStatusConfig?.nextStatus?.map((item) => (
              <Button
                key={item.value}
                variant='contained'
                sx={{ backgroundColor: item.backgroundColor, borderRadius: 7 }}
                startIcon={
                  typeof item.icon === 'string' ? (
                    <img src={item.icon} alt='icon' style={{ width: '20px' }} />
                  ) : (
                    item.icon
                  )
                }
                onClick={() => handleNextStatus(item)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>
      <Stack direction='row' justifyContent='space-between' alignItems='flex-start' mt={2}>
        <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, paddingY: 1, paddingX: 2, width: '49%' }}>
          <Typography
            variant='h6'
            sx={{
              borderBottom: `2px solid ${color.deepBlue}`
            }}
          >
            Thông tin giao hàng
          </Typography>
          <Stack spacing={2} mt={2}>
            <Typography variant='body1'>Họ và tên: {order.fullName}</Typography>
            <Typography variant='body1'>Số điện thoại: {order.phoneNumber}</Typography>
            <Typography variant='body1'>Ngày đặt: {formatOrderDate(Number(order.orderDate) || 0)}</Typography>
            <Typography variant='body1'>Địa chỉ: {order.address}</Typography>
            <Typography variant='body1'>Hình thức giao hàng: {order.shippingMethod}</Typography>
            <Typography variant='body1'>Hình thức thanh toán: {order.paymentMethod}</Typography>
            <Typography variant='body1'>Ngày giao hàng: {order.shippingDate}</Typography>
            <Typography variant='body1'>Voucher: {order.voucher}</Typography>
            <Typography variant='body1'>Phí giao hàng: {order.shippingFee}</Typography>
            <Typography variant='body1'>Tổng tiền sản phẩm: {totalProduct}</Typography>
            <Typography variant='body1'>Tổng tiền: {order.total}</Typography>
            <Typography variant='body1'>Mã vận đơn: {order.trackingNumber}</Typography>
            <Typography variant='body1'>Trạng thái: {ORDER_STATUS_VI[order.status ?? OrderStatus.PENDING]}</Typography>
          </Stack>
        </Box>
        <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, paddingY: 1, paddingX: 2, width: '49%' }}>
          <Typography
            variant='h6'
            sx={{
              borderBottom: `2px solid ${color.deepBlue}`
            }}
          >
            Thông tin sản phẩm
          </Typography>
          <Stack spacing={2} mt={2}>
            <DataGridTable
              rows={rows}
              columns={headerOrderDetailConfigs}
              rowCount={rows.length}
              checkboxSelection={false}
              disableAutosize
              disableColumnResize
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
          </Stack>
        </Box>
      </Stack>
      <Stack mt={2}>
        <Typography variant='h6'>Ghi chú cho đơn hàng</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'start',
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            minHeight: '100px',
            paddingX: 1.5,
            paddingY: 0.5
          }}
        >
          {order.address}
        </Box>
      </Stack>
      <ModalCustom modal={modal} setModal={setModal} />
    </OrderManagementLayout>
  )
}

export default FormOrder

export const headerOrderDetailConfigs: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'size',
    headerName: 'Size',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'price',
    headerName: 'Giá tiền',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'note',
    headerName: 'Ghi chú',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  }
]

interface OrderStatusConfig {
  value: OrderStatus
  label: string
  icon?: string | JSX.Element
  backgroundColor?: string
  nextStatus?: NextStatusConfig[]
}

interface NextStatusConfig {
  value: OrderStatus
  label: string
  icon?: string | JSX.Element
  backgroundColor?: string
}

const orderStatusConfigs: OrderStatusConfig[] = [
  {
    value: OrderStatus.PENDING,
    label: ORDER_STATUS_VI[OrderStatus.PENDING],
    nextStatus: [
      {
        value: OrderStatus.PREPARE,
        label: ORDER_STATUS_VI[OrderStatus.PREPARE],
        icon: iconBowPrepare,
        backgroundColor: '#7CCCF8'
      },
      {
        value: OrderStatus.CANCEL,
        label: ORDER_STATUS_VI[OrderStatus.CANCEL],
        icon: <Delete />,
        backgroundColor: '#FF6F91'
      }
    ]
  },
  {
    value: OrderStatus.PREPARE,
    label: ORDER_STATUS_VI[OrderStatus.PREPARE],
    nextStatus: [
      {
        value: OrderStatus.SHIPPING,
        label: ORDER_STATUS_VI[OrderStatus.SHIPPING],
        icon: iconTruck,
        backgroundColor: '#FF6F91'
      },
      {
        value: OrderStatus.CANCEL,
        label: ORDER_STATUS_VI[OrderStatus.CANCEL],
        icon: <Delete />,
        backgroundColor: '#FF6F91'
      }
    ]
  },
  {
    value: OrderStatus.SHIPPING,
    label: ORDER_STATUS_VI[OrderStatus.SHIPPING],
    nextStatus: [
      {
        value: OrderStatus.COMPLETED,
        label: ORDER_STATUS_VI[OrderStatus.COMPLETED],
        icon: iconComplete,
        backgroundColor: '#1AFB9A'
      },
      {
        value: OrderStatus.CANCEL,
        label: ORDER_STATUS_VI[OrderStatus.CANCEL],
        icon: <Delete />,
        backgroundColor: '#FF6F91'
      }
    ]
  },
  { value: OrderStatus.COMPLETED, label: ORDER_STATUS_VI[OrderStatus.COMPLETED] },
  { value: OrderStatus.REFUND, label: ORDER_STATUS_VI[OrderStatus.REFUND] },
  {
    value: OrderStatus.CANCEL,
    label: ORDER_STATUS_VI[OrderStatus.CANCEL],
    icon: <Delete />,
    backgroundColor: '#FF6F91'
  }
]
