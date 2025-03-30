import { Typography, Breadcrumbs, Link, Stack } from '@mui/material'
import { routerAddVoucher, routerEditVoucher, routerVoucherManagement } from './router'
import { useNavigate, useLocation } from 'react-router-dom'

const VoucherManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAddVoucherPage = location.pathname.includes(routerAddVoucher.path)
  const isEditVoucherPage = location.pathname.includes(routerEditVoucher.path)

  return (
    <Stack direction={'column'} spacing={3} sx={{ padding: '20px 24px' }}>
      <Stack
        sx={{
          height: '45px',
          backgroundColor: '#08619140',
          borderLeft: '5px solid #086191',
          padding: '0 10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)'
        }}
        direction={'row'}
        alignItems={'center'}
      >
        <Breadcrumbs separator='>'>
          <Link underline='hover' color='inherit' onClick={() => navigate(routerVoucherManagement.path)}>
            Danh sách mã giảm giá
          </Link>

          {(isAddVoucherPage || isEditVoucherPage) && (
            <Typography color='text.primary'>
              {isAddVoucherPage ? 'Tạo mới voucher' : isEditVoucherPage ? 'Thông tin voucher' : null}
            </Typography>
          )}
        </Breadcrumbs>
      </Stack>
      <Stack
        direction={'column'}
        spacing={2}
        sx={{
          backgroundColor: '#7CCCF840',
          borderRadius: '10px',
          height: '800px',
          padding: '10px 20px'
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default VoucherManagementLayout
