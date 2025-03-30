import httpRepoInstance from '@/core/http/http'

export const getCategoriesAPI = async (searchPath: string) => {
  const response = await httpRepoInstance.get(`/categories${searchPath}`)

  return response.data
}

export const getCategoriesAllAPI = async () => {
  const response = await httpRepoInstance.get(`categories/getAll`)
  return response.data
}
