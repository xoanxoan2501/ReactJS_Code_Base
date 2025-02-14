import { combineReducers } from '@reduxjs/toolkit'

import profileStore from '@/apis/auth'
import { cartReducer } from '@/apis/cart'

const appReducer = combineReducers({
  profile: profileStore.reducer,
  cart: cartReducer
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer
