import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerDetailPurchase: IRouter = {
  path: '/purchase/DetailPurchase',
  loader: React.lazy(() => import('./DetailPurchase')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
