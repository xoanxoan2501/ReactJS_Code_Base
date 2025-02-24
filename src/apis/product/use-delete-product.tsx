import httpRepoInstance from '@/core/http/http'
import { useMutation } from '@tanstack/react-query'
import { IProduct } from '.'

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProductAPI(id)
  })
}

export const deleteProductAPI = async (id: string): Promise<IProduct> => {
  const response = await httpRepoInstance.delete(`/products/delete/${id}`)

  return response.data
}
