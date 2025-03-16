import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerCategoryManagement: IRouter = {
  path: '/admin/category-management',
  loader: React.lazy(() => import('./CategoryManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
