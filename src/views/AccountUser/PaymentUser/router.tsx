import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerPaymentUser: IRouter = {
  path: '/payment-user',
  loader: React.lazy(() => import('./PaymentUser')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
