import httpRepoInstance from '@/core/http/http'

export const getProductsAPI = async () => {
  const response = await httpRepoInstance.get('/products')

  return response.data
}
