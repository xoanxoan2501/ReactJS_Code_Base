/* eslint-disable no-console */
import { Button, Card, FormProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Box, Container, FormControl, MenuItem } from '@mui/material'
import axios from 'axios'

import Stack from '@mui/material/Stack'
import './Register.scss'
import { Select } from 'antd'
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
  const handleSubmit = () => {
    console.log('Thông tin người dùng:', user)
  }

  return (
    <div>
      <Container className="registerContainer">
        <Box className="registerBox">
          <Box>
            <h1 style={{ textAlign: 'center' }}>Tạo tài khoản </h1>
          </Box>

          <TextField
            id="outlined-basic"
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
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              className="textField"
              sx={{ width: '70%' }}
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
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
              id="outlined-basic"
              label="Mật khẩu"
              name="passWord"
              variant="outlined"
              className="textField"
              sx={{ width: '50%' }}
              value={user.passWord}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              name="confirmPassword"
              label="Xác nhận lại mật khẩu "
              variant="outlined"
              className="textField"
              sx={{ width: '50%' }}
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </Box>

          <Box className="registerRow">
            <TextField
              sx={{ width: '30%' }}
              className="textField"
              name="city"
              id="outlined-read-only-input"
              label="Thành phố"
              defaultValue="Thành phố Hồ Chí Minh "
              value={user.city}
              onChange={handleChange}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            {/* <TextField
              id="outlined-basic"
              select
              label="Quận / huyện"
              name="district"
              variant="outlined"
              className="textField"
              sx={{ width: '70%' }}
              value={user.district}
              onChange={handleChange}
            /> */}
            <FormControl fullWidth className="selectDistrict">
              <Select
                labelId="district-select-label"
                id="district-select"
                value={user.district}
                onChange={handleDistrictChange}
                label="Quận/Huyện"
                style={{ height: '47.38px' }} // Áp dụng chiều cao đồng nhất
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
              id="outlined-basic"
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
              <Button
                variant="text"
                sx={{
                  color: 'black',
                  fontSize: '1.2rem',
                  padding: '12px 24px',
                  height: '40px',
                  '&:hover': {
                    color: '#D6003A',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(242, 194, 207, 0.6)',
                  color: 'black',
                  fontSize: '1.2rem',
                  padding: '12px 24px',
                  height: '40px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'white',
                    border: '2px solid rgba(242, 194, 207, 0.5)',
                    boxShadow: 'none',
                  },
                }}
                onClick={handleSubmit}
              >
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
