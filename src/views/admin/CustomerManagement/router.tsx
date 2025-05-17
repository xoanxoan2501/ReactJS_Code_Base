import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerCustomerManagement: IRouter = {
  path: '/admin/customer-management',
  loader: React.lazy(() => import('./CustomerManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerAddCustomer: IRouter = {
  path: '/admin/customer-management/add',
  loader: React.lazy(() => import('./FormCustom')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerEditCustomer: IRouter = {
  path: '/admin/customer-management/edit',
  loader: React.lazy(() => import('./FormCustom')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true,
  generatePath: (id: string) => `/admin/customer-management/edit/${id}`
}
