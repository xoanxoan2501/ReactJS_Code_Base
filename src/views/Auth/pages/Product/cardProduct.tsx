import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import './CardProduct.css' // ✅ Import file CSS

export default function CardProduct() {
  return (
    <Card className="card">
      <Box className="zoom-content">
        <CardMedia
          className="card-media"
          image="./img/banh_mau_hong.jpg"
          title="Rose Mouse Cake"
        />
        <CardContent className="card-content">
          <Box>
            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>
              Rose Mouse Cake
            </Typography>
            <Typography>RM001</Typography>{' '}
          </Box>
        </CardContent>

        <Box className="price-box">
          <Typography className="price-tag">250.000</Typography>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className="cart-icon"
          >
            <AddShoppingCartIcon sx={{ fontSize: '28px' }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
