import { LayoutBox } from '@/views/user/Profile/components/LayoutBox'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import './DetailPurchase.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Typography } from '@mui/material'
import TableProductOrder from '../component/tableProductOrder'
import { Link, useParams } from 'react-router-dom'
import { routerPurchase } from '../router'
import { Order } from '@/apis/order'
import { useFetchOrders } from '@/apis/order/api'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { useMemo } from 'react'
import { formatDateTimeStamp } from '@/utils/formatter'

function DetailPurchase() {
  const { orderId } = useParams<{ orderId: string }>()
  const userLogin = useAppSelector((state) => state.profile.user)

  const { data: orders } = useFetchOrders({
    isKeepPreviousData: true,
    userId: userLogin?._id
  })

  const order = useMemo(() => {
    return orders?.data?.find((order: Order) => order._id === orderId)
  }, [orderId, orders?.data])

  console.log('order-detail', order)

  return (
    <LayoutBox>
      <div className='container-order11'>
        <Link to={routerPurchase.path}>
          <div className='back-icons'>
            <KeyboardBackspaceIcon sx={{ fontSize: '30px', color: '#DC567A' }} />
          </div>
        </Link>
        <Typography className='typograpy-detals'>Chi tiết đơn hàng : #{order?._id}</Typography>
        <LocalShippingIcon sx={{ color: '#DC567A', fontSize: '50px' }} />
      </div>

      <span className='span-details'>
        {' '}
        Ngày đặt hàng: {order?.createdAt ? formatDateTimeStamp(Number(order.createdAt)) : 'N/A'}
      </span>
      <div className='info-purcharse'>
        <div className='info-info'>
          <Typography variant='subtitle1'> {order?.fullName}</Typography>
          <Typography variant='subtitle1'> Địa chỉ : {order?.address}</Typography>
          <Typography variant='subtitle1'> Số điện thoại: {order?.phoneNumber} </Typography>
        </div>
        <div className='info-info'>
          <Typography variant='subtitle1'> Hình thức giao hàng : {order?.shippingMethod}</Typography>
          <Typography variant='subtitle1'>
            {' '}
            Hình thức thanh toán :{' '}
            {order?.paymentMethod === 'cod' ? 'Thanh toán bằng tiền mặt' : 'Chuyển khoản ngân hàng'}
          </Typography>
        </div>
      </div>

      <TableProductOrder products={order?.orderDetails || []} />
    </LayoutBox>
  )
}

export default DetailPurchase
