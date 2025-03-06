import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function CompleteTheOrder() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.profile.user)
  const selectedAddress = user?.addresses?.find((addr) => addr.isDefault) || user

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end !important',
        flexDirection: 'column',
        gap: '20px',
        alignContent: 'flex-start'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Giao hàng tới
        </Typography>
        <Typography sx={{ color: '#0d6efd', cursor: 'pointer', fontWeight: '500', fontSize: '20px !important' }}>
          Thay đổi
        </Typography>
      </Box>
      <Box
        sx={{
          border: '1px solid rgba(242, 194, 207, 0.5)',
          borderRadius: '15px',
          padding: '15px'
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px !important' }}>{selectedAddress?.fullname}</Typography>
        <Typography sx={{ fontSize: '20px !important' }}>SDT: {selectedAddress?.phoneNumber}</Typography>
        <Typography sx={{ fontSize: '20px !important' }}>
          Địa chỉ: {selectedAddress?.address}, {selectedAddress?.district}. {selectedAddress?.province}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '15px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Phương thức thanh toán
          </Typography>
          <Typography sx={{ color: '#0d6efd', cursor: 'pointer', fontWeight: '500', fontSize: '20px !important' }}>
            Thay đổi
          </Typography>
        </Box>

        <Box
          sx={{
            border: '1px solid rgba(242, 194, 207, 0.5)',
            borderRadius: '15px',
            padding: '15px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '60px'
          }}
        >
          <Typography sx={{ fontSize: '20px !important' }}>Thanh toán khi nhận hàng</Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{
            backgroundColor: '#F2C2CF',
            color: 'rgb(12, 12, 12)',
            border: '2px solid #f2c2cf',
            padding: '10px 20px',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            width: '180px',
            height: '50px',
            marginTop: '20px',

            fontSize: '16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: ' rgb(255, 255, 255)',
              color: '#000'
            }
          }}
        >
          Đặt hàng
        </Button>
      </Box>
    </div>
  )
}

export default CompleteTheOrder
