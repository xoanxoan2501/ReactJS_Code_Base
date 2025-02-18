import httpRepoInstance from '@/core/http/http'

export const productKeys = {
  all: ['fetchProducts'],
  fetchProductsPagination: (
    page: number | undefined | null,
    q: string | undefined | null,
    categoryId: string | undefined | null
  ) => {
    const key: Array<unknown> = productKeys.all

    if (page) {
      key.push(page)
    }

    if (q) {
      key.push(q)
    }

    if (categoryId) {
      key.push(categoryId)
    }

    return key
  },
  fetchProduct: (id: string) => ['fetchProduct', id]
}

export const getProductsAPI = async (searchPath: string) => {
  const response = await httpRepoInstance.get(`/products${searchPath}`)

  return response.data
}
