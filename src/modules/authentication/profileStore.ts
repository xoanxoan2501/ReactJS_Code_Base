/* eslint-disable @typescript-eslint/no-explicit-any */
import lodash from 'lodash'

import { RootState } from '@/modules'
import UserEntity from '@/modules/user/entity'
import { createAction, createAsyncThunk, createSlice, PayloadAction, Selector } from '@reduxjs/toolkit'
import httpRepoInstance from '@/core/http/http'
import { ILogin } from '@/modules/authentication/interface'

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
  accessToken?: string
  refreshToken?: string
  remember: boolean
}

export const loginAPI = createAsyncThunk('profile/login', async (data: ILogin) => {
  const response = await httpRepoInstance.post('/users/login', data)

  return response.data
})

const profileStore = createSlice({
  name: 'profileStore',
  initialState: {
    statusLogin: false,
    user: null,
    linkImage: '',
    listPermissionCode: [],
    accessToken: null,
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
    resetToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) =>
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
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.statusLogin = true
        state.user = action.payload
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
  }
})

export const TokenSelector: Selector<RootState, string> = (state) => {
  return state.profile.accessToken || ''
}

interface IUser {
  user?: UserEntity | null
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
export const PermissionsSelector: Selector<RootState, IPermissions> = (state) => {
  return {
    listPermissionCode: state.profile.listPermissionCode || [],
    status: state.profile.statusLogin || false
  }
}

export const { fetchProfile, resetToken, updateProfile, saveImageGroup, logOut } = profileStore.actions

export default profileStore
