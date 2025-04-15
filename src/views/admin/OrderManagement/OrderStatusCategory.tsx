import { Stack, Button, Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import iconClock from '@/assets/icons/OrderManagement/Clock.svg'
import iconBowPrepare from '@/assets/icons/OrderManagement/BowPrepare.svg'
import iconTruck from '@/assets/icons/OrderManagement/Truck.svg'
import iconComplete from '@/assets/icons/OrderManagement/Complete.svg'
import iconRefund from '@/assets/icons/OrderManagement/Refund.svg'

const OrderStatusCategory = () => {
  const navigate = useNavigate()

  return (
    <Stack
      direction={'row'}
      spacing={1.5}
      sx={{
        padding: '15px 0',
        borderBottom: '2px solid #086191'
      }}
    >
      <Card
        sx={{
          backgroundColor: '#1AFB9A80',
          borderRadius: '15px',
          padding: '15px',
          '&:hover': {
            color: 'inherit'
          }
        }}
      >
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <img style={{ marginRight: '8px' }} src={iconClock} alt='logo' className='icon_hover' />
          Chờ xác nhận abcd
        </Stack>
        <Typography variant='subtitle1'>Tổng số đơn hàng: 10</Typography>
        <Typography variant='subtitle1'>Tổng số tiền: 1.150.000 đ</Typography>
      </Card>
      <Card
        sx={{
          backgroundColor: '#7CCCF8',
          borderRadius: '15px',
          padding: '15px',
          '&:hover': {
            color: 'inherit'
          }
        }}
      >
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <img style={{ marginRight: '8px' }} src={iconBowPrepare} alt='logo' className='icon_hover' />
          Đang chuẩn bị
        </Stack>
        <Typography variant='subtitle1'>Tổng số đơn hàng: 10</Typography>
        <Typography variant='subtitle1'>Tổng số tiền: 1.150.000 đ</Typography>
      </Card>
      <Card
        sx={{
          backgroundColor: '#FF6F91',
          borderRadius: '15px',
          padding: '15px',
          '&:hover': {
            color: 'inherit'
          }
        }}
      >
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <img style={{ marginRight: '8px' }} src={iconTruck} alt='logo' className='icon_hover' />
          Đang giao
        </Stack>
        <Typography variant='subtitle1'>Tổng số đơn hàng: 10</Typography>
        <Typography variant='subtitle1'>Tổng số tiền: 1.150.000 đ</Typography>
      </Card>
      <Card
        sx={{
          backgroundColor: '#0EDA81',
          borderRadius: '15px',
          padding: '15px',
          '&:hover': {
            color: 'inherit'
          }
        }}
      >
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <img style={{ marginRight: '8px' }} src={iconComplete} alt='logo' className='icon_hover' />
          Hoàn thành
        </Stack>
        <Typography variant='subtitle1'>Tổng số đơn hàng: 10</Typography>
        <Typography variant='subtitle1'>Tổng số tiền: 1.150.000 đ</Typography>
      </Card>
      <Card
        sx={{
          backgroundColor: '#F9ED69',
          borderRadius: '15px',
          padding: '15px',
          '&:hover': {
            color: 'inherit'
          }
        }}
      >
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <img style={{ marginRight: '8px' }} src={iconRefund} alt='logo' className='icon_hover' />
          Hoàn trả/ đổi trả
        </Stack>
        <Typography variant='subtitle1'>Tổng số đơn hàng: 10</Typography>
        <Typography variant='subtitle1'>Tổng số tiền: 1.150.000 đ</Typography>
      </Card>
    </Stack>
  )
}

export default OrderStatusCategory
