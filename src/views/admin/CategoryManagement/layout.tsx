import { Typography, Breadcrumbs, Link, Stack } from '@mui/material'

import { useNavigate, useLocation } from 'react-router-dom'
import { routerCategoryManagement } from './router'

const CategoryManagementLayout = ({ children }: { children: React.ReactNode }) => {
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
          <Link underline='hover' color='inherit' onClick={() => navigate(routerCategoryManagement.path)}>
            Danh sách danh mục sản phẩm
          </Link>
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

export default CategoryManagementLayout
