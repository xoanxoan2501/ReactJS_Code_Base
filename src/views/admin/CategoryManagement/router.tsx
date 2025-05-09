import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerCategoryManagement: IRouter = {
  path: '/admin/category-management',
  loader: React.lazy(() => import('./CategoryManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerCategoryManagementAdd: IRouter = {
  path: '/admin/category-management/add',
  loader: React.lazy(() => import('./FormCategory')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerCategoryManagementEdit: IRouter = {
  path: '/admin/category-management/edit/:id',
  loader: React.lazy(() => import('./FormCategory')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerCategoryManagementView: IRouter = {
  path: '/admin/category-management/view/:id',
  loader: React.lazy(() => import('./FormCategory')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
