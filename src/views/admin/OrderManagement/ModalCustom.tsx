import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { orderKeys } from '@/apis/order/api'
import { Modal as ModalCustomProps } from './FormOrder'
import { useUpdateOrderStatus } from '@/apis/order-management-redux/use-update-order-status'
import { useSearchParams } from 'react-router-dom'

const ModalCustom = ({
  modal,
  setModal
}: {
  modal: ModalCustomProps
  setModal: Dispatch<SetStateAction<ModalCustomProps>>
}) => {
  const { mutateAsync: updateOrderStatus } = useUpdateOrderStatus()
  const queryClient = useQueryClient()

  const handleUpdateOrderStatus = useCallback(() => {
    updateOrderStatus({
      orderId: modal.content.orderId,
      newStatus: modal.content.nextStatusCode
    })
      .then(() => {
        toast.success('Cập nhật trạng thái thành công')
        queryClient.invalidateQueries()

        setModal({
          ...modal,
          isModalOpening: false
        })
      })
      .catch((error) => {
        toast.error('Cập nhật trạng thái thất bại: ' + error.message)
      })
  }, [updateOrderStatus, modal, queryClient, setModal])

  return (
    <Modal
      open={modal.isModalOpening}
      onClose={() => setModal({ ...modal, isModalOpening: false })}
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
          Bạn có muốn chắc chắn muốn chuyển đổi trạng thái của đơn hàng này sang
          <br></br>
          <Typography variant='h6' component='span' color='error'>
            {modal.content.nextStatusText}
          </Typography>
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2} mt={4}>
          <Button
            variant='contained'
            onClick={() =>
              setModal({
                ...modal,
                isModalOpening: false
              })
            }
            sx={{ backgroundColor: '#1AFB9A' }}
          >
            Huỷ
          </Button>
          <Button variant='contained' sx={{ backgroundColor: '#FF0707' }} onClick={() => handleUpdateOrderStatus()}>
            Chuyển đổi
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default memo(ModalCustom)
