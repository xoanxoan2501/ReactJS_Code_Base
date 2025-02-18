export interface IProduct {
  _id?: string
  title?: string
  description?: string
  price?: number
  categoryId?: string
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
