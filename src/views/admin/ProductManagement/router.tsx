import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerProductManagement: IRouter = {
  path: '/admin/product-management',
  loader: React.lazy(() => import('./ProductManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerAddProduct: IRouter = {
  path: '/admin/product-management/add',
  loader: React.lazy(() => import('./FormProduct')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerEditProduct: IRouter = {
  path: '/admin/product-management/edit',
  loader: React.lazy(() => import('./FormProduct')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true,
  generatePath: (id: string) => `/admin/product-management/edit/${id}`
}
