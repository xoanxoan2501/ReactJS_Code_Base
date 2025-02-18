import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerProductManagement: IRouter = {
  path: '/admin/product-management',
  loader: React.lazy(() => import('./ProductManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
