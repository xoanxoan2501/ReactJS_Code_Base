import { deleteCartItem, removeMultipleCartItems, resetSelecdCartItem, setCart } from '@/apis/cart'
import { updateOrder } from '@/apis/order'
import { useAddOrder } from '@/apis/order/api'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import { routerOrderPageOk } from '../OrderPageOK/router'

function CompleteTheOrder() {
  const navigate = useNavigate()
  const orderInfo = useAppSelector((state) => state.order.orderInfo)
  const shippingMethodMap: Record<string, string> = {
    'Giao hàng nhanh': 'Giao hàng tận nơi',
    ship1: 'Đến cửa hàng (551 Sư Vạn Hạnh) quận 10 lấy bánh',
    ship2: 'Đến cửa hàng (31 Dân Chủ) TP Thủ Đức lấy bánh',
    ship3: 'Đến cửa hàng (4 Điện Biên Phủ) quận Bình Thạnh lấy bánh'
  }
  const dispatch = useAppDispatch()

  const { mutate: createOrder } = useAddOrder()
  const handlePlaceOrder = () => {
    Swal.fire({
      title: 'Bạn có chắc muốn đặt hàng không?',
      text: 'Đơn hàng sẽ được xử lý sau khi xác nhận!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đặt hàng',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        createOrder(orderInfo, {
          onSuccess: async () => {
            Swal.fire({
              title: 'Đặt hàng thành công!',
              text: 'Đơn hàng của bạn đã được tạo.',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            navigate(routerOrderPageOk.path)
            // Danh sách sản phẩm cần xóa
            const itemsToRemove = orderInfo.orderDetails.map((item) => ({
              productId: item.productId,
              size: item.size
            }))

            // Dispatch để xóa trên Redux ngay lập tức (UX mượt hơn)
            dispatch(removeMultipleCartItems(itemsToRemove))

            // Xóa từng sản phẩm trên API
            for (const item of itemsToRemove) {
              await dispatch(deleteCartItem(item))
            }

            // Reset danh sách sản phẩm đã chọn
            dispatch(resetSelecdCartItem())
          },
          onError: (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: `Đã xảy ra lỗi khi tạo đơn hàng: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'Thử lại'
            })
          }
        })
      }
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end !important',
        flexDirection: 'column',
        gap: '20px',
        alignContent: 'flex-start'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Giao hàng tới
        </Typography>
        <Typography sx={{ color: '#0d6efd', cursor: 'pointer', fontWeight: '500', fontSize: '20px !important' }}>
          Thay đổi
        </Typography>
      </Box>
      <Box
        sx={{
          border: '1px solid rgba(242, 194, 207, 0.5)',
          borderRadius: '15px',
          padding: '15px'
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px !important' }}>{orderInfo?.fullName}</Typography>
        <Typography sx={{ fontSize: '20px !important' }}>SDT: {orderInfo?.phoneNumber}</Typography>
        <Typography sx={{ fontSize: '20px !important' }}>Địa chỉ: {orderInfo?.shippingAddress}</Typography>
      </Box>
      <Box sx={{ marginTop: '15px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Phương thức nhận hàng
          </Typography>
          <Typography sx={{ color: '#0d6efd', cursor: 'pointer', fontWeight: '500', fontSize: '20px !important' }}>
            Thay đổi
          </Typography>
        </Box>

        <Box
          sx={{
            border: '1px solid rgba(242, 194, 207, 0.5)',
            borderRadius: '15px',
            padding: '15px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '60px'
          }}
        >
          <Typography sx={{ fontSize: '20px !important' }}>
            {shippingMethodMap[orderInfo.shippingMethod] || 'Phương thức giao hàng không xác định'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: '15px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Phương thức thanh toán
          </Typography>
          <Typography sx={{ color: '#0d6efd', cursor: 'pointer', fontWeight: '500', fontSize: '20px !important' }}>
            Thay đổi
          </Typography>
        </Box>

        <Box
          sx={{
            border: '1px solid rgba(242, 194, 207, 0.5)',
            borderRadius: '15px',
            padding: '15px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '60px'
          }}
        >
          <Typography sx={{ fontSize: '20px !important' }}>
            {orderInfo.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Thanh toán bằng chuyển khoản'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handlePlaceOrder}
          sx={{
            backgroundColor: '#F2C2CF',
            color: 'rgb(12, 12, 12)',
            border: '2px solid #f2c2cf',
            padding: '10px 20px',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            width: '180px',
            height: '50px',
            marginTop: '20px',
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: ' rgb(255, 255, 255)',
              color: '#000'
            }
          }}
        >
          Đặt hàng
        </Button>
      </Box>
    </div>
  )
}

export default CompleteTheOrder
