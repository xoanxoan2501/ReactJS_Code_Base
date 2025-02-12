import httpRepoInstance from '@/core/http/http'

export const forgotPasswordAPI = async (email: string) => {
  const response = await httpRepoInstance.post('/users/forgot-password', {
    email
  })

  return response.data
}

export const verifyOTPAPI = async (userId: string, otp: string) => {
  const response = await httpRepoInstance.post('/users/verify-otp', {
    userId,
    otp
  })

  return response.data
}

export const resetPasswordAPI = async (
  userId: string,
  password: string,
  confirmPassword: string
) => {
  const response = await httpRepoInstance.post('/users/reset-password', {
    userId,
    password,
    confirmPassword
  })

  return response.data
}
