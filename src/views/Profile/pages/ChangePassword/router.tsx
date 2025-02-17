import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerChangePassword: IRouter = {
  path: '/change-password',
  loader: React.lazy(() => import('./ChangePassword')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
