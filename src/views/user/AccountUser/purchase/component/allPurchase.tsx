import { Box, Typography } from '@mui/material'
import '../Purchase.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CancelIcon from '@mui/icons-material/Cancel'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { routerDetailPurchase } from '../page/router'
import { fetchOrderAPI, useFetchOrders } from '@/apis/order/api'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { Order } from '@/apis/order'
import { formatNumber } from '@/utils/formatter'
function AllPurchase({ status }: { status?: string }) {
  const userLogin = useAppSelector((state) => state.profile.user)

  console.log('status', status)

  const {
    data: orders,
    isLoading,
    isError
  } = useFetchOrders({
    status,
    isKeepPreviousData: true,
    userId: userLogin?._id
  })

  console.log('orders', orders)

  if (isLoading) return <Typography>Đang tải đơn hàng...</Typography>
  if (isError) return <Typography>Không thể tải đơn hàng. Vui lòng thử lại!</Typography>

  return (
    <Box sx={{ maxHeight: '600px', overflowY: 'auto', padding: '10px' }}>
      {orders?.data?.map((order: Order) => {
        const quantityTotal = order.orderDetails.reduce((acc, product) => acc + product.quantity, 0)
        const totalPrice = order.orderDetails.reduce((acc, product) => acc + product.total, 0)

        return (
          <div className='container-order'>
            <div className='img-container'>
              <img src='./img/banh_mau_hong.jpg' className='img-details' />
              <div className='number-order'>{quantityTotal}</div>
            </div>
            <div className='details-container'>
              <Typography sx={{ fontSize: '20px !important', fontWeight: 'bold' }}>Mousse gree tea </Typography>
              <Typography>Số sản lượng sản phẩm : {quantityTotal} </Typography>
              <Typography>Tổng tiền : {formatNumber(totalPrice)}đ </Typography>
            </div>
            <div className='button-container'>
              <LocalShippingIcon sx={{ color: '#DC567A', fontSize: '30px' }} />
              <Link to={routerDetailPurchase.generatePath?.(order?._id) || '#'}>
                <Button className='buttonn'>Xem chi tiết</Button>
              </Link>
            </div>
          </div>
        )
      })}
      {/* <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <CancelIcon sx={{ color: '#DC567A', fontSize: '30px' }} />
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div>
      <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <Button className='buttonn'>mua lại</Button>
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div>
      <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <LocalShippingIcon sx={{ color: '#DC567A', fontSize: '30px' }} />
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div> */}
    </Box>
  )
}

export default AllPurchase
