import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import './PaymentInfo.css'
import { Button } from 'antd'
import { useState } from 'react'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { useAddOrder } from '@/apis/order/use-add-order'
import { infoCustomer } from './InfoCustomer'
import { toast } from 'react-toastify'

function PaymentInfo({ onBack }: { onBack: () => void }) {
  const [selectPayment, setSelectPayment] = useState('')
  const selectProducts = useAppSelector((state) => state.cart.selectedCartItems)
  const totalPayment = useAppSelector((state) => state.cart.totalPayment)
  const user = useAppSelector((state) => state.profile.user)
  const { mutateAsync: addOrder } = useAddOrder()

  const handleAddOrder = async () => {
    const order = {
      fullName: infoCustomer[0].name,
      address: infoCustomer[0].address,
      email: 'dosidat@gmail.com',
      phoneNumber: infoCustomer[0].phone,
      total: totalPayment,
      shippingMethod: 'oder',
      shippingAddress: 'thuduc d',
      trackingNumber: 'fffff d',
      paymentMethod: selectPayment || 'cod',
      userId: user?._id || '',
      orderDetails: selectProducts.map((item) => ({
        productId: item.productId,
        title: 'khong co tieu de',
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        size: item.size,
        note: 'note'
      }))
    }
    console.log(order)
    await addOrder(order)
      .then(() => {
        toast.success('Đặt hàng thành công')
        console.log(order)
      })
      .catch((error) => {
        toast.error('Đặt hàng thất bại, bị lỗi: ' + error)
      })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h5> Phương thức nhận hàng </h5>

        <FormControl className='payment-method-container'>
          <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
            <FormControlLabel
              className='payment-method-item'
              value='oder'
              control={<Radio />}
              label={
                <div className='payment-method-item-content'>
                  <div> Giao hàng tận nơi </div>
                  <div>
                    {new Intl.NumberFormat('vi-VN').format(50000)}
                    <sup>đ</sup>
                  </div>
                </div>
              }
            />

            <FormControlLabel
              className='payment-method-item'
              value='ship1'
              control={<Radio />}
              label={
                <div className='payment-method-item-content'>
                  <div> Đến cửa hàng (551 Sư Vạn Hạnh) quận 10 lấy bánh </div>
                  <div>
                    {new Intl.NumberFormat('vi-VN').format(0)}
                    <sup>đ</sup>
                  </div>
                </div>
              }
            />
            <FormControlLabel
              className='payment-method-item'
              value='ship2'
              control={<Radio />}
              label={
                <div className='payment-method-item-content'>
                  <div> Đến cửa hàng (31 Dân Chủ) TP Thủ Đức lấy bánh </div>
                  <div>
                    {new Intl.NumberFormat('vi-VN').format(0)}
                    <sup>đ</sup>
                  </div>
                </div>
              }
            />
            <FormControlLabel
              className='payment-method-item'
              value='ship3'
              control={<Radio />}
              label={
                <div className='payment-method-item-content'>
                  <div> Đến cửa hàng (4 Điện Biên Phủ) quận Bình Thạnh lấy bánh </div>
                  <div>
                    {new Intl.NumberFormat('vi-VN').format(0)}
                    <sup>đ</sup>
                  </div>
                </div>
              }
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <h5>Phương thức thanh toán </h5>
        <FormControl className='payment-method-container'>
          <RadioGroup value={selectPayment} onChange={(e) => setSelectPayment(e.target.value)}>
            <FormControlLabel
              className='payment-method-item'
              value='cod'
              control={<Radio />}
              label='Thanh toán khi nhận hàng'
            />
            <FormControlLabel
              className='payment-method-item'
              value='bank'
              control={<Radio />}
              label='Thanh toán qua tài khoản ngân hàng'
            />
          </RadioGroup>

          {selectPayment === 'bank' && (
            <div className='bank-info'>
              <div>
                <div>Ngân hàng: Sacombank</div>
                <div>Họ và tên: Tran Thi My Xoan</div>
                <div>Số tài khoản: 050123592783</div>
              </div>
            </div>
          )}
        </FormControl>
      </div>

      <div className='delivery-time'>
        <Typography onClick={onBack} sx={{ color: '#0d6efd' }}>
          Quay lại
        </Typography>
        <Button className='customer-button' onClick={() => handleAddOrder()}>
          Đặt hàng
        </Button>
      </div>
    </div>
  )
}

export default PaymentInfo
