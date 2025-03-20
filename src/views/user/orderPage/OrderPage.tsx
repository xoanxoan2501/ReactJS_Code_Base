import { Box, Button, TextField, Typography } from '@mui/material'
import './OrderPage.css'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import InfoCustomer from './component/InfoCustomer'
import PaymentInfo from './component/PaymentInfo'
import { useEffect, useState } from 'react'
import CompleteTheOrder from './component/CompleteTheOrder'
import { updateOrder } from '@/apis/order'

function OrderPage() {
  const selectProducts = useAppSelector((state) => state.cart.selectedCartItems)
  const totalPayment = useAppSelector((state) => state.cart.totalPayment)
  const [showPayment, setShowPayment] = useState(false)
  const [showCompleteOrder, setShowCompleteOrder] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('oder')
  const productTotal = selectProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const shippingFee = shippingMethod === 'oder' ? 50000 : 0

  const dispatch = useAppDispatch()
  const totalPrice = productTotal + shippingFee
  const orderInfo = useAppSelector((state) => state.order.orderInfo)
  const [orderDetails, setOrderDetails] = useState(
    selectProducts.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      size: item.size || '',
      note: '',
      title: item.title
    }))
  )
  useEffect(() => {
    dispatch(
      updateOrder({
        ...orderInfo,
        orderDetails,
        total: totalPrice,
        shippingMethod
      })
    )
  }, [dispatch, orderDetails, shippingMethod, totalPrice])
  const handleNoteChange = (productId: string, newNote: string) => {
    setOrderDetails((prevDetails) =>
      prevDetails.map((product) => (product.productId === productId ? { ...product, note: newNote } : product))
    )
  }

  return (
    <div className='order-page'>
      <div className='info-order'>
        {!showCompleteOrder ? (
          !showPayment ? (
            <InfoCustomer onShowPayment={() => setShowPayment(true)} />
          ) : (
            <PaymentInfo
              onBack={() => setShowPayment(false)}
              onComplete={() => setShowCompleteOrder(true)}
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
            />
          )
        ) : (
          <CompleteTheOrder />
        )}
      </div>

      <div className='info-order-product'>
        {selectProducts.length > 0 ? (
          selectProducts.map((item) => (
            <Box key={item.productId} className='product-detail'>
              <div className='image-container'>
                <img src={item.thumbnail} alt={item.title} className='img-product' />
                <div className='number-badge'>{item.quantity}</div>
              </div>
              <div className='info-product'>
                <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</Typography>
                <Typography>{item.size}</Typography>
                <TextField
                  label='Ghi chú'
                  name={`note-${item.productId}`}
                  className='textField'
                  variant='outlined'
                  size='small'
                  sx={{ width: '100%' }}
                  value={orderDetails.find((product) => product.productId === item.productId)?.note || ''}
                  onChange={(e) => handleNoteChange(item.productId, e.target.value)}
                />
              </div>
              <Typography className='price-order' style={{ fontSize: '18px' }}>
                {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}
                <sup>đ</sup>
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>Không có sản phẩm nào được chọn.</Typography>
        )}

        <div className='line-order'> </div>
        <div className='voucher-container'>
          <TextField label='Voucher' name='fullname' className='textField' variant='outlined' sx={{ width: '70%' }} />
          <Button className='customer-buttonn'>Áp dụng</Button>
        </div>
        <div className='line-order'> </div>
        <div className='price-order-container'>
          <div className='tam-tinh'>
            <Typography style={{ fontSize: '20px' }}>Tạm tính </Typography>
            <Typography style={{ fontSize: '20px' }}>
              {new Intl.NumberFormat('vi-VN').format(totalPayment)}
              <sup>đ</sup>
            </Typography>
          </div>
          <div className='tam-tinh'>
            <Typography style={{ fontSize: '20px' }}>Phí vận chuyển</Typography>
            <Typography style={{ fontSize: '20px' }}> {shippingFee} </Typography>
          </div>
          <div className='tam-tinh'>
            <Typography style={{ fontSize: '20px' }}>Voucher</Typography>
            <Typography style={{ fontSize: '20px' }}>---</Typography>
          </div>
        </div>
        <div className='line-order'> </div>
        <div className='tam-tinh'>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>Tổng tiền</Typography>
          <Typography style={{ fontSize: '20px' }}>
            {new Intl.NumberFormat('vi-VN').format(totalPrice)}
            <sup>đ</sup>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
