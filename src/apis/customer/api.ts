import httpRepoInstance from '@/core/http/http'

export const customerKeys = {
  all: ['fetchCustomers'],
  fetchCustomersPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    q: string | undefined | null
  ) => {
    return [...customerKeys.all, page ?? -1, limit ?? -1, q ?? '']
  },
  fetchCustomer: (id: string) => ['fetchCustomer', id]
}
export const getCustomersAPI = async () => {
  const response = await httpRepoInstance.get('/customers')
  console.log(response.data)
  return response.data
}
export const getCustomerIdAPI = async (id: string) => {
  const response = await httpRepoInstance.get(`/customers/${id}`)
  return response.data
}
