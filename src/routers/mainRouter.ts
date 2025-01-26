import { routerHome } from '@/views/home/router'
import { IRouter } from './interface'
import { routerMainPublicPage } from '@/views/Auth/router'
import { routerLogin } from '@/views/Auth/components/Login/router'
import { routerRegister } from '@/views/Auth/components/Register/router'
import { routerPageError } from '@/views/error/router'

const privatePage: IRouter[] = [routerPageError]

const publicPage: IRouter[] = [
  routerMainPublicPage,
  routerLogin,
  routerRegister,
  routerHome
]

privatePage.push(routerPageError)
publicPage.push(routerPageError)

export { privatePage, publicPage }
