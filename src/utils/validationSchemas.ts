import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email')
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

export const OTPSchema = z
  .object({
    otp: z.string().length(6, 'OTP must be 6 characters!')
  })
  .strict()

export type OTPSchemaType = z.infer<typeof OTPSchema>

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

export const registerSchema = z
  .object({
    fullname: z.string().nonempty('Vui lòng nhập họ tên'),
    email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email'),
    phoneNumber: z.string().nonempty('Vui lòng nhập số điện thoại'),
    address: z.string().nonempty('Vui lòng nhập địa chỉ'),
    district: z.string().nonempty('Vui lòng chọn quận/huyện'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>

export const editAddressSchema = z.object({
  fullname: z.string().nonempty('Vui lòng nhập họ tên'),
  phoneNumber: z.string().nonempty('Vui lòng nhập số điện thoại'),
  address: z.string().nonempty('Vui lòng nhập địa chỉ'),
  district: z.string().nonempty('Vui lòng chọn quận/huyện')
})

export type EditAddressSchemaType = z.infer<typeof editAddressSchema>
