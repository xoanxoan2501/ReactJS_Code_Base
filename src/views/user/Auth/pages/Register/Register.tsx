/* eslint-disable no-console */
import { message } from 'antd'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Box, Container, FormControl, MenuItem } from '@mui/material'
import axios from 'axios'
import { Select } from 'antd'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

import './Register.scss'
import { registerAPI } from '@/apis/auth'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { routerLogin } from '@/views/user/Auth/pages/Login/router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchemaType } from '@/utils/validationSchemas'
import { Button } from '@mui/material'

function Register() {
  const [districts, setDistricts] = useState<string[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  })

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/79?depth=2')
        const districtNames = response.data.districts.map((district: { name: string }) => district.name)
        setDistricts(districtNames)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error)
      }
    }

    fetchDistricts()
  }, [])

  const handleRegister = async (data: RegisterSchemaType) => {
    try {
      const response = await dispatch(registerAPI({ ...data, province: 'Thành phố Hồ Chí Minh' })).unwrap()
      console.log('Phản hồi từ API:', response)
      message.success('Đăng ký thành công!')
      navigate(routerLogin.path)
    } catch (error) {
      console.error('Lỗi từ API:', error)

      message.error('Đăng ký thất bại, vui lòng thử lại!')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Container className='registerContainer'>
          <Box className='registerBox'>
            <Box>
              <h1 style={{ textAlign: 'center' }}>Tạo tài khoản </h1>
            </Box>

            <TextField
              label='Họ và tên'
              {...register('fullname')}
              name='fullname'
              variant='outlined'
              className='textField'
              sx={{ width: '100%' }}
              error={errors.fullname ? true : false}
              helperText={errors.fullname?.message}
            />
            <Box className='registerRow'>
              <TextField
                label='Email'
                variant='outlined'
                className='textField'
                sx={{ width: '70%' }}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                {...register('email')}
              />
              <TextField
                {...register('phoneNumber')}
                label='Số điện thoại '
                variant='outlined'
                className='textField'
                sx={{ width: '30%' }}
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber?.message}
              />
            </Box>
            <Box className='registerRow'>
              <TextField
                label='Mật khẩu'
                variant='outlined'
                className='textField'
                sx={{ width: '50%' }}
                type='password'
                {...register('password')}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
              <TextField
                label='Xác nhận lại mật khẩu '
                variant='outlined'
                className='textField'
                sx={{ width: '50%' }}
                type='password'
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword?.message}
              />
            </Box>

            <Box className='registerRow'>
              <TextField
                sx={{ width: '40%' }}
                className='textField'
                label='Tỉnh/Thành phố'
                InputProps={{ readOnly: true }}
                variant='outlined'
                value='Thành phố Hồ Chí Minh'
              />
              <FormControl fullWidth className='selectDistrict'>
                <Controller
                  name='district'
                  control={control}
                  defaultValue='Chọn quận/huyện'
                  render={({ field }) => (
                    <Select {...field} style={{ height: '47.38px' }}>
                      {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                label='Địa chỉ'
                variant='outlined'
                className='textField'
                sx={{ width: '100%' }}
                {...register('address')}
                error={errors.address ? true : false}
                helperText={errors.address?.message}
              />
            </Box>
            <Box className='registerRow'>
              <Stack spacing={2} direction='row'>
                <Button variant='outlined' onClick={() => navigate(-1)}>
                  Quay lại
                </Button>
                <Button variant='outlined' type='submit'>
                  Đăng ký
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </form>
    </div>
  )
}

export default Register
