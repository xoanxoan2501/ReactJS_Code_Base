import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import './CardProduct.css'

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  _id: string
  title: string
  description: string
  price: number
  thumbnail: string
}

// Nhận dữ liệu sản phẩm từ props
export default function CardProduct({ product }: { product: Product }) {
  return (
    <Card className="card">
      <Box className="zoom-content">
        <CardMedia
          className="card-media"
          image={product.thumbnail} // ✅ Dùng ảnh từ API
          title={product.title}
        />
        <CardContent className="card-content">
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              {product.title} {/* ✅ Tên sản phẩm từ API */}
            </Typography>
            <Typography>{product.description}</Typography> {/* ✅ Mô tả */}
          </Box>
        </CardContent>

        <Box className="price-box">
          <Typography className="price-tag">{product.price} VND</Typography>{' '}
          {/* ✅ Giá từ API */}
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
