import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerDetailPurchase: IRouter = {
  path: '/purchase/DetailPurchase/:orderId',
  loader: React.lazy(() => import('./DetailPurchase')),
  exact: true,
  masterLayout: true,
  showSideBar: true,
  generatePath: (orderId: string) => `/purchase/DetailPurchase/${orderId}`
}
