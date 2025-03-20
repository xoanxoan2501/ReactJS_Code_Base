import { LayoutBox } from '../../Profile/components/LayoutBox'
import { Box, Button, ButtonBase, Paper, Tab, Tabs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { ReactElement, useState } from 'react'
import './notifications.css'
import iconShip from '@/assets/icons/iconShip.png'
import iconTick from '@/assets/icons/iconTick.png'
import iconVoucher from '@/assets/icons/iconVoucher.png'
import iconFail from '@/assets/icons/failIcon.png'

const notifications = [
  {
    icon: <img src={iconTick} />,
    title: 'Giao kiện hàng thành công',
    description: 'Kiện hàng SPW001 đã được giao thành công tới bạn.',
    type: 'order',
    status: 'success'
  },
  {
    icon: <img src={iconFail} />,
    title: 'Giao kiện hàng không thành công',
    description: 'Kiện hàng SPW001 không được giao thành công tới bạn.',
    type: 'order',
    status: 'fail'
  },
  {
    icon: <img src={iconShip} />,
    title: 'Xác nhận đơn hàng',
    description: 'Kiện hàng SPW001 đã được xác nhận.',
    type: 'order',
    status: 'shipping'
  },
  {
    icon: <img src={iconVoucher} />,
    title: 'SIÊU HOT! MÃ GIẢM 200K SẴN SÀNG',
    description: (
      <>
        <Typography>🔥 Thêm mã giảm 200k chỉ có hôm nay!</Typography>
        <Typography>🛒 Freeship tận nơi - mua sắm ngay</Typography>
      </>
    ),
    type: 'voucher'
  }
]

function Notifications() {
  const [selectedTab, setSelectedTab] = useState(0) // 0: Tất cả, 1: Đơn hàng, 2: Mã giảm giá

  // Hàm xử lý khi đổi tab
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  // Lọc thông báo theo tab được chọn
  const filteredNotifications = notifications.filter((item) => {
    if (selectedTab === 0) return true
    if (selectedTab === 1) return item.type === 'order'
    if (selectedTab === 2) return item.type === 'voucher'
    return false
  })

  return (
    <LayoutBox sx={{ background: '#F2C2CF' }}>
      <Box sx={{ p: 3, borderRadius: 2, maxWidth: '100%', mx: 'auto', mt: 4, padding: 1 }}>
        <Typography variant='h6' sx={{ pb: 2, textAlign: 'center', fontSize: '30px' }}>
          Thông báo
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
          <Tabs value={selectedTab} onChange={handleChange} textColor='secondary' indicatorColor='secondary'>
            <Tab label='Tất cả' sx={{ color: '#000', fontSize: '20px' }} />
            <Tab label='Đơn hàng' sx={{ color: '#000', fontSize: '20px' }} />
            <Tab label='Mã giảm giá' sx={{ color: '#000', fontSize: '20px' }} />
          </Tabs>
        </Box>

        <Box
          sx={{
            mt: 3,
            maxHeight: '470px',
            overflowY: 'auto',
            pr: '1px',
            boxSizing: 'border-box',
            width: '100%',
            mr: '-8px',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#8B8B8B',
              borderRadius: '6px'
            }
          }}
        >
          {filteredNotifications.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                mb: 3,
                padding: '30px',
                height: '150px',
                width: '100%'
              }}
            >
              <Box sx={{ mr: 2 }}>
                {item.status === 'success' ? (
                  <img src={iconTick} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                ) : item.status === 'fail' ? (
                  <img src={iconFail} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                ) : item.status === 'shipping' ? (
                  <img src={iconShip} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                ) : (
                  <img src={iconVoucher} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                )}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>{item.title}</Typography>
                {typeof item.description === 'string' ? (
                  <Typography variant='body2' sx={{ fontSize: '20px' }}>
                    {item.description}
                  </Typography>
                ) : (
                  React.Children.map(item.description.props.children, (child, i) => (
                    <div className='typograph-des'>
                      <Typography key={i} variant='body2' sx={{ fontSize: '20px' }}>
                        {child}
                      </Typography>
                    </div>
                  ))
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontWeight: '400',
                  color: '#000',
                  '&:hover': {
                    color: '#E87091'
                  }
                }}
              >
                Xem chi tiết
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutBox>
  )
}

export default Notifications
