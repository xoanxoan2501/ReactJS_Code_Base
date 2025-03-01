import httpRepoInstance from '@/core/http/http'
import { useMutation } from '@tanstack/react-query'
import { Order } from '.'

export const useAddOrder = () => {
  return useMutation({
    mutationFn: (body: Order) => createOrderAPI(body)
  })
}

export const createOrderAPI = async (body: Order): Promise<Order> => {
  const response = await httpRepoInstance.post('/orders', body)
  return response.data
}
