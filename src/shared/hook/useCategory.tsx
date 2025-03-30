import { authKeys, ICategory } from '@/apis/category/index'
import { getCategoryAPI } from '@/apis/category'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCategoriesAllAPI, getCategoriesAPI } from '@/apis/category/api'

export interface useFetchCategoriesProps {
  isKeepPreviousData?: boolean
  page?: number
  limit?: number
  q?: string
  staleTime?: number
}

export const useFetchCategories = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE,
  q,
  staleTime = 30
}: useFetchCategoriesProps) => {
  const queryInfo = useQuery({
    queryKey: authKeys.fetchCategoriesPagination(page, limit, q),
    queryFn: async (): Promise<{
      data: Array<ICategory>
      total: number
    }> => {
      let searchPath = '?'
      if (page) {
        searchPath += `page=${page}`
      } else {
        const response = await getCategoriesAllAPI()
        return response
      }

      if (limit) {
        searchPath += `limit=${limit}`
      }

      const response = await getCategoriesAPI(searchPath)
      return response
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}
