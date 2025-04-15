import { useQuery } from '@tanstack/react-query'
import httpRepoInstance from '@/core/http/http'

const categoryKeys = {
  categories: ['categories']
}

interface CategoryResponse {
  _id: string
  name: string
  description: string
  createdAt: number // Sử dụng kiểu `number` vì đây là timestamp.
  updatedAt: number | null // Có thể là `null` nếu chưa được cập nhật.
  _destroy: boolean // Biến boolean cho biết trạng thái "bị xóa" của item.
}

export const useCategoryInfo = () => {
  const query = useQuery({
    queryKey: categoryKeys.categories,
    queryFn: categoryApi.getCategoryInfo
  })

  return query
}

export const categoryApi = {
  async getCategoryInfo(): Promise<{
    data: CategoryResponse[]
    total: number
  }> {
    const res = await httpRepoInstance.get('/categories/getAll').then((res) => res.data)
    return res
  }
}
