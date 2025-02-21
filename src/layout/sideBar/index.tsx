import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const tabs = [
  'Thông tin tài khoản',
  'Địa chỉ',
  'Thông tin thanh toán',
  'Quản lý đơn hàng',
  'Tài khoản',
  'Thông báo',
  'Ví voucher'
]

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const renderSideBarItems = () => {
    return tabs.map((tab, index) => {
      return (
        <Box
          sx={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
            border: '0.5px solid #DC567A',
            width: '100%',
            textAlign: 'center',
            '&:hover': {
              color: '#DC567A'
            },
            cursor: 'pointer',
            color: selectedIndex === index ? '#DC567A' : 'inherit'
          }}
          onClick={() => setSelectedIndex(index)}
          key={index}
        >
          <Typography variant="h6">{tab}</Typography>
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
        borderTopLeftRadius: '1rem',
        borderBottomLeftRadius: '1rem',
        border: '0.5px solid #DC567A'
      }}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
    >
      <Box
        sx={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
          border: '0.5px solid #DC567A',
          width: '100%',
          borderTopLeftRadius: '1rem',
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold'
          }}
          variant="h5"
        >
          Tài khoản
        </Typography>
      </Box>
      {renderSideBarItems()}
      <Box
        sx={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          border: '0.5px solid #DC567A',
          width: '100%',
          textAlign: 'center',
          borderBottomLeftRadius: '1rem',
          '&:hover': {
            color: '#DC567A'
          },
          cursor: 'pointer'
        }}
      >
        <Typography variant="h6"></Typography>
      </Box>
    </Stack>
  )
}

export default SideBar
