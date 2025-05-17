import imageLogo from '@/assets/icons/imageLogo.png'
import { Stack, Typography } from '@mui/material'
import imageCategory from '@/assets/images/SideBarAdmin/imageCategory.png'
import imageCustomer from '@/assets/images/SideBarAdmin/imageCustomer.png'
import imageDashboard from '@/assets/images/SideBarAdmin/imageDashboard.png'
import imageOrder from '@/assets/images/SideBarAdmin/imageOrder.png'
import imageProduct from '@/assets/images/SideBarAdmin/imageProduct.png'
import imageThongKe from '@/assets/images/SideBarAdmin/imageThongKe.png'
import imageVoucher from '@/assets/images/SideBarAdmin/imageVoucher.png'
import { matchPath, useLocation, useNavigate, useParams } from 'react-router-dom'
import { routerAdminDashboard } from '@/views/admin/Dashboard.tsx/router'
import { routerCustomerManagement } from '@/views/admin/CustomerManagement/router'
import { routerOrderManagement } from '@/views/admin/OrderManagement/router'
import { routerAddProduct, routerEditProduct, routerProductManagement } from '@/views/admin/ProductManagement/router'
import { routerCategoryManagement } from '@/views/admin/CategoryManagement/router'
import { routerVoucherManagement } from '@/views/admin/VoucherManagement/router'
import { routerHome } from '@/views/user/home/router'
import { useRef } from 'react'

const AdminSideBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { productId } = useParams()


  const navTabs = useRef<
    Array<{
      title: string
      icon: string
      path?: Array<string>
    }>
  >([
    {
      title: 'Dashboard',
      icon: imageDashboard,
      path: [routerAdminDashboard.path]
    },
    {
      title: 'Khách hàng',
      icon: imageCustomer,
      path: [routerCustomerManagement.path]
    },
    {
      title: 'Đơn hàng',
      icon: imageOrder,
      path: [routerOrderManagement.path]
    },
    {
      title: 'Sản phẩm',
      icon: imageProduct,
      path: [
        routerProductManagement.path,
        routerAddProduct.path,
        routerEditProduct.generatePath ? routerEditProduct.generatePath(productId) : ''
      ]
    },
    {
      title: 'Danh mục',
      icon: imageCategory,
      path: [routerCategoryManagement.path]
    },
    {
      title: 'Voucher',
      icon: imageVoucher,
      path: [routerVoucherManagement.path]
    },
    {
      title: 'Thống kê',
      icon: imageThongKe
    }
  ])

  const renderNavTabs = () => {
    return navTabs.current?.map((tab, index) => {
      return (
        <Stack
          sx={{
            '&:hover': {
              backgroundColor: '#7CCCF8',
              cursor: 'pointer'
            },
            padding: '10px',
            backgroundColor: tab.path?.some((path) => matchPath(pathname, path)) ? '#7CCCF8' : 'transparent'
          }}
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          key={index}
          onClick={() => {
            if (tab.path) {
              navigate(tab.path[0])
            }
          }}
        >
          <img
            src={tab.icon}
            alt='logo'
            className='icon_hover'
            style={{
              width: '50px',
              height: '50px'
            }}
          />
          <Typography sx={{ color: 'white' }} variant='h6'>
            {tab.title}
          </Typography>
        </Stack>
      )
    })
  }

  return (
    <Stack
      direction={'column'}
      sx={{
        backgroundColor: '#086191',
        minHeight: '100vh',
        position: 'sticky',
        top: 0
      }}
      spacing={3}
    >
      <Stack
        sx={{
          paddingLeft: '10px',
          paddingTop: '10px'
        }}
        direction={'row'}
        spacing={2}
        alignItems={'center'}
      >
        <img
          src={imageLogo}
          alt='logo'
          className='icon_hover'
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%'
          }}
          onClick={() => navigate(routerHome.path)}
        />
        <Typography sx={{ color: 'white' }} variant='h5'>
          Napun Bakary
        </Typography>
      </Stack>
      <Stack direction={'column'}>{renderNavTabs()}</Stack>
    </Stack>
  )
}

export default AdminSideBar
