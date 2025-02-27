import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import './PaymentInfo.css'
import { Button } from 'antd'
import { useState } from 'react'

function PaymentInfo({ onBack }: { onBack: () => void }) {
  const [selectPayment, setSelectPayment] = useState('')
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
        <Button className='customer-button'>Hoàn tất đơn hàng </Button>
      </div>
    </div>
  )
}

export default PaymentInfo
