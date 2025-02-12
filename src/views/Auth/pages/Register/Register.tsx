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
  name: string
  email: string
  phoneNumber: string
  passWord: string
  confirmPassword: string
  city: string
  location: string
  district: string
}

function Register() {
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    phoneNumber: '',
    passWord: '',
    confirmPassword: '',
    city: 'Thành phố Hồ Chí Minh',
    location: '',
    district: '',
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

  const handleDistrictChange = (value: string) => {
    setUser((prev) => ({ ...prev, district: value }))
  }

  const validateForm = () => {
    if (
      !user.name ||
      !user.email ||
      !user.phoneNumber ||
      !user.passWord ||
      !user.confirmPassword ||
      !user.district ||
      !user.location
    ) {
      message.error('Vui lòng điền đầy đủ thông tin!')
      return false
    }
    if (user.passWord !== user.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    console.log('Dữ liệu gửi lên API:', {
      email: user.email,
      password: user.passWord,
      confirmPassword: user.confirmPassword,
      fullname: user.name,
      phoneNumber: user.phoneNumber,
      address: user.location,
      province: user.city,
      district: user.district,
    })

    try {
      const response = await dispatch(
        registerAPI({
          email: user.email,
          password: user.passWord,
          confirmPassword: user.confirmPassword,
          fullname: user.name,
          phoneNumber: user.phoneNumber,
          address: user.location,
          province: user.city,
          district: user.district,
        })
      ).unwrap() // Lấy dữ liệu từ API nếu thành công

      console.log('Phản hồi từ API:', response) // Kiểm tra API trả về gì
      message.success('Đăng ký thành công!')
      navigate('/login')
    } catch (error) {
      console.error('Lỗi từ API:', error) // Log lỗi từ API

      if (error?.response?.data) {
        console.error('Chi tiết lỗi từ API:', error.response.data)
        message.error(
          error.response.data.message ||
            'Đăng ký thất bại, vui lòng kiểm tra lại dữ liệu!'
        )
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
            label="Họ và tên "
            name="name"
            variant="outlined"
            className="textField"
            sx={{ width: '100%' }}
            value={user.name}
            onChange={handleChange}
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
            />
            <TextField
              name="phoneNumber"
              label="Số điện thoại "
              variant="outlined"
              className="textField"
              sx={{ width: '30%' }}
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </Box>
          <Box className="registerRow">
            <TextField
              label="Mật khẩu"
              name="passWord"
              variant="outlined"
              className="textField"
              sx={{ width: '50%' }}
              type="password"
              value={user.passWord}
              onChange={handleChange}
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
            />
          </Box>

          <Box className="registerRow">
            <TextField
              sx={{ width: '30%' }}
              className="textField"
              name="city"
              label="Thành phố"
              value={user.city}
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
              name="location"
              variant="outlined"
              className="textField"
              sx={{ width: '100%' }}
              value={user.location}
              onChange={handleChange}
            />
          </Box>
          <Box className="registerRow">
            <Stack spacing={2} direction="row">
              <Button variant="text" onClick={() => navigate('/')}>
                Quay lại
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
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
