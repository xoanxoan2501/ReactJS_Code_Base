import httpRepoInstance from '@/core/http/http'

export const productKeys = {
  all: ['fetchProducts'],
  fetchProductsPagination: (
    page: number | undefined | null,
    q: string | undefined | null,
    categoryId: string | undefined | null
  ) => {
    return [...productKeys.all, page, q ?? '', categoryId ?? 'all']
  },
  fetchProduct: (id: string) => ['fetchProduct', id],
}

export const getProductsAPI = async (searchPath: string) => {
  const response = await httpRepoInstance.get(`/products${searchPath}`)

  return response.data
}

export const fetchProductByIdAPI = async (id: string) => {
  const response = await httpRepoInstance.get(`/products/${id}`)

  return response.data
}
