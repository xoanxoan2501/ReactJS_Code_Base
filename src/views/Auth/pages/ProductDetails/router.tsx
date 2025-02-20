import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerProductDetails: IRouter = {
  path: '/ProductDetail',
  loader: React.lazy(() => import('./ProductDetails')),
  exact: true,
  masterLayout: true,
}
