import { IVoucher } from '@/apis/voucher'
import { getVouchersAPI, getVoucherIdAPI, voucherKeys } from '@/apis/voucher/api'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export interface useVouchersProps {
  isKeepPreviousData?: boolean
  page?: number
  limit?: number
  q?: string
  staleTime?: number
}

export const useVouchers = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE,
  q,
  staleTime = 30
}: useVouchersProps) => {
  const queryKey = voucherKeys.fetchVouchersPagination(page, limit, q)
  const queryInfo = useQuery({
    queryKey,
    queryFn: async (): Promise<Array<IVoucher>> => {
      return await getVouchersAPI()
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}


export const useVoucher = (id: string) => {
  return useQuery<IVoucher>({
    queryKey: id ? voucherKeys.fetchVoucher(id) : [],
    queryFn: () => (id ? getVoucherIdAPI(id) : Promise.reject('Invalid ID')),
    enabled: !!id,
    staleTime: 1000 * 60
  })
}
