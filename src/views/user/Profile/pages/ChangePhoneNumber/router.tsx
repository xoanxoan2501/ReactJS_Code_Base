import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerChangePhoneNumber: IRouter = {
  path: '/change-phone-number',
  loader: React.lazy(() => import('./ChangePhoneNumber')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
