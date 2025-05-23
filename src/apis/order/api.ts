import httpRepoInstance from '@/core/http/http'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { Order } from './index'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'

export const orderKeys = {
  all: ['orders'],
  fetchOrdersPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    status: string | undefined | null,
    q: string | null | undefined
  ) => {
    return [...orderKeys.all, page || -1, limit || -1, status || 'all', q || '']
  },
  fetchOrder: (id: string) => ['order', id]
}

export const useAddOrder = () => {
  return useMutation({
    mutationFn: (body: Order) => createOrderAPI(body)
  })
}

export const createOrderAPI = async (body: Order): Promise<Order> => {
  const response = await httpRepoInstance.post('/orders', body)
  return response.data
}
export const fetchOrderAPI = async (querypath: string) => {
  const response = await httpRepoInstance.get(`/orders${querypath}`)
  return response.data
}

interface FetchOrdersProps {
  page?: number
  limit?: number
  status?: string
  userId?: string
  q?: string
  isKeepPreviousData?: boolean
  staleTime?: number
}

export const useFetchOrders = ({
  page,
  limit,
  status,
  userId,
  q,
  isKeepPreviousData = false,
  staleTime = 30
}: FetchOrdersProps = {}) => {
  const queryInfo = useQuery({
    queryKey: orderKeys.fetchOrdersPagination(page, limit, status, q),
    queryFn: async (): Promise<{
      data: Array<Order>
      total: number
    }> => {
      let queryPath = `?`

      if (page) {
        queryPath += `page=${page}`
      }

      if (limit) {
        queryPath += `&limit=${limit}`
      }

      if (status) {
        queryPath += `&status=${status}`
      }

      if (userId) {
        queryPath += `&userId=${userId}`
      }

      if (q) {
        queryPath += `&q=${q}`
      }

      return await fetchOrderAPI(queryPath)
    }, // Hàm gọi API
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}

export const getOrdersAPI = async (searchPath: string) => {
  const response = await httpRepoInstance.get(`/orders${searchPath}`)
  return response.data
}
