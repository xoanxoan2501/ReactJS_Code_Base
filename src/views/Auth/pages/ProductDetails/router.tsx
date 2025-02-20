import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerProductDetail: IRouter = {
  path: '/detail',
  loader: React.lazy(() => import('./ProductDetails')),
  exact: true,
  masterLayout: true,
}
