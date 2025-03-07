import httpRepoInstance from '@/core/http/http'

export const getVouchersAPI = async () => {
  const response = await httpRepoInstance.get('/vouchers')
  return response.data
}
export const getVoucherIdAPI = async (id: string) => {
  const response = await httpRepoInstance.get(`/vouchers/${id}`)

  return response.data
}
