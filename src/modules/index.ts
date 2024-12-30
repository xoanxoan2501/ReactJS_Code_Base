import { combineReducers } from '@reduxjs/toolkit'

import profileStore from '@/modules/authentication/profileStore'

const appReducer = combineReducers({
  profile: profileStore.reducer
})

export type RootState = ReturnType<typeof appReducer>

export default appReducer
