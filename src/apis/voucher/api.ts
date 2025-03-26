import httpRepoInstance from '@/core/http/http'

export const voucherKeys = {
  all: ['fetchVouchers'],
  fetchVouchersPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    q: string | undefined | null
  ) => {
    return [...voucherKeys.all, page ?? -1, limit ?? -1, q ?? '']
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
