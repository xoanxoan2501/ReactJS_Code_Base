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
import { routerListProduct } from '@/views/Auth/pages/ListProduct/router'

const privatePage: IRouter[] = [routerCart]

const publicPage: IRouter[] = [
  routerMainPublicPage,
  routerLogin,
  routerRegister,
  routerPageError,
  routerProduct,
  routerForgotPassword,
  routerResetPassword,
  routerListProduct,
]

const middlepage = [routerHome]

privatePage.push(...middlepage, routerPageError)
publicPage.push(...middlepage, routerPageError)

export { privatePage, publicPage, middlepage }
