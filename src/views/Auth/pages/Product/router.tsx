import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerProduct: IRouter = {
  path: '/cardProduct',
  loader: React.lazy(() => import('./cardProduct')),
  exact: true,
  masterLayout: false,
}
