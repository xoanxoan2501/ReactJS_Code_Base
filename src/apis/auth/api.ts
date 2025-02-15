import httpRepoInstance from '@/core/http/http'

export const forgotPasswordAPI = async (email: string) => {
  const response = await httpRepoInstance.post('/users/forgot-password', {
    email,
  })

  return response.data
}

export const verifyOTPAPI = async (userId: string, otp: string) => {
  const response = await httpRepoInstance.post('/users/verify-otp', {
    userId,
    otp,
  })

  return response.data
}

export const getProductsAPI = async () => {
  const response = await httpRepoInstance.get('/products')
  console.log(response)
  return response.data
}
export const resetPasswordAPI = async (
  userId: string,
  password: string,
  confirmPassword: string,
  verifyToken: string
) => {
  const response = await httpRepoInstance.post('/users/reset-password', {
    userId,
    password,
    confirmPassword,
    verifyToken,
  })

  return response.data
}
