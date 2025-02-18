import { IProduct } from '@/apis/product'
import { getProductsAPI, productKeys } from '@/apis/product/api'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export interface useProductsProps {
  isKeepPreviousData?: boolean
  page: number
  limit?: number
  q?: string
  categoryId?: string
  staleTime?: number
}

export const useProducts = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE,
  q,
  categoryId,
  staleTime = 30
}: useProductsProps) => {
  const queryInfo = useQuery({
    queryKey: productKeys.fetchProductsPagination(page, q, categoryId),
    queryFn: async (): Promise<{
      data: Array<IProduct>
      total: number
    }> => {
      return await getProductsAPI(
        `?page=${page}&limit=${limit}&q=${q}&categoryId=${categoryId}`
      )
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}
