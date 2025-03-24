import z from 'zod'

export const VoucherSchema = z.object({
  code: z
    .string()
    .min(1, 'Bạn cần nhập mã code')
    .max(200, 'Mã code tối đa 200 ký tự')
    .refine((value) => value.trim() !== '', {
      message: 'Mã code không được chỉ là khoảng trắng'
    }),
  description: z.string().max(500, 'Mô tả tối đa 500 ký tự').default(''),
  discountType: z.enum(['percent', 'fixed'], {
    errorMap: () => ({ message: 'Loại giảm giá phải là "percent" hoặc "fixed"' })
  }),
  discountValue: z
    .number()
    .min(0, 'Giá trị giảm giá phải lớn hơn hoặc bằng 0'),
  minOrderValue: z.number().min(0, 'Giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 0').default(0),
  maxDiscount: z.number().min(0, 'Giá trị giảm giá tối đa phải lớn hơn hoặc bằng 0').nullable(),
  expirationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Ngày hết hạn không hợp lệ'
  }),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().nullable().default(null),
  _destroy: z.boolean().default(false),
  usageLimit: z.number().nullable().default(null),
  usageCount: z.number().min(0, 'Số lần sử dụng phải lớn hơn hoặc bằng 0').default(0),
  applicableCategories: z.array(z.string()).default([]),
  applicableProducts: z.array(z.string()).default([])
})

export type Voucher = z.infer<typeof VoucherSchema>
