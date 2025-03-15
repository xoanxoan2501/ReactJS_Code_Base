import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerPurchase: IRouter = {
  path: '/purchase',
  loader: React.lazy(() => import('./Purchase')),
  exact: true,
  masterLayout: true,
  showSideBar: true
}
