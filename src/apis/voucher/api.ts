import httpRepoInstance from '@/core/http/http'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'

export const voucherKeys = {
  all: ['fetchVouchers'],
  fetchVouchersPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    q: string | undefined | null
  ) => {
    return [...voucherKeys.all, page || DEFAULT_PAGE, limit || DEFAULT_LIMIT_PER_PAGE, q ?? '']
  },
  fetchVoucher: (id: string) => ['fetchVoucher', id]
}
export const getVouchersAPI = async () => {
  const response = await httpRepoInstance.get('/vouchers')
  return response.data
}
export const getVoucherIdAPI = async (id: string) => {
  const response = await httpRepoInstance.get(`/vouchers/${id}`)

  return response.data
}
