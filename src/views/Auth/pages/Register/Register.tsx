/* eslint-disable no-console */
import { Button, Card, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Box, Container, FormControl, MenuItem } from '@mui/material'
import axios from 'axios'
import { Select } from 'antd'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './Register.scss'
import { registerAPI } from '@/apis/auth'

interface IUser {
  fullname: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  province: string
  address: string
  district: string
}

function Register() {
  const [user, setUser] = useState<IUser>({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    province: 'Thành phố Hồ Chí Minh',
    address: '',
    district: ''
  })
  const [districts, setDistricts] = useState<string[]>([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          'https://provinces.open-api.vn/api/p/79?depth=2'
        )
        const districtNames = response.data.districts.map(
          (district: { name: string }) => district.name
        )
        setDistricts(districtNames)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error)
      }
    }

    fetchDistricts()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }
  const [errors, setErrors] = useState<Record<string, string>>({})
  const handleDistrictChange = (value: string) => {
    setUser((prev) => ({ ...prev, district: value }))
  }

  const validateForm = () => {
    if (
      !user.fullname ||
      !user.email ||
      !user.phoneNumber ||
      !user.password ||
      !user.confirmPassword ||
      !user.district ||
      !user.address
    ) {
      message.error('Vui lòng điền đầy đủ thông tin!')
      return false
    }
    if (user.password !== user.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    console.log('Dữ liệu gửi lên API:', user)

    try {
      const response = await dispatch(registerAPI(user)).unwrap()
      console.log('Phản hồi từ API:', response)
      message.success('Đăng ký thành công!')
      navigate('/login')
    } catch (error) {
      console.error('Lỗi từ API:', error)

      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors) // Lưu lỗi vào state
      } else {
        message.error('Đăng ký thất bại, vui lòng thử lại!')
      }
    }
  }

  return (
    <div>
      <Container className="registerContainer">
        <Box className="registerBox">
          <Box>
            <h1 style={{ textAlign: 'center' }}>Tạo tài khoản </h1>
          </Box>

          <TextField
            label="Họ và tên"
            name="fullname"
            variant="outlined"
            className="textField"
            sx={{ width: '100%' }}
            value={user.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname || ''}
          />
          <Box className="registerRow">
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              className="textField"
              sx={{ width: '70%' }}
              value={user.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || ''}
            />
            <TextField
              name="phoneNumber"
              label="Số điện thoại "
              variant="outlined"
              className="textField"
              sx={{ width: '30%' }}
              value={user.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber || ''}
            />
          </Box>
          <Box className="registerRow">
            <TextField
              label="Mật khẩu"
              name="password"
              variant="outlined"
              className="textField"
              sx={{ width: '50%' }}
              type="password"
              value={user.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || ''}
            />
            <TextField
              name="confirmPassword"
              label="Xác nhận lại mật khẩu "
              variant="outlined"
              className="textField"
              sx={{ width: '50%' }}
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword || ''}
            />
          </Box>

          <Box className="registerRow">
            <TextField
              sx={{ width: '40%' }}
              className="textField"
              name="province"
              label="Tỉnh/Thành phố"
              value={user.province}
              InputProps={{ readOnly: true }}
            />
            <FormControl fullWidth className="selectDistrict">
              <Select
                value={user.district}
                onChange={handleDistrictChange}
                style={{ height: '47.38px' }}
              >
                <MenuItem value="">
                  <em>Chọn quận/huyện</em>
                </MenuItem>
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              label="Địa chỉ"
              name="address"
              variant="outlined"
              className="textField"
              sx={{ width: '100%' }}
              value={user.address}
              onChange={handleChange}
            />
          </Box>
          <Box className="registerRow">
            <Stack spacing={2} direction="row">
              <Button variant="text" onClick={() => navigate(-1)}>
                Quay lại
              </Button>
              <Button variant="text" onClick={handleSubmit}>
                Đăng kí
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Register
