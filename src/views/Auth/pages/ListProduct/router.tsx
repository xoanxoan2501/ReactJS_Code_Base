import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerListProduct: IRouter = {
  path: '/listProduct',
  loader: React.lazy(() => import('./ListProduct')),
  exact: true,
  masterLayout: true,
}
