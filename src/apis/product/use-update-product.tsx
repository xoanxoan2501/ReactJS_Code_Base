import httpRepoInstance, { customHttpInstance } from '@/core/http/http'
import { useMutation } from '@tanstack/react-query'
import { IProduct } from '.'

// const productKeys = {
//   product: ['product']
// }

// interface ProductResponse {
//   title: string
//   code: string
//   categoryId: string
//   description?: string
//   price: number
//   sizes: {
//     size: string
//     stock: number
//   }[]
//   thumbnail?: string
//   images: string[]
//   status: 'available' | 'unavailable'
//   slug?: string
//   createdAt: number // timestamp
//   updateAt: number | null
//   _destroy: boolean
// }

export interface UpdateProductResponse {
  message: string
  product: IProduct
}

interface UpdateProductProps {
  body: FormData
  id: string
}

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ body, id }: UpdateProductProps) => updateProductAPI(body, id)
  })
}

export const updateProductAPI = async (body: FormData, id: string): Promise<UpdateProductResponse> => {
  const response = await customHttpInstance('http://localhost:8082/api/v1').put(`/products/edit/${id}`, body)
  return response.data
}
