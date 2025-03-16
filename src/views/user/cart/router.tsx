import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerCart: IRouter = {
  path: '/cart',
  loader: React.lazy(() => import('./index')),
  exact: true,
  masterLayout: true
}
