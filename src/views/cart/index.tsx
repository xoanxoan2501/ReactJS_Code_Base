import { headerConfigs } from '@/views/cart/headerConfigs'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import iconDelete from '@/assets/icons/iconDelete.png'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { getCartAPI, handleRowSelectionChange, resetSelecdCartItem } from '@/apis/cart'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { formatNumber } from '@/utils/formatter'
import { toast } from 'react-toastify'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import { useNavigate } from 'react-router-dom'
interface ICartItemDisplay {
  _id: string
  product: {
    title: string
    thumbnail: string
  }
  productId: string
  size: string
  price: number
  quantity: number
  action?: { title: string; icon: string; key: string }[]
}

const CartPage = () => {
  const dispatch = useAppDispatch()
  const { cart, cartId, totalPayment, selectedCartItems } = useAppSelector((state) => state.cart)

  console.log('cart', cart)

  const navigate = useNavigate()

  const convertData = (): ICartItemDisplay[] => {
    return cart.map((item) => {
      return {
        _id: `${item.productId}-${item.size}`,
        productId: item.productId,
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
  }, [dispatch])

  useEffect(() => {
    dispatch(getCartAPI())
  }, [dispatch])

  const handleRowSelectionModelChange = (selection: GridRowSelectionModel) => {
    const selectedItems = selection.map((id) => {
      const [productId, size] = id.toString().split('-')
      return { productId, size }
    })
    dispatch(handleRowSelectionChange(selectedItems))
  }

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      toast('Vui lòng chọn ít nhất một sản phẩm!')
      return
    }

    navigate('/order-page', { state: { selectedCartItems } })
  }

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
          <DataGridTable
            columns={headerConfigs}
            rows={convertData()}
            checkBoxColor='#F2C2CF'
            checkBoxBorderWidth='2px'
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f5f5f5'
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#F2C2CF80 !important',
                borderBottom: '1px   solid #ccc'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold'
              }
            }}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            getRowId={(row) => row._id}
            getRowHeight={() => 70}
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
