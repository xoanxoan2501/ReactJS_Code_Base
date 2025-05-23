import { Order } from '@/apis/order'
import { getOrdersAPI, orderKeys } from '@/apis/order/api'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export interface useOrdersProps {
  isKeepPreviousData?: boolean
  page?: number
  limit?: number
  q?: string
  userId?: string
  staleTime?: number
}

export const useOrders = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE,
  q,
  staleTime = 30
}: useOrdersProps) => {
  const queryInfo = useQuery({
    queryKey: orderKeys.fetchOrdersPagination(page, limit, status, q),
    queryFn: async (): Promise<{
      data: Array<Order>
      total: number
    }> => {
      let querypath = `?page=${page}&limit=${limit}`

      if (q) {
        querypath += `&q=${q}`
      }

      return await getOrdersAPI(querypath)
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}
