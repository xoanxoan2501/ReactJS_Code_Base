import { Typography, Breadcrumbs, Link, Stack } from '@mui/material'
import { routerOrderManagement } from './router'
import { useNavigate, useLocation } from 'react-router-dom'

const ProductManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
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
          <Link underline='hover' color='inherit' onClick={() => navigate(routerOrderManagement.path)}>
            Danh sách đơn hàng
          </Link>

          {/* {(isAddProductPage || isEditProductPage) && (
            <Typography color='text.primary'>
              {isAddProductPage ? 'Tạo mới sản phẩm' : isEditProductPage ? 'Thông tin sản phẩm' : null}
            </Typography>
          )} */}
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

export default ProductManagementLayout
