import httpRepoInstance from '@/core/http/http'
import { useQuery } from '@tanstack/react-query'
import { ICustomer } from '.'

const customerKeys = {
  customer: ['customers']
}

interface GetAllCustomersResponse {
  data: ICustomer[]
  total: number
}

export const useGetAllCustomers = () => {
  const query = useQuery({
    queryKey: customerKeys.customer,
    queryFn: () => getAllCustomersAPI(),
    refetchOnMount: true
  })

  return query
}

export const getAllCustomersAPI = async (): Promise<GetAllCustomersResponse> => {
  const response = await httpRepoInstance.get('/customers')
  return response.data
}
