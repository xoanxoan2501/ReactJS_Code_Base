import React from 'react'
import { IRouter } from '@/routers/interface'

export const routerPageError: IRouter = {
  path: '*',
  adminLayout: false,
  loader: React.lazy(() => import('./index'))
}
