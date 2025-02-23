import httpRepoInstance from '@/core/http/http'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'

export const productKeys = {
  all: ['fetchProducts'],
  fetchProductsPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    q: string | undefined | null,
    categoryId: string | undefined | null
  ) => {
    return [...productKeys.all, page || DEFAULT_PAGE, limit || DEFAULT_LIMIT_PER_PAGE, q ?? '', categoryId ?? 'all']
  },
  fetchProduct: (id: string) => ['fetchProduct', id]
}

export const getProductsAPI = async (searchPath: string) => {
  const response = await httpRepoInstance.get(`/products${searchPath}`)

  return response.data
}
