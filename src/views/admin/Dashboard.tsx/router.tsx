import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerAdminDashboard: IRouter = {
  path: '/admin/dashboard',
  loader: React.lazy(() => import('./Dashboard')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
