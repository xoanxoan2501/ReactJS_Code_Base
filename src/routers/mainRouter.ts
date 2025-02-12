import { routerHome } from '@/views/home/router'
import { IRouter } from './interface'
import { routerMainPublicPage } from '@/views/Auth/router'
import { routerLogin } from '@/views/Auth/pages/Login/router'
import { routerRegister } from '@/views/Auth/pages/Register/router'
import { routerPageError } from '@/views/error/router'
import { routerProduct } from '@/views/Auth/pages/Product/router'
import { routerForgotPassword } from '@/views/Auth/pages/ForgotPassword/router'
import { routerResetPassword } from '@/views/Auth/pages/ResetPassword/router'

const privatePage: IRouter[] = [routerPageError]

const publicPage: IRouter[] = [
  routerMainPublicPage,
  routerLogin,
  routerRegister,
  routerHome,
  routerPageError,
  routerProduct,
  routerForgotPassword,
  routerResetPassword
]

privatePage.push(routerPageError)
publicPage.push(routerPageError)

export { privatePage, publicPage }
