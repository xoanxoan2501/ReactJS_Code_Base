import httpRepoInstance from '@/core/http/http'

export const addCartApi = async (data: {
  productId: string
  quantity: number
  size: string
  title: string
  price: number
  thumbnail: string
}) => {
  const response = await httpRepoInstance.post('/cart/add-to-cart', data)

  return response
}
