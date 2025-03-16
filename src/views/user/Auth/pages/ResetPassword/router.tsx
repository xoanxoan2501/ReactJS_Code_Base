import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerResetPassword: IRouter = {
  path: '/reset-password',
  loader: React.lazy(() => import('./ResetPassword')),
  exact: true,
  masterLayout: true
}
