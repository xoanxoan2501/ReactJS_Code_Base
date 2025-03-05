import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerEditAddress: IRouter = {
  path: '/edit-address/:index',
  loader: React.lazy(() => import('./EditAddress')),
  exact: true,
  masterLayout: true,
  showSideBar: true,
  generatePath: (index: number) => `/edit-address/${index}`
}

export const routerCreateAddress: IRouter = {
  path: '/create-address',
  loader: React.lazy(() => import('./EditAddress')),
  exact: true,
  masterLayout: true,
  showSideBar: true,
  generatePath: () => '/create-address'
}
