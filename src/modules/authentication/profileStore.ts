/* eslint-disable @typescript-eslint/no-explicit-any */
import lodash from 'lodash'

import { RootState } from '@/modules'
import UserEntity from '@/modules/user/entity'
import {
  createAction,
  createSlice,
  PayloadAction,
  Selector
} from '@reduxjs/toolkit'

interface IStore {
  statusLogin?: boolean
  user?: UserEntity
  listPermissionCode?: Array<string>
}
export const removeProfile = createAction('authentication/removeProfile')
export const setToken = createAction<{
  token: any
  refreshToken: any
  remember?: boolean
}>('authentication/setToken')

interface IStore {
  statusLogin?: boolean
  user?: UserEntity
  listPermissionCode?: Array<string>
  linkImage?: string
  token?: string
  refreshToken?: string
  remember: boolean
}

const profileStore = createSlice({
  name: 'profileStore',
  initialState: {
    statusLogin: false,
    user: null,
    linkImage: '',
    listPermissionCode: [],
    token: null,
    refreshToken: null,
    remember: false
  } as unknown as IStore,
  reducers: {
    fetchProfile: (
      state,
      action: PayloadAction<{
        user: UserEntity
        listPermissionCode?: string[]
      }>
    ) => {
      if (action.payload.user)
        Object.assign(state, {
          statusLogin: true,
          user: action.payload.user,
          listPermissionCode: action.payload.listPermissionCode || []
        })
    },
    resetToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) =>
      Object.assign(state, {
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }),
    updateProfile: (
      state,
      action: PayloadAction<{
        listPermissionCode?: string[]
        statusLogin?: boolean
      }>
    ) => Object.assign(state, action.payload),
    saveImageGroup: (state, action) => {
      return {
        ...state,
        linkImage: action.payload
      }
    },
    logOut: (state: any) => {
      return {
        ...state,
        statusLogin: false,
        user: null,
        linkImage: '',
        listPermissionCode: [],
        token: null,
        refreshToken: null,
        remember: false
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeProfile, (state: any) => {
        return {
          ...state,
          statusLogin: false,
          user: null,
          listPermissionCode: [],
          token: null,
          remember: false
        }
      })
      .addCase(setToken, (state, action) =>
        Object.assign(state, action.payload, {
          statusLogin: !lodash.isEmpty(action.payload.token)
        })
      )
  }
})

export const TokenSelector: Selector<RootState, string> = (state) => {
  return state.profile.token || ''
}

interface IUser {
  user?: UserEntity
  status: boolean
}

export const UserSelector: Selector<RootState, IUser> = (state) => {
  return {
    user: state.profile.user,
    status: state.profile.statusLogin || false
  }
}

interface IPermissions {
  listPermissionCode: string[]
  status: boolean
}
export const PermissionsSelector: Selector<RootState, IPermissions> = (
  state
) => {
  return {
    listPermissionCode: state.profile.listPermissionCode || [],
    status: state.profile.statusLogin || false
  }
}

export const {
  fetchProfile,
  resetToken,
  updateProfile,
  saveImageGroup,
  logOut
} = profileStore.actions

export default profileStore
