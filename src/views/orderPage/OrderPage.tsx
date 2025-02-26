import { Box, Button, TextField, Typography } from '@mui/material'
import './orderPage.css'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { Link } from 'react-router-dom'

function OrderPage() {
  const user = useAppSelector((state) => state.profile.user)
  const selectProducts = useAppSelector((state) => state.cart.selectedCartItems)
  const totalPayment = useAppSelector((state) => state.cart.totalPayment)
  return (
    <div className='order-page'>
      <div className='info-order'>
        <TextField
          label='Họ và tên'
          name='fullname'
          variant='outlined'
          className='textField'
          sx={{ width: '100%' }}
          value={user?.fullname}
        />
        <Box className='registerRow'>
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            className='textField'
            sx={{ width: '70%' }}
            value={user?.email}
          />
          <TextField
            label='Số điện thoại '
            variant='outlined'
            className='textField'
            sx={{ width: '30%' }}
            value={user?.phoneNumber}
          />
        </Box>
        <Box>
          <TextField label='Địa chỉ' variant='outlined' className='textField' sx={{ width: '100%' }} />
        </Box>
        <Box className='registerRow'>
          <TextField
            sx={{ width: '40%' }}
            className='textField'
            label='Tỉnh/Thành phố'
            InputProps={{ readOnly: true }}
            variant='outlined'
            value='Thành phố Hồ Chí Minh'
          />
          <TextField
            sx={{ width: '60%' }}
            className='textField'
            label='Quận/Huyện'
            InputProps={{ readOnly: true }}
            variant='outlined'
            value='Thu Duc'
          />
        </Box>
        <Box className='delivery-time'>
          <Link to='/cart'>
            <Typography> Quay lại giỏ hàng</Typography>
          </Link>
          <Button className='customer-button'>Phương thức thanh toán</Button>
        </Box>
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

        <div className='line-order'> </div>
        <div className='voucher-container'>
          <TextField label='Voucher' name='fullname' className='textField' variant='outlined' sx={{ width: '70%' }} />
          <Button className='customer-button'>Áp dụng</Button>
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
            <Typography style={{ fontSize: '20px' }}>---</Typography>
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
            {new Intl.NumberFormat('vi-VN').format(totalPayment)}
            <sup>đ</sup>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
