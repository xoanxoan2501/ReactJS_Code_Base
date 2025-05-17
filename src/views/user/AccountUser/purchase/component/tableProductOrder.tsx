import { OrderDetail } from '@/apis/order'
import { IProduct } from '@/apis/product'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material'

function TableProductOrder({
  products,
  shippingFee = 0,
  totalPrice = 0
}: {
  products: OrderDetail[]
  shippingFee?: number
  totalPrice?: number
}) {
  // Danh sách sản phẩm

  const subtotal = products.reduce((total, product) => total + product.total, 0)
  const discount = 0

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'auto' }}>
        <TableContainer component={Paper} className='order-table'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Sản phẩm</strong>
                </TableCell>
                <TableCell>
                  <strong>Size</strong>
                </TableCell>
                <TableCell>
                  <strong>Đơn giá</strong>
                </TableCell>
                <TableCell>
                  <strong>Số lượng</strong>
                </TableCell>
                <TableCell>
                  <strong>Thành tiền</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product?.productId}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={'/img/banh_mau_hong.jpg'}
                        alt='Product'
                        style={{ width: 50, height: 50, borderRadius: '5px', marginRight: 10 }}
                      />
                      {product?.title}
                    </div>
                  </TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.price.toLocaleString('vi-VN')} đ</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.total.toLocaleString('vi-VN')} đ</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          marginTop: 2,
          textAlign: 'right',
          padding: 2,
          borderTop: '2px solid #DC567A',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography sx={{ fontSize: '20px !important' }}>Tạm tính:</Typography>
          <strong>{subtotal.toLocaleString('vi-VN')} đ</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography sx={{ fontSize: '20px !important' }}>Phí vận chuyển:</Typography>
          <strong>{shippingFee.toLocaleString('vi-VN')} đ</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography sx={{ fontSize: '20px !important' }}>Mã giảm giá:</Typography>
          <strong>{discount.toLocaleString('vi-VN')} đ</strong>
        </div>
        <div style={{ borderTop: ' 2px solid #DC567A  ' }}>
          <Typography variant='h6' sx={{ color: '#DC567A', fontWeight: 'bold', marginTop: 1 }}>
            Tổng cộng: {totalPrice.toLocaleString('vi-VN')} đ
          </Typography>
        </div>
      </Box>
    </Box>
  )
}

export default TableProductOrder
