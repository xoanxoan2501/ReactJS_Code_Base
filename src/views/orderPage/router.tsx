import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerOrderPage: IRouter = {
  path: '/order-page',
  loader: React.lazy(() => import('./OrderPage')),
  exact: true,
  masterLayout: true
}
