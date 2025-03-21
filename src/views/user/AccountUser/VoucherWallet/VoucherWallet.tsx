import { Box } from '@mui/system'
import { LayoutBox } from '../../Profile/components/LayoutBox'
import { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getVouchersAPI } from '@/apis/voucher/api'

function VoucherWallet() {
  const [expanded, setExpanded] = useState<number | null>(null)

  console.log('Expanded:', expanded)

  const {
    data: vouchers = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['vouchers'],
    queryFn: getVouchersAPI
  })

  if (isLoading) return <Typography>Đang tải...</Typography>
  if (error) return <Typography>Lỗi khi tải dữ liệu</Typography>

  console.log('Vouchers:', vouchers)

  return (
    <LayoutBox>
      <h3> Ví voucher </h3>
      <Box>
        {vouchers.length === 0 ? (
          <Typography
            sx={{
              fontSize: '20px !important',
              fontWeight: 'bold',
              textAlign: 'center',
              mt: 2,
              alignContent: 'center',
              justifyContent: 'center'
            }}
          >
            Bạn không có voucher nào khả dụng
          </Typography>
        ) : (
          vouchers.map((voucher: any) => (
            <Box
              key={voucher._id}
              sx={{
                p: 2,
                mb: 2,
                background: '#ffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ flex: 1 }}>
                {expanded === voucher._id ? (
                  <div>
                    <Typography sx={{ fontWeight: 'bold', color: '#DC567A', fontSize: '30px !important' }}>
                      Mã voucher: {voucher.code}
                    </Typography>
                    <Typography sx={{ fontSize: '20px !important', ml: 2 }}>
                      <strong>Hạn sử dụng:</strong> {new Date(voucher.expirationDate).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography sx={{ fontSize: '20px !important', ml: 2 }}>
                      <strong>Ưu đãi:</strong> <br />
                      Giảm {voucher.discountValue}đ cho đơn hàng từ {voucher.minOrderValue / 1000}k, tối đa{' '}
                      {voucher.maxDiscount / 1000}k.
                    </Typography>
                    <Typography sx={{ fontSize: '20px !important', ml: 2 }}>
                      <strong>Áp dụng cho:</strong> Toàn bộ sản phẩm
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '30px !important' }}>
                      Giảm {voucher.discountValue}đ
                    </Typography>
                    <Typography sx={{ fontSize: '20px !important', ml: 2 }}>
                      Đơn hàng từ {voucher.minOrderValue / 1000}k
                    </Typography>
                    <Typography sx={{ fontSize: '20px !important', color: '#DC567A', ml: 2 }}>
                      Mã voucher: {voucher.code}
                    </Typography>
                    <Typography sx={{ fontSize: '20px !important', ml: 2 }}>
                      Hạn sử dụng: {new Date(voucher.expirationDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </div>
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  minWidth: '150px',
                  minHeight: '120px',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px !important',
                    cursor: 'pointer',
                    '&:hover': { color: '#DC567A' }
                  }}
                  onClick={() => setExpanded(expanded === voucher._id ? null : voucher._id)}
                >
                  {expanded === voucher._id ? 'Thu gọn' : 'Chi tiết'}
                </Typography>
                <Button
                  sx={{
                    backgroundColor: '#F2C2CF',
                    color: 'rgb(12, 12, 12)',
                    border: '2px solid #f2c2cf',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    width: '120px',
                    height: '50px',
                    fontSize: '20px !important',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgb(255, 255, 255)',
                      color: '#000'
                    }
                  }}
                >
                  Sử dụng
                </Button>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </LayoutBox>
  )
}

export default VoucherWallet
