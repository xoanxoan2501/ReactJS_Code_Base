import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, IconButton, Tooltip } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import './CardProduct.css'
import { IProduct, setProductDetail, setShowProductDetail } from '@/apis/product'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'

interface ICardProduct {
  product: IProduct
}

export default function CardProduct({ product }: ICardProduct) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <>
      <Card className='card' style={{ cursor: 'pointer' }}>
        <Box className='zoom-content'>
          <CardMedia
            className='card-media'
            image={product.thumbnail}
            title={product.title}
            onClick={() => navigate(`/product/${product._id}`)}
          />
          <CardContent className='card-content'>
            <Tooltip
              title={product.title}
              arrow
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 8]
                    }
                  }
                ]
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                  noWrap
                >
                  {product.title}
                </Typography>
                <Typography>{product.code}</Typography>
              </Box>
            </Tooltip>
          </CardContent>

          <Box className='price-box'>
            <Typography className='price-tag'>
              {product.sizes?.[0].price?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
              })}
            </Typography>
            <IconButton
              color='primary'
              aria-label='add to shopping cart'
              className='cart-icon'
              onClick={() => {
                dispatch(setProductDetail(product))
                dispatch(setShowProductDetail(true))
              }}
            >
              <AddShoppingCartIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  )
}
