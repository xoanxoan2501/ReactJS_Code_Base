import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerNotifications: IRouter = {
  path: '/notifications',
  loader: React.lazy(() => import('./Notifications')),
  exact: true,
  masterLayout: true,
  showSideBar: true,
  generatePath: () => '/notifications'
}
