import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerOrderPageOk: IRouter = {
  path: '/order-page-ok',
  loader: React.lazy(() => import('./OrderPageOK')),
  exact: true,
  masterLayout: true
}
