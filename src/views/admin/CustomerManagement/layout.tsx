import { routerAddProduct, routerProductManagement } from '@/views/admin/ProductManagement/router'
import { Typography, Breadcrumbs, Link, Stack } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const CustomerManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAddProductPage = location.pathname.includes(routerAddProduct.path)

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
          <Link underline='hover' color='inherit' onClick={() => navigate(routerProductManagement.path)}>
            Danh sách khách hàng
          </Link>

          {/* <Typography color='text.primary'>{isAddProductPage ? 'Tạo mới' : 'Thông tin'} sản phẩm</Typography> */}
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

export default CustomerManagementLayout
