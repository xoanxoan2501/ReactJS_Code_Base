import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerMainPublicPage: IRouter = {
  path: '/',
  loader: React.lazy(() => import('@/views/home')),
  exact: true,
  masterLayout: true
}
