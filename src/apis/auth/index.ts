import lodash from 'lodash'

import { RootState } from '@/modules'
import UserEntity from '@/modules/user/entity'
import { createAction, createAsyncThunk, createSlice, PayloadAction, Selector } from '@reduxjs/toolkit'
import httpRepoInstance, { customHttpInstance } from '@/core/http/http'
import { ILogin, IRegister } from '@/modules/authentication/interface'

interface IStore {
  statusLogin?: boolean
  user?: UserEntity | null
  listPermissionCode?: Array<string>
}
export const removeProfile = createAction('authentication/removeProfile')
export const setToken = createAction<{
  token: string
  refreshToken: string
  remember?: boolean
}>('authentication/setToken')

interface IStore {
  statusLogin?: boolean
  user?: UserEntity | null
  listPermissionCode?: Array<string>
  linkImage?: string
  accessToken?: string | null
  refreshToken?: string | null
  remember: boolean
}

export const loginAPI = createAsyncThunk('profile/login', async (data: ILogin) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/login', data)

  return response.data
})

export const logoutAPI = createAsyncThunk('profile/logout', async () => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/logout')

  return response.data
})

export const updateProfileAPI = createAsyncThunk('profile/updateProfile', async (data: Partial<UserEntity>) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').put('/users', data)
  return response.data
})

export const registerAPI = createAsyncThunk('profile/register', async (data: IRegister) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/register', data)
  return response.data
})

const profileStore = createSlice({
  name: 'profile',
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
    logOut: (state) => {
      return {
        ...state,
        statusLogin: false,
        user: null,
        linkImage: '',
        listPermissionCode: [],
        accessToken: null,
        refreshToken: null,
        remember: false
      }
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeProfile, (state) => {
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
      .addCase(logoutAPI.fulfilled, (state, action) => {
        if (action.payload.isLogout) {
          return {
            ...state,
            statusLogin: false,
            user: null,
            linkImage: '',
            listPermissionCode: [],
            accessToken: null,
            refreshToken: null,
            remember: false
          }
        }

        return state
      })
      .addCase(updateProfileAPI.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload
        }
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

export const { fetchProfile, resetToken, updateProfile, saveImageGroup, logOut, updateUser } = profileStore.actions

export default profileStore
