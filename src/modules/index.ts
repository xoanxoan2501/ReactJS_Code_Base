import { combineReducers } from '@reduxjs/toolkit'

import profileStore from '@/apis/auth'

const appReducer = combineReducers({
  profile: profileStore.reducer
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer
