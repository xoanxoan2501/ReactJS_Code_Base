import { ICustomer } from '@/apis/customer'
import { getCustomersAPI, getCustomerIdAPI, customerKeys } from '@/apis/customer/api'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export interface useCustomersProps {
  isKeepPreviousData?: boolean
  page?: number
  limit?: number
  q?: string
  staleTime?: number
}

export const useCustomers = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE,
  q,
  staleTime = 30
}: useCustomersProps) => {
  const queryKey = customerKeys.fetchCustomersPagination(page, limit, q)
  const queryInfo = useQuery({
    queryKey,
    queryFn: async (): Promise<Array<ICustomer>> => {
      return await getCustomersAPI()
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}


export const useCustomer = (id: string) => {
  return useQuery<ICustomer>({
    queryKey: id ? customerKeys.fetchCustomer(id) : [],
    queryFn: () => (id ? getCustomerIdAPI(id) : Promise.reject('Invalid ID')),
    enabled: !!id,
    staleTime: 1000 * 60
  })
}
