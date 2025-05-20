import httpRepoInstance, { customHttpInstance } from '@/core/http/http'

export const getCategoriesAPI = async (searchPath: string) => {
  const response = await customHttpInstance('http://localhost:8082/api/v1').get(`/categories${searchPath}`)

  return response.data
}

export const getCategoriesAllAPI = async () => {
  const response = await customHttpInstance('http://localhost:8082/api/v1').get(`categories/getAll`)
  return response.data
}
