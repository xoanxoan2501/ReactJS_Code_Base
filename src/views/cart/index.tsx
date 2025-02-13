import { Box, Typography } from '@mui/material'

const CartPage = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '2rem'
        }}
        variant="h5"
      >
        Giỏ hàng
      </Typography>
      <Typography>Test</Typography>
    </Box>
  )
}

export default CartPage
