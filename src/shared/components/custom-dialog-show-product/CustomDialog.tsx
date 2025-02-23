import CartProductDetail from '@/views/Auth/component/CartProductDetail/CartProductDetail'
import { Dialog, DialogContent } from '@mui/material'

interface CustomDialogShowProductProps {
  open: boolean
  onClose: () => void
}

export default function CustomDialogShowProduct({ open, onClose }: CustomDialogShowProductProps) {
  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth='lg'>
        <DialogContent>
          <CartProductDetail />
        </DialogContent>
      </Dialog>
    </div>
  )
}
