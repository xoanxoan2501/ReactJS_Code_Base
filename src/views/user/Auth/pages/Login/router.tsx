import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerLogin: IRouter = {
  path: '/login',
  loader: React.lazy(() => import('./Login')),
  exact: true,
  masterLayout: true
}
