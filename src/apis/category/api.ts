import httpRepoInstance from '@/core/http/http'

export const getCategoriesAPI = async (searchPath: string) => {
  const response = await httpRepoInstance.get(`/categories${searchPath}`)

  return response.data
}

export const getCategoriesAllAPI = async () => {
  const response = await httpRepoInstance.get(`categories/getAll`)
  return response.data
}
export const getCategoryByIdAPI = async (id: string) => {
  const response = await httpRepoInstance.get(`categories/${id}`)
  return response.data
}
export const createCategoryAPI = async (data: any) => {
  const response = await httpRepoInstance.post(`categories`, data)
  return response.data
}
export const updateCategoryAPI = async (id: string, data: any) => {
  const response = await httpRepoInstance.put(`categories/${id}`, data)
  return response.data
}
