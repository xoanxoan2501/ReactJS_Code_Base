import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerVoucherManagement: IRouter = {
  path: '/admin/voucher-management',
  loader: React.lazy(() => import('./VoucherManagement')),
  exact: true,
  adminLayout: true,
  isAdminRouter: true
}
