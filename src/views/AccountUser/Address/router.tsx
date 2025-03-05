import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerAddress: IRouter = {
  path: '/address',
  loader: React.lazy(() => import('./Address')),
  exact: true,
  masterLayout: true,
  showSideBar: true,
  generatePath: () => '/address'
}
