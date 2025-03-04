import './Header.scss'
import imageLogo from '@/assets/icons/imageLogo.png'
import searchIcon from '@/assets/icons/searchIcon.png'
import cartIcon from '@/assets/icons/cartIcon.png'
import phoneIcon from '@/assets/icons/phoneIcon.png'
import UserAvatar from '@/layout/header/userAvatar/UserAvatar'
import CakeMenu from '@/layout/header/menu/CakeMenu'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { Button, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routerLogin } from '@/views/Auth/pages/Login/router'
import { routerHome } from '@/views/home/router'
import { routerCart } from '@/views/cart/router'
import { toast } from 'react-toastify'
import { routerListProduct } from '@/views/ListProduct/router'

const cakeCategories: Array<{
  title: string
  isMenu: boolean
  route?: string
}> = [
  { title: 'Trang chủ', isMenu: false, route: routerHome.path },
  { title: 'Menu bánh', isMenu: true },
  {
    title: 'Danh mục sản phẩm',
    isMenu: false,
    route: routerListProduct.path
  },
  { title: 'Giới thiệu', isMenu: false },
  { title: 'Liên hệ', isMenu: false }
]

export const CustomButton = styled(Button)({
  borderColor: '#dc567a',
  color: '#dc567a'
})

const Header = () => {
  const { accessToken, user } = useAppSelector((state) => state.profile)
  const navigate = useNavigate()

  const renderMenu = () => {
    return cakeCategories.map((category, index) => {
      return <CakeMenu route={category?.route} isMenu={category.isMenu} key={index} title={category.title} />
    })
  }

  return (
    <header className='header'>
      <div className='container'>
        <div className='header_top_box'>
          <div className='header_top container'>
            <div className='header_top_right'>
              <img
                src={imageLogo}
                alt='logo'
                className='header_logo icon_hover'
                onClick={() => navigate(routerHome.path)}
              />
              <img src={searchIcon} alt='search' className='header_search_icon icon_hover' />
            </div>
            <div className='header_top_left'>
              <div
                onClick={() => {
                  if (accessToken && user) {
                    navigate(routerCart.path)
                  } else {
                    toast.error('Vui lòng đăng nhập để xem giỏ hàng')
                  }
                }}
                className='header_top_left_first'
              >
                <img src={cartIcon} alt='cart' className='icon_hover' />
              </div>
              <div className='header_top_left_second'>
                <img src={phoneIcon} alt='phone' className='icon_hover' />
                <div className='header_top_left_second_content'>
                  <span>0949825991</span>
                </div>
              </div>
              <div className='header_top_left_third'>
                {accessToken && user ? (
                  <>
                    <UserAvatar />
                    <div className='header_top_left_third_content'>
                      <span>Tài khoản</span>
                    </div>
                  </>
                ) : (
                  <CustomButton variant='outlined' onClick={() => navigate(routerLogin.path)}>
                    Login
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='header_bottom'>{renderMenu()}</div>
      </div>
    </header>
  )
}

export default Header
