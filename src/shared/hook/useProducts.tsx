import { getProductsAPI } from '@/apis/auth/api'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProductsAPI,
    staleTime: 1000 * 60 * 5, // Cache trong 5 phút
  })
}
