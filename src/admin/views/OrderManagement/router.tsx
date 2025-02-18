import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerOrderManagement: IRouter = {
  path: '/admin/order-management',
  loader: React.lazy(() => import('./OrderManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
