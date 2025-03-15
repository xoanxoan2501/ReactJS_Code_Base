import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerOrderManagement: IRouter = {
  path: '/admin/order-management',
  loader: React.lazy(() => import('./OrderManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerEditOrder: IRouter = {
  path: '/admin/order-management/edit',
  loader: React.lazy(() => import('./FormOrder')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true,
  generatePath: (id: string) => `/admin/order-management/edit/${id}`
}
