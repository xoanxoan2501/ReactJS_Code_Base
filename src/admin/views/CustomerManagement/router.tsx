import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerCustomerManagement: IRouter = {
  path: '/admin/customer-management',
  loader: React.lazy(() => import('./CustomerManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
