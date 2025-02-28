import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material'

function TableProductOrder() {
  // Danh sách sản phẩm
  const products = [
    {
      id: 1,
      name: 'Mousse green tea',
      size: '15 cm',
      quantity: 1,
      price: 250000,
      image: '/img/banh_mau_hong.jpg'
    },
    {
      id: 2,
      name: 'Chocolate cake',
      size: '20 cm',
      quantity: 1,
      price: 300000,
      image: '/img/banh3.jpg'
    },
    {
      id: 3,
      name: 'Chocolate cake',
      size: '20 cm',
      quantity: 1,
      price: 300000,
      image: '/img/banh3.jpg'
    }
  ]

  const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0)
  const shippingFee = 0
  const discount = 10000
  const total = subtotal - discount

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box sx={{ width: '100%', maxHeight: '210px', overflowY: 'auto' }}>
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
                  <strong>Số lượng</strong>
                </TableCell>
                <TableCell>
                  <strong>Thành tiền</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={product.image}
                        alt='Product'
                        style={{ width: 50, height: 50, borderRadius: '5px', marginRight: 10 }}
                      />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{(product.price * product.quantity).toLocaleString('vi-VN')} đ</TableCell>
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
            Tổng cộng: {total.toLocaleString('vi-VN')} đ
          </Typography>
        </div>
      </Box>
    </Box>
  )
}

export default TableProductOrder
