import z from 'zod'

export const ProductSchema = z.object({
  title: z
    .string()
    .min(1, 'Bạn cần nhập tên sản phẩm')
    .max(400, 'Tên sản phẩm tối đa 200 ký tự')
    .refine((value) => value.trim() !== '', {
      message: 'Tên sản phẩm không được chỉ là khoảng trắng'
    }),
  code: z
    .string()
    .min(1, 'Bạn cần nhập mã code')
    .max(200, 'Mã code tối đa 200 ký tự')
    .refine((value) => value.trim() !== '', {
      message: 'Mã code không được chỉ là khoảng trắng'
    }),
  categoryId: z.string().min(1, 'Bạn cần chọn danh mục sản phẩm'),
  sizes: z.array(
    z.object({
      size: z.string().min(1, 'Bạn cần nhập size sản phẩm'),
      stock: z
        .preprocess((val) => Number(val), z.number().min(1, 'Bạn cần phải nhập số lượng'))
        .refine((val) => !isNaN(Number(val)), {
          message: 'Số lượng sản phẩm phải là một số'
        })
        .transform((val) => Number(val))
        .refine((val) => val >= 0, {
          message: 'Số lượng sản phẩm phải lớn hơn 0'
        }),
      price: z
        .preprocess((val) => Number(val), z.number().min(1, 'Bạn cần phải nhập giá tiền'))
        .refine((val) => !isNaN(Number(val)), {
          message: 'Giá sản phẩm phải là một số' // Kiểm tra nếu nhập chữ
        })
        .transform((val) => Number(val)) // Chuyển về số
        .refine((val) => val >= 0, {
          message: 'Giá sản phẩm phải lớn hơn 0' // Kiểm tra số >= 0
        })
    })
  ),
  description: z.string().min(1, 'Bạn cần nhập mô tả sản phẩm'),
  thumbnail: z.union([z.instanceof(Uint8Array), z.string()]), // Hỗ trợ cả link ảnh
  images: z.array(z.union([z.instanceof(Uint8Array), z.string()])).min(1, 'Bạn cần chọn ít nhất 1 ảnh chi tiết')
})

export type Product = z.infer<typeof ProductSchema>
