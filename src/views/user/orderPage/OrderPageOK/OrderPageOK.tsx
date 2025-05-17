import { Box } from '@mui/system'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Button, Typography } from '@mui/material'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { routerHome } from '../../home/router'
import { routerDetailPurchase } from '../../AccountUser/purchase/page/router'

function OrderPageOK() {
  const navigate = useNavigate()
  const location = useLocation()

  const { orderId } = location.state || {}

  if (!orderId) {
    return <Navigate to={routerHome.path} />
  }

  return (
    <Box
      sx={{
        height: '480px',
        width: '100%',
        backgroundColor: 'rgba(242, 194, 207, 0.25)',
        margin: '20px auto',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            backgroundColor: '#cce0f5',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CheckIcon sx={{ color: 'white', fontSize: 40 }} />
        </Box>

        <Typography sx={{ fontSize: '30px !important', fontWeight: 'bold' }}>ĐẶT HÀNG THÀNH CÔNG</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Button
          sx={{
            backgroundColor: '#F2C2CF',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '15px',
            padding: '8px 20px',
            border: '2px solid  #DC567A',
            '&:hover': {
              backgroundColor: 'white'
            }
          }}
          onClick={() => navigate(routerHome.path)}
        >
          TRANG CHỦ
        </Button>

        <Button
          sx={{
            backgroundColor: '#F2C2CF',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '15px',
            padding: '8px 20px',
            border: '2px solid  #DC567A',
            '&:hover': {
              backgroundColor: 'white'
            }
          }}
          onClick={() => {
            if (routerDetailPurchase && routerDetailPurchase.generatePath) {
              navigate(routerDetailPurchase?.generatePath?.(orderId))
            }
          }}
        >
          ĐƠN MUA
        </Button>
      </Box>
    </Box>
  )
}

export default OrderPageOK
