import httpRepoInstance, { customHttpInstance } from '@/core/http/http'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
export const authKeys = {
  all: ['fetchUsers'],
  fetchUsersPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    q: string | undefined | null,
    customerType: string | undefined | null
  ) => {
    return [...authKeys.all, page || DEFAULT_PAGE, limit || DEFAULT_LIMIT_PER_PAGE, q ?? '', customerType ?? 'all']
  },
  fetchUser: (id: string) => ['fetchUser', id]
}

export const getUserByIdApi = async (id: string) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').get(`/users/${id}`)

  return response.data
}

export const getUsersApi = async (querypath: string) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').get(`/users${querypath}`)

  return response.data
}

export const forgotPasswordAPI = async (email: string) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/forgot-password', {
    email
  })

  return response.data
}

export const verifyOTPAPI = async (userId: string, otp: string) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/verify-otp', {
    userId,
    otp
  })

  return response.data
}

export const resetPasswordAPI = async (
  userId: string,
  password: string,
  confirmPassword: string,
  verifyToken: string
) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/reset-password', {
    userId,
    password,
    confirmPassword,
    verifyToken
  })

  return response.data
}

export const changePasswordAPI = async (old_password: string, new_password: string, confirm_password: string) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').post('/users/change-password', {
    old_password,
    new_password,
    confirm_password
  })

  return response.data
}

export const changeInfomationAPI = async (fullname: string, dateOfBirth: number) => {
  const response = await customHttpInstance('http://localhost:8083/api/v1').put('/users', {
    fullname,
    dateOfBirth
  })

  console.log(response)

  return response.data
}
