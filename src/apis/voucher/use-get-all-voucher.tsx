import httpRepoInstance from '@/core/http/http'
import { useQuery } from '@tanstack/react-query'
import { IVoucher } from '.'

const voucherKeys = {
  voucher: ['vouchers']
}

interface GetAllVouchersResponse {
  data: IVoucher[]
  total: number
}

export const useGetAllVouchers = () => {
  const query = useQuery({
    queryKey: voucherKeys.voucher,
    queryFn: () => getAllVouchersAPI(),
    refetchOnMount: true
  })

  return query
}

export const getAllVouchersAPI = async (): Promise<GetAllVouchersResponse> => {
  const response = await httpRepoInstance.get('/vouchers')
  return response.data
}
