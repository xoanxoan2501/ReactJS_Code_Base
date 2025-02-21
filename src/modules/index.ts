import { combineReducers } from '@reduxjs/toolkit'

import profileStore from '@/apis/auth'
import { cartReducer } from '@/apis/cart'
import { productManagementReducer } from '@/apis/productManagement'

const appReducer = combineReducers({
  profile: profileStore.reducer,
  cart: cartReducer,
  productManagement: productManagementReducer
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer
