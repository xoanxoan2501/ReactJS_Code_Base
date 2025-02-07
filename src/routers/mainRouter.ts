import { routerHome } from '@/views/home/router'
import { IRouter } from './interface'
import { routerMainPublicPage } from '@/views/Auth/router'
import { routerLogin } from '@/views/Auth/components/Login/router'
import { routerRegister } from '@/views/Auth/components/Register/router'
import { routerPageError } from '@/views/error/router'
import { routerProduct } from '@/views/Auth/components/Product/router'

export const privatePage: IRouter[] = [routerHome, routerPageError]

export const publicPage: IRouter[] = [
  routerMainPublicPage,
  routerLogin,
  routerRegister,
  routerPageError,
  routerProduct,
]
