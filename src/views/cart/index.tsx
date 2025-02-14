import DataTable from '@/shared/components/data-table'
import { headerConfigs, sxConfig } from '@/views/cart/headerConfigs'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import iconDelete from '@/assets/icons/iconDelete.png'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { setCart } from '@/apis/cart'
import { handleRowSelectionModelChange } from '@/views/cart/headerConfigs'

const mockData = {
  _id: 'cart01',
  products: [
    {
      productId: 'product01',
      title: 'Áo thun nam',
      quantity: 2,
      price: 100000,
      thumbnail:
        'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1622106567382-7F0SRE19PQCN0S3Q732C/chup-anh-san-pham-dangkhoatea-8.jpg?format=750w'
    },
    {
      productId: 'product02',
      title: 'Áo sơ mi nam',
      quantity: 1,
      price: 200000,
      thumbnail:
        'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1622106567382-7F0SRE19PQCN0S3Q732C/chup-anh-san-pham-dangkhoatea-8.jpg?format=750w'
    },
    {
      productId: 'product03',
      title: 'Áo khoác nam',
      quantity: 3,
      price: 300000,
      thumbnail:
        'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1622106567382-7F0SRE19PQCN0S3Q732C/chup-anh-san-pham-dangkhoatea-8.jpg?format=750w'
    }
  ]
}

interface ICartItemDisplay {
  _id: string
  product: {
    title: string
    thumbnail: string
  }
  price: number
  quantity: number
  action?: { title: string; icon: string; key: string }[]
}

const CartPage = () => {
  const dispatch = useAppDispatch()
  const { cart, cartId } = useAppSelector((state) => state.cart)

  const convertData = (): ICartItemDisplay[] => {
    return cart.map((item) => {
      return {
        _id: item.productId,
        product: {
          title: item.title,
          thumbnail: item.thumbnail
        },
        price: item.price,
        quantity: item.quantity,
        action: [{ title: 'Xóa', icon: iconDelete, key: 'delete' }]
      }
    })
  }

  useEffect(() => {
    dispatch(setCart(mockData))
  }, [dispatch])

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
      {cartId && cartId !== '' && cart.length > 0 ? (
        <Stack
          className="container"
          sx={{ marginTop: '2rem', padding: '0 5rem' }}
          direction={'column'}
        >
          <DataTable
            headerConfigs={headerConfigs}
            data={convertData()}
            sx={sxConfig}
            handleRowSelectionModelChange={handleRowSelectionModelChange}
          />
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '3rem',
              marginRight: '2rem'
            }}
          >
            Tổng:{' '}
            <Typography
              sx={{
                marginLeft: '0.875rem',
                color: 'red'
              }}
              variant="h5"
            >
              900.000
            </Typography>
            <Typography sx={{ color: 'red' }}>đ</Typography>
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginTop: '1rem' }}
            justifyContent={'flex-end'}
          >
            <Button
              sx={{
                backgroundColor: '#F2C2CF80'
              }}
              variant="contained"
              type="button"
            >
              Tiếp tục mua sắm
            </Button>
            <Button
              sx={{
                backgroundColor: '#F2C2CF80'
              }}
              variant="contained"
              type="button"
            >
              Thanh toán
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction={'column'}
          sx={{ height: '200px' }}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
        >
          <Typography
            sx={{ textAlign: 'center', marginTop: '2rem' }}
            variant="h5"
          >
            Không có sản phẩm nào trong giỏ hàng!
          </Typography>
          <Button
            sx={{
              backgroundColor: '#F2C2CF80'
            }}
            variant="contained"
            type="button"
          >
            Tiếp tục mua sắm
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default CartPage
