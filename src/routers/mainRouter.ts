import { routerHome } from '@/views/home/router'
import { IRouter } from './interface'
import { routerMainPublicPage } from '@/views/Auth/router'
import { routerLogin } from '@/views/Auth/pages/Login/router'
import { routerRegister } from '@/views/Auth/pages/Register/router'
import { routerPageError } from '@/views/error/router'
import { routerProduct } from '@/views/Auth/pages/Product/router'
import { routerForgotPassword } from '@/views/Auth/pages/ForgotPassword/router'
import { routerResetPassword } from '@/views/Auth/pages/ResetPassword/router'
import { routerCart } from '@/views/cart/router'
import { routerListProduct } from '@/views/ListProduct/router'
import { routerAccountInfo } from '@/views/Profile/router'
import { routerChangePhoneNumber } from '@/views/Profile/pages/ChangePhoneNumber/router'
import { routerChangePassword } from '@/views/Profile/pages/ChangePassword/router'
import { routerAddProduct, routerProductManagement, routerEditProduct } from '@/admin/views/ProductManagement/router'
import { routerAdminDashboard } from '@/admin/views/Dashboard.tsx/router'
import { routerCategoryManagement } from '@/admin/views/CategoryManagement/router'
import { routerOrderManagement } from '@/admin/views/OrderManagement/router'
import { routerVoucherManagement } from '@/admin/views/VoucherManagement/router'
import { routerCustomerManagement } from '@/admin/views/CustomerManagement/router'
import { routerProductDetail } from '@/views/Auth/pages/ProductDetails/router'
import { routerAdminLogin } from '@/admin/views/login/router'
import { routerAdmin } from '@/admin/views/router'
import { routerOrderPage } from '@/views/orderPage/router'
import { routerAddress } from '@/views/AccountUser/Address/router'
import { routerPurchase } from '@/views/AccountUser/purchase/router'
import { routerVoucherWallet } from '@/views/AccountUser/VoucherWallet/router'
import { routerNotifications } from '@/views/AccountUser/Notifications/router'
import { routerPaymentUser } from '@/views/AccountUser/PaymentUser/router'
import { routerDetailPurchase } from '@/views/AccountUser/purchase/page/router'
import { routerCreateAddress, routerEditAddress } from '@/views/AccountUser/Address/Edit/router'

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
