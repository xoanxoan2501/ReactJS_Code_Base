import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import './CardProduct.css'
import { IProduct } from '@/apis/product'
import { useNavigate } from 'react-router-dom'
import { routerProductDetail } from '@/views/Auth/pages/ProductDetails/router'

// Nhận dữ liệu sản phẩm từ props
export default function CardProduct({ product }: { product: IProduct }) {
  const navigate = useNavigate()

  return (
    <Card
      className='card'
      onClick={() =>
        routerProductDetail?.generatePath ? navigate(routerProductDetail.generatePath(product._id) || '') : null
      }
    >
      <Box className='zoom-content'>
        <CardMedia
          className='card-media'
          image={product.thumbnail} // ✅ Dùng ảnh từ API
          title={product.title}
        />
        <CardContent className='card-content'>
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              {product.title} {/* ✅ Tên sản phẩm từ API */}
            </Typography>
            <Typography>{product.code}</Typography> {/* ✅ Mô tả */}
          </Box>
        </CardContent>

        <Box className='price-box'>
          <Typography className='price-tag'>{100000} VND</Typography> {/* ✅ Giá từ API */}
          <IconButton color='primary' aria-label='add to shopping cart' className='cart-icon'>
            <AddShoppingCartIcon sx={{ fontSize: '28px' }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
