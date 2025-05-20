import httpRepoInstance, { customHttpInstance } from '@/core/http/http'
import { useQuery } from '@tanstack/react-query'
import { IProduct } from '.'

const productKeys = {
  product: ['products']
}

interface GetAllProductsResponse {
  data: IProduct[]
  total: number
}

export const useGetAllProducts = () => {
  const query = useQuery({
    queryKey: productKeys.product,
    queryFn: () => getAllProductsAPI(),
    refetchOnMount: true
  })

  return query
}

export const getAllProductsAPI = async (): Promise<GetAllProductsResponse> => {
  const response = await customHttpInstance('http://13.114.2.60:8082/api/v1').get('/products')
  return response.data
}
