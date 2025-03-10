import httpRepoInstance from '@/core/http/http'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Order } from './index'

export const useAddOrder = () => {
  return useMutation({
    mutationFn: (body: Order) => createOrderAPI(body)
  })
}

export const createOrderAPI = async (body: Order): Promise<Order> => {
  const response = await httpRepoInstance.post('/orders', body)
  return response.data
}
export const fetchOrderAPI = async () => {
  const response = await httpRepoInstance.get('/orders')
  return response.data
}
export const useFetchOrders = () => {
  return useQuery({
    queryKey: ['orders'], // Key để react-query quản lý cache
    queryFn: fetchOrderAPI, // Hàm gọi API
    staleTime: 5 * 60 * 1000 // Dữ liệu sẽ được cache trong 5 phút
  })
}
