import httpRepoInstance from '@/core/http/http'
import { useMutation } from '@tanstack/react-query'
import { Order } from '../order'

interface updateOrderStatusBody {
  orderId: string
  newStatus: string
}

interface UpdateOrderStatusResponse {
  message: string
  newStatus: string
}

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: (body: updateOrderStatusBody) => updateOrderStatusAPI(body)
  })
}

export const updateOrderStatusAPI = async (body: updateOrderStatusBody): Promise<UpdateOrderStatusResponse> => {
  const response = await httpRepoInstance.put(`/orders/updateOrderStatus`, body)

  return response.data
}
