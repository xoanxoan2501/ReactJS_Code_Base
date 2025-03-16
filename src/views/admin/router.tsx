import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerAdmin: IRouter = {
  path: '/admin',
  loader: React.lazy(() => import('./Dashboard.tsx/Dashboard')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
