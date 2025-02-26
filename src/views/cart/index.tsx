import DataTable from '@/shared/components/data-table'
import { headerConfigs, sxConfig } from '@/views/cart/headerConfigs'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import iconDelete from '@/assets/icons/iconDelete.png'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { getCartAPI, handleRowSelectionChange, resetSelecdCartItem, setCart } from '@/apis/cart'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { formatNumber } from '@/utils/formatter'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const mockData = {
  _id: 'cart01',
  products: [
    {
      productId: 'product01',
      title: 'Bánh sinh nhật kem sữa',
      size: 'M',
      quantity: 2,
      price: 100000,
      thumbnail: '/img/banh_mau_hong.jpg'
    },
    {
      productId: 'product02',
      size: 'L',
      title: 'Bánh sinh nhật rose gold',
      quantity: 1,
      price: 200000,
      thumbnail: '/img/banh_mau_hong.jpg'
    },
    {
      productId: 'product03',
      title: 'Bánh kem rose mouse',
      size: 'M',
      quantity: 3,
      price: 300000,
      thumbnail: '/img/banh_mau_hong.jpg'
    }
  ]
}

interface ICartItemDisplay {
  _id: string
  product: {
    title: string
    thumbnail: string
  }
  size: string
  price: number
  quantity: number
  action?: { title: string; icon: string; key: string }[]
}

const CartPage = () => {
  const dispatch = useAppDispatch()
  const { cart, cartId, totalPayment, selectedCartItems } = useAppSelector((state) => state.cart)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getCartAPI())
  }, [])

  const convertData = (): ICartItemDisplay[] => {
    return cart.map((item) => {
      return {
        _id: item.productId,
        product: {
          title: item.title,
          thumbnail: item.thumbnail
        },
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        action: [{ title: 'Xóa', icon: iconDelete, key: 'delete' }]
      }
    })
  }
  useEffect(() => {
    dispatch(resetSelecdCartItem())
  }, [])

  const handleRowSelectionModelChange = (selection: GridRowSelectionModel) => {
    dispatch(handleRowSelectionChange(selection))
  }

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      toast('Vui lòng chọn ít nhất một sản phẩm!')
      return
    }

    navigate('/order-page', { state: { selectedCartItems } })
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
        variant='h5'
      >
        Giỏ hàng
      </Typography>
      {cartId && cartId !== '' && cart.length > 0 ? (
        <Stack className='container' sx={{ marginTop: '2rem', padding: '0 3rem' }} direction={'column'}>
          <DataTable
            headerConfigs={headerConfigs}
            data={convertData()}
            sx={sxConfig}
            handleRowSelectionModelChange={handleRowSelectionModelChange}
          />
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '3rem',
              marginRight: '2rem'
            }}
          >
            <Typography
              sx={{
                marginLeft: '0.875rem',
                color: 'red'
              }}
              variant='h5'
            >
              {formatNumber(totalPayment)}
            </Typography>
            <Typography sx={{ color: 'red' }}>đ</Typography>
          </Typography>
          <Stack direction='row' spacing={2} sx={{ marginTop: '1rem' }} justifyContent={'flex-end'}>
            <Button
              sx={{
                backgroundColor: '#F2C2CF80'
              }}
              variant='contained'
              type='button'
            >
              Tiếp tục mua sắm
            </Button>
            <Button
              sx={{
                backgroundColor: '#F2C2CF80'
              }}
              variant='contained'
              type='button'
              onClick={handleCheckout}
            >
              Thanh toán
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack direction={'column'} sx={{ height: '200px' }} justifyContent={'center'} alignItems={'center'} gap={2}>
          <Typography sx={{ textAlign: 'center', marginTop: '2rem' }} variant='h5'>
            Không có sản phẩm nào trong giỏ hàng!
          </Typography>
          <Button
            sx={{
              backgroundColor: '#F2C2CF80'
            }}
            variant='contained'
            type='button'
          >
            Tiếp tục mua sắm
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default CartPage
