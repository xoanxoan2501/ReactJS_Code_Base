import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { routerCart } from '@/views/user/cart/router'
import { Link } from 'react-router-dom'
import '../orderPage.css'
import { updateOrder } from '@/apis/order'

function InfoCustomer({ onShowPayment }: { onShowPayment: () => void }) {
  const user = useAppSelector((state) => state.profile.user)
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const selectedAddress = useAppSelector((state) => state.order.orderInfo)
  console.log(selectedAddress)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectAddress = (address: any) => {
    dispatch(
      updateOrder({
        fullName: address.fullname,
        phoneNumber: address.phoneNumber,
        address: address.address,
        shippingAddress: `${address.address}, ${address.district}, ${address.province}`,
        email: user?.email || ''
      })
    )
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'customer-info-popover' : undefined
  useEffect(() => {
    const defaultAddr = user?.addresses?.find((addr) => addr.isDefault)
    if (defaultAddr) {
      dispatch(
        updateOrder({
          fullName: defaultAddr.fullname,
          phoneNumber: defaultAddr.phoneNumber,
          address: defaultAddr.address,
          shippingAddress: `${defaultAddr.address}, ${defaultAddr.district}, ${defaultAddr.province}`,
          email: user?.email || ''
        })
      )
    }
  }, [dispatch, user?.addresses])

  return (
    <div>
      <div className='info-customer'>
        <TextField
          label='Họ và tên'
          name='fullname'
          variant='outlined'
          className='textField'
          sx={{ width: '90%' }}
          InputProps={{ readOnly: true }}
          value={selectedAddress?.fullName || user?.fullname}
        />
        <IconButton onClick={handleClick}>
          <AccountBoxIcon className='icon-account' />
        </IconButton>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        disableScrollLock
      >
        <Box sx={{ padding: 2, minWidth: 300 }}>
          {user?.addresses?.map((address: any, index: number) => (
            <Box
              key={index}
              sx={{ marginTop: 1, padding: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
              onClick={() => handleSelectAddress(address)}
            >
              <Typography variant='subtitle1'>{address.fullname}</Typography>
              <Typography variant='body2'>SĐT: {address.phoneNumber}</Typography>
              <Typography variant='body2'>Địa chỉ: {address.address}</Typography>
              <Typography variant='body2'>Quận/Huyện: {address.district}</Typography>
              <Typography variant='body2'>Tỉnh/Thành phố: {address.province}</Typography>
            </Box>
          ))}
        </Box>
      </Popover>
      <Box className='registerRow'>
        <TextField
          label='Email'
          name='email'
          variant='outlined'
          className='textField'
          sx={{ width: '70%' }}
          InputProps={{ readOnly: true }}
          value={user?.email}
        />
        <TextField
          label='Số điện thoại '
          variant='outlined'
          className='textField'
          sx={{ width: '30%' }}
          value={selectedAddress?.phoneNumber || user?.phoneNumber}
          InputProps={{ readOnly: true }}
        />
      </Box>
      <Box>
        <TextField
          label='Địa chỉ'
          variant='outlined'
          className='textField'
          sx={{ width: '100%' }}
          InputProps={{ readOnly: true }}
          value={selectedAddress?.address || user?.address}
        />
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
          value={user?.district}
        />
      </Box>
      <Box className='delivery-time'>
        <Link to={routerCart.path}>
          <Typography> Quay lại giỏ hàng</Typography>
        </Link>
        <Button className='customer-buttonn' onClick={onShowPayment}>
          Phương thức thanh toán
        </Button>
      </Box>
    </div>
  )
}

export default InfoCustomer
