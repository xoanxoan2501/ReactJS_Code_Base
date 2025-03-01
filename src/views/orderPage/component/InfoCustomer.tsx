import { useAppSelector } from '@/shared/hook/reduxHooks'
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { routerCart } from '@/views/cart/router'
import { Link } from 'react-router-dom'
import '../orderPage.css'

interface InfoCustomer {
  name: string
  phone: string
  address: string
}

export const infoCustomer: InfoCustomer[] = [
  {
    name: 'Trần Thi Mỹ Xoan',
    phone: '0815142648',
    address: '37 đường số 9, Bình Thọ, Thủ Đức'
  },
  {
    name: 'Nguyễn Văn A',
    phone: '0905123456',
    address: '12 Lê Lợi, Quận 1, TP. HCM'
  },
  {
    name: 'Lê Thị B',
    phone: '0987987654',
    address: '25 Nguyễn Trãi, Quận 5, TP. HCM'
  },
  {
    name: 'Phạm Văn C',
    phone: '0977567890',
    address: '89 Trần Hưng Đạo, Quận 10, TP. HCM'
  }
]

function InfoCustomer({ onShowPayment }: { onShowPayment: () => void }) {
  const user = useAppSelector((state) => state.profile.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'customer-info-popover' : undefined

  return (
    <div>
      <div className='info-customer'>
        <TextField
          label='Họ và tên'
          name='fullname'
          variant='outlined'
          className='textField'
          sx={{ width: '90%' }}
          value={user?.fullname}
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
          {infoCustomer.map((customer, index) => (
            <Box key={index} sx={{ marginTop: 1, padding: 1, borderBottom: '1px solid #ddd' }}>
              <Typography variant='subtitle1'>{customer.name}</Typography>
              <Typography variant='body2'>SĐT: {customer.phone}</Typography>
              <Typography variant='body2'>Địa chỉ: {customer.address}</Typography>
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
