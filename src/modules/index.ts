import { combineReducers } from '@reduxjs/toolkit'

import profileStore from '@/apis/auth'
import { cartReducer } from '@/apis/cart'
import { productManagementReducer } from '@/apis/product-management-redux'
import { categoryReducer } from '@/apis/category'
import { productReducer } from '@/apis/product'
import orderReducer from '@/apis/order'

const appReducer = combineReducers({
  profile: profileStore.reducer,
  cart: cartReducer,
  category: categoryReducer,
  productManagement: productManagementReducer,
  prduct: productReducer,
  order: orderReducer
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer
