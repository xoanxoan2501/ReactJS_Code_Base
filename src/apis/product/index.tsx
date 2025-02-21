export interface IProduct {
  _id?: string
  title?: string
  description?: string
  price?: number
  categoryId?: string
  category?: Category[]
  sizes?: Array<{
    size: string
    stock: number
  }>
  status?: string
  thumbnail?: string
  code?: string
  images?: Array<string>
  createdAt?: string
  updatedAt?: string
  _destroy?: boolean
}

interface Category {
  _id: string
  name: string
  description: string
  createdAt: number // Sử dụng kiểu `number` vì đây là timestamp.
  updatedAt: number | null // Có thể là `null` nếu chưa được cập nhật.
  _destroy: boolean // Biến boolean cho biết trạng thái "bị xóa" của item.
}
