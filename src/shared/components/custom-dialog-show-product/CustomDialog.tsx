import { IProduct, setShowProductDetail } from '@/apis/product'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import CartProductDetail from '@/views/Auth/component/CartProductDetail/CartProductDetail'
import { Dialog, DialogContent } from '@mui/material'

interface CustomDialogShowProductProps {
  open: boolean
  product: IProduct
}

export default function CustomDialogShowProduct({ open, product }: CustomDialogShowProductProps) {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Dialog open={open} onClose={() => dispatch(setShowProductDetail(false))} maxWidth='lg'>
        <DialogContent>
          <CartProductDetail product={product} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
