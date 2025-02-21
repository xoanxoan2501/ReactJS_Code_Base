import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closeModal } from '@/apis/productManagement'

interface ProductManagementState {
  productManagement: { isModalOpening: boolean; content: string }
}

const ModalCustom = () => {
  const dispatch = useDispatch()
  const isModalOpening = useSelector((state: ProductManagementState) => state.productManagement.isModalOpening)
  const content = useSelector((state: ProductManagementState) => state.productManagement.content)
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
          Bạn có muốn chắc chắn xoá sản phẩm
          <br></br>
          <Typography variant='h6' component='span' color='error'>
            {content}
          </Typography>
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2} mt={4}>
          <Button variant='contained' onClick={() => dispatch(closeModal())} sx={{ backgroundColor: '#1AFB9A' }}>
            Hủy
          </Button>
          <Button variant='contained' sx={{ backgroundColor: '#FF0707' }}>
            Xoá
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ModalCustom
