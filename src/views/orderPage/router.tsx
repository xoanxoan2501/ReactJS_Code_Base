import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerOrderPage: IRouter = {
  path: '/order-page',
  loader: React.lazy(() => import('./orderPage')),
  exact: true,
  masterLayout: true
}
