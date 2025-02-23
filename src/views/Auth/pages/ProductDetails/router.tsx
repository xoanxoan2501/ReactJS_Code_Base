import { IRouter } from '@/routers/interface'
import React from 'react'

export const routerProductDetail: IRouter = {
<<<<<<< HEAD
  path: '/product-detail/:productId',
  loader: React.lazy(() => import('./ProductDetails')),
  exact: true,
  masterLayout: true,
  generatePath: (productId: string) => `/product-detail/${productId}`
=======
  path: '/product/:id',
  loader: React.lazy(() => import('./ProductDetails')),
  exact: true,
  masterLayout: true,
>>>>>>> xoan/cart-API
}
