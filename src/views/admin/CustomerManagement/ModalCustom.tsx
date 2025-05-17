import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closeModal, InitialStateProps } from '@/apis/product-management-redux'
import { memo, useCallback } from 'react'
import { useDeleteProduct } from '@/apis/product/use-delete-product'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { productKeys } from '@/apis/product/api'

interface ProductManagementState {
  productManagement: InitialStateProps
}

const ModalCustom = () => {
  const dispatch = useDispatch()
  const isModalOpening = useSelector((state: ProductManagementState) => state.productManagement.isModalOpening)
  const content = useSelector((state: ProductManagementState) => state.productManagement.content)
  const { mutateAsync: deleteProduct } = useDeleteProduct()
  const queryClient = useQueryClient()

  const handleDeleteProduct = useCallback(() => {
    deleteProduct(content.id)
      .then(() => {
        toast.success('Xoá khách hàng thành công')
        queryClient.invalidateQueries({ queryKey: productKeys.all })

        dispatch(closeModal())
      })
      .catch((error) => {
        toast.error('Xoá khách hàng thất bại' + error.message)
      })
  }, [content.id, deleteProduct, dispatch, queryClient])

  return (
    <Modal
      open={isModalOpening}
      onClose={() => dispatch(closeModal())}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          '&:focus-visible': { outline: 'none' },
          borderRadius: 2
        }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2' textAlign={'center'}>
          Bạn có muốn chắc chắn xoá khách hàng này ?
          <br></br>
          <Typography variant='h6' component='span' color='error'>
            {content.name}
          </Typography>
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2} mt={4}>
          <Button variant='contained' onClick={() => dispatch(closeModal())} sx={{ backgroundColor: '#1AFB9A' }}>
            Hủy
          </Button>
          <Button variant='contained' sx={{ backgroundColor: '#FF0707' }} onClick={() => handleDeleteProduct()}>
            Xoá
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default memo(ModalCustom)
