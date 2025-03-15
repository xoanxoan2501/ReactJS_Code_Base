import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerVoucherWallet: IRouter = {
  path: '/voucher-wallet',
  loader: React.lazy(() => import('./VoucherWallet')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
