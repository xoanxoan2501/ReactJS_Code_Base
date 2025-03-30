import httpRepoInstance from '@/core/http/http'

export const getVouchersAPI = async () => {
  const response = await httpRepoInstance.get('/vouchers')
  console.log(response.data)
  return response.data
}
export const getVoucherIdAPI = async (id: string) => {
  const response = await httpRepoInstance.get(`/vouchers/${id}`)
  return response.data
}
