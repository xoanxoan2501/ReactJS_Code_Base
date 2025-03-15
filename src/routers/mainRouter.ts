// userRouter
import { routerHome } from '@/views/user/home/router'
import { IRouter } from './interface'
import { routerMainPublicPage } from '@/views/user/Auth/router'
import { routerLogin } from '@/views/user/Auth/pages/Login/router'
import { routerRegister } from '@/views/user/Auth/pages/Register/router'
import { routerPageError } from '@/views/user/error/router'
import { routerProduct } from '@/views/user/Auth/pages/Product/router'
import { routerForgotPassword } from '@/views/user/Auth/pages/ForgotPassword/router'
import { routerResetPassword } from '@/views/user/Auth/pages/ResetPassword/router'
import { routerCart } from '@/views/user/cart/router'
import { routerListProduct } from '@/views/user/ListProduct/router'
import { routerAccountInfo } from '@/views/user/Profile/router'
import { routerChangePhoneNumber } from '@/views/user/Profile/pages/ChangePhoneNumber/router'
import { routerChangePassword } from '@/views/user/Profile/pages/ChangePassword/router'
import { routerProductDetail } from '@/views/user/Auth/pages/ProductDetails/router'
import { routerAddress } from '@/views/user/AccountUser/Address/router'
import { routerPurchase } from '@/views/user/AccountUser/purchase/router'
import { routerVoucherWallet } from '@/views/user/AccountUser/VoucherWallet/router'
import { routerNotifications } from '@/views/user/AccountUser/Notifications/router'
import { routerPaymentUser } from '@/views/user/AccountUser/PaymentUser/router'
import { routerDetailPurchase } from '@/views/user/AccountUser/purchase/page/router'
import { routerCreateAddress, routerEditAddress } from '@/views/user/AccountUser/Address/Edit/router'
import { routerOrderPage } from '@/views/user/orderPage/router'

// AdminRouter
import { routerAddProduct, routerProductManagement, routerEditProduct } from '@/views/admin/ProductManagement/router'
import { routerAdminDashboard } from '@/views/admin/Dashboard.tsx/router'
import { routerCategoryManagement } from '@/views/admin/CategoryManagement/router'
import { routerOrderManagement } from '@/views/admin/OrderManagement/router'
import { routerVoucherManagement } from '@/views/admin/VoucherManagement/router'
import { routerCustomerManagement } from '@/views/admin/CustomerManagement/router'
import { routerAdminLogin } from '@/views/admin/login/router'
import { routerAdmin } from '@/views/admin/router'

const privatePage: IRouter[] = [
  routerCart,
  routerAccountInfo,
  routerChangePhoneNumber,
  routerChangePassword,
  routerProductManagement,
  routerAddProduct,
  routerEditProduct,
  routerAdminDashboard,
  routerCategoryManagement,
  routerOrderManagement,
  routerVoucherManagement,
  routerCustomerManagement,
  routerAdmin,
  routerOrderPage,
  routerAddress,
  routerPurchase,
  routerVoucherWallet,
  routerNotifications,
  routerPaymentUser,
  routerDetailPurchase,
  routerEditAddress,
  routerCreateAddress
]

const publicPage: IRouter[] = [
  routerLogin,
  routerRegister,
  routerProduct,
  routerForgotPassword,
  routerResetPassword,
  routerAdminLogin
]

const middlePage: IRouter[] = [routerListProduct, routerMainPublicPage, routerHome, routerProductDetail]

privatePage.push(...middlePage, routerPageError)
publicPage.push(...middlePage, routerPageError)

export { privatePage, publicPage, middlePage }
