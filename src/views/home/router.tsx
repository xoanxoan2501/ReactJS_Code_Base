import React from 'react'

import { HomeOutlined } from '@ant-design/icons'
import { IRouter } from '@/routers/interface'

export const routerHome: IRouter = {
  path: '/',
  loader: React.lazy(() => import('./index')),
  exact: true,
  masterLayout: true,
  menu: {
    icon: <HomeOutlined />
  }
}
