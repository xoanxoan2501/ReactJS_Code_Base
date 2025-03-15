import React from 'react'

import { IRouter } from '@/routers/interface'

export const routerAdminLogin: IRouter = {
  path: '/admin/login',
  loader: React.lazy(() => import('./AdminLogin')),
  exact: true,
  masterLayout: false
}
