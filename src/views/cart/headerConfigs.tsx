import { Stack, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import iconDecreaseCart from '@/assets/icons/iconDecreaseCart.png'
import iconIncreaseCart from '@/assets/icons/iconIncreaseCart.png'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { getCartAPI, updateProductQuantity } from '@/apis/cart'
import { deleteCartItemApi } from '@/apis/cart/api'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/shared/hook/useDebounce'
export const RenderProductImage = (params: GridRenderCellParams) => {
  const navigate = useNavigate()

  return (
    <Stack
      onClick={(event) => {
        event.stopPropagation()
        navigate(`/product/${params?.row?.productId}`)
      }}
      sx={{
        height: '100%',
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      direction='row'
      spacing={2}
      alignItems='center'
    >
      <img
        src={params.value?.thumbnail as string}
        alt='product'
        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 5 }}
      />
      <Typography variant='subtitle1'>{params.value?.title}</Typography>
    </Stack>
  )
}

const ActionIcon = ({
  icon,
  title,
  actionKey,
  onClick
}: {
  icon: string
  title: string
  actionKey: string
  onClick: () => void
}) => {
  return (
    <img
      src={icon}
      alt={title}
      style={{ width: 24, height: 24, cursor: 'pointer' }}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
    />
  )
}

export const RenderAction = (params: GridRenderCellParams) => {
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })

    if (result.isConfirmed) {
      try {
        await deleteCartItemApi(params.row.productId, params.row.size) // Gọi API xóa
        dispatch(getCartAPI()) // Cập nhật lại giỏ hàng
        Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa khỏi giỏ hàng.', 'success')
      } catch (error) {
        Swal.fire('Lỗi!', 'Xóa sản phẩm thất bại. Vui lòng thử lại!', 'error')
        console.error('Failed to delete cart item:', error)
      }
    }
  }

  return (
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center' justifyContent='center'>
      {params.value?.map((action: { title: string; icon: string; key: string }) => (
        <ActionIcon
          key={action.key}
          icon={action.icon}
          title={action.title}
          actionKey={action.title}
          onClick={handleDelete}
        />
      ))}
    </Stack>
  )
}

export const RenderQuantity = (params: GridRenderCellParams) => {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(params.value)
  const debouncedQuantity = useDebounce(quantity, 300)

  useEffect(() => {
    if (debouncedQuantity === params.value) return
    if (debouncedQuantity < 1) return

    dispatch(
      updateProductQuantity({
        productId: params.row.productId,
        quantity: debouncedQuantity,
        size: params.row.size
      })
    )
  }, [debouncedQuantity, dispatch, params.row, params.value])

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  return (
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center' justifyContent='center'>
      <img
        src={iconDecreaseCart}
        alt='decrease'
        style={{ width: 16, height: 16, cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation()
          handleUpdateQuantity(quantity - 1)
        }}
      />
      <Typography variant='subtitle1'>{quantity}</Typography>
      <img
        src={iconIncreaseCart}
        alt='increase'
        style={{ width: 16, height: 16, cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation()
          handleUpdateQuantity(quantity + 1)
        }}
      />
    </Stack>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'product',
    headerName: 'Sản phẩm',
    flex: 2,
    sortable: false,
    renderCell: RenderProductImage,
    align: 'left',
    headerAlign: 'left'
  },
  {
    field: 'size',
    headerName: 'Kích cỡ',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'price',
    headerName: 'Giá (VNĐ)',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: RenderQuantity
  },
  {
    field: 'total',
    headerName: 'Tổng tiền (VNĐ)',
    type: 'number',
    flex: 1,
    valueGetter: (_value, row) => row.price * row.quantity,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    sortable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: RenderAction
  }
]

export const sxConfig = {
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#F2C2CF80',
    color: 'black',
    fontWeight: 'bold'
  }
}
