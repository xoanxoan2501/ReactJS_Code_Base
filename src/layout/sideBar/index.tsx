import { routerAddress } from '@/views/AccountUser/Address/router'
import { routerNotifications } from '@/views/AccountUser/Notifications/router'
import { routerPurchase } from '@/views/AccountUser/purchase/router'
import { routerPaymentUser } from '@/views/AccountUser/PaymentUser/router'
import { routerAccountInfo } from '@/views/Profile/router'
import { routerVoucherWallet } from '@/views/AccountUser/VoucherWallet/router'
import { Box, Stack, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { label: 'Thông tin tài khoản', path: routerAccountInfo.path },
  { label: 'Địa chỉ', path: routerAddress.path },
  { label: 'Thông tin thanh toán', path: routerPaymentUser.path },
  { label: 'Quản lý đơn hàng', path: routerPurchase.path },
  { label: 'Thông báo', path: routerNotifications.path },
  { label: 'Ví voucher', path: routerVoucherWallet.path }
]

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isPurchaseActive = location.pathname.startsWith('/purchase')

  const renderSideBarItems = () => {
    return tabs.map((tab, index) => {
      const isActive = tab.path === location.pathname || (tab.path === routerPurchase.path && isPurchaseActive)

      return (
        <Box
          key={index}
          sx={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
            borderBottom: '0.5px solid #DC567A',
            width: '100%',
            textAlign: 'center',
            '&:hover': { color: '#DC567A' },
            cursor: 'pointer',
            color: isActive ? '#DC567A' : 'inherit'
          }}
          onClick={() => navigate(tab.path)}
        >
          <Typography variant='h6'>{tab.label}</Typography>
        </Box>
      )
    })
  }

  return (
    <Stack
      sx={{
        width: '18%',
        backgroundColor: '#F2C2CF',
        marginTop: '2rem !important',
        borderRadius: '1rem 0 0 1rem',
        height: '592px',
        alignItems: 'flex-start'
      }}
      direction={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      overflow={'hidden'}
    >
      <Box
        sx={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
          borderTop: '0.5px solid #DC567A',
          borderBottom: '0.5px solid #DC567A',
          width: '100%',
          borderTopLeftRadius: '1rem',
          textAlign: 'center',
          marginTop: '0rem !important'
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
          Tài khoản
        </Typography>
      </Box>
      {renderSideBarItems()}
    </Stack>
  )
}

export default SideBar
