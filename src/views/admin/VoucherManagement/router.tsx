import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerVoucherManagement: IRouter = {
  path: '/admin/voucher-management',
  loader: React.lazy(() => import('./VoucherManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerAddVoucher: IRouter = {
  path: '/admin/voucher-management/add',
  loader: React.lazy(() => import('./FormVoucher')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}

export const routerEditVoucher: IRouter = {
  path: '/admin/voucher-management/edit',
  loader: React.lazy(() => import('./FormVoucher')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true,
  generatePath: (id: string) => `/admin/voucher-management/edit/${id}`
}