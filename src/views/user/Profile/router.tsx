import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerAccountInfo: IRouter = {
  path: '/account-info',
  loader: React.lazy(() => import('./pages/AccountInfo/AccountInfo')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
