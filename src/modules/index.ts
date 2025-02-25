import { combineReducers } from '@reduxjs/toolkit'

import profileStore from '@/apis/auth'
import { cartReducer } from '@/apis/cart'
import { productManagementReducer } from '@/apis/product-management-redux'
import { categoryReducer } from '@/apis/category'

const appReducer = combineReducers({
  profile: profileStore.reducer,
  cart: cartReducer,
  category: categoryReducer,
  productManagement: productManagementReducer
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer
