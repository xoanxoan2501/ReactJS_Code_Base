import React, { useState } from 'react'
import { Box, Button, Typography, Grid, Stack } from '@mui/material'
import { Image } from '@mui/icons-material'
import ProductManagementLayout from './layout'
import TextFieldCustom from './TextFieldCustom'
import SelectCustom from './SelectCustom'
import { useLocation } from 'react-router-dom'
import { routerAddProduct } from './router'

const color = {
  deepBlue: '#086191'
}

export default function FormProduct() {
  const [sizes, setSizes] = useState([{ size: '', price: '' }])
  const [mainImage, setMainImage] = useState(null)
  const [detailImages, setDetailImages] = useState<File[]>([])
  const location = useLocation()
  const isAddPage = location.pathname.includes(routerAddProduct.path)

  const handleAddSize = () => {
    setSizes([...sizes, { size: '', price: '' }])
  }

  const handleSizeChange = (index: number, field: 'size' | 'price', value: string) => {
    const newSizes = [...sizes]
    newSizes[index][field] = value
    setSizes(newSizes)
  }

  const handleMainImageUpload = (e) => {
    setMainImage(e.target.files[0])
  }

  const handleDetailImagesUpload = (e) => {
    setDetailImages([...detailImages, ...e.target.files])
  }

  return (
    <ProductManagementLayout>
      <Box p={2} bgcolor='#e5f5ff' borderRadius={2}>
        {/* Title */}
        <Stack
          sx={{
            borderBottom: `2px solid ${color.deepBlue}`
          }}
        >
          <Typography variant='h6' mb={2}>
            {isAddPage ? 'Tạo mới' : 'Thông tin'} sản phẩm
          </Typography>
        </Stack>
        {/* Form */}
        <Box mt={2} p={3} borderRadius={2}>
          <Grid container spacing={2}>
            {/* Base Infor */}
            <TextFieldCustom label='Mã sản phẩm' value='' onChange={() => {}} size={{ xs: 6, sm: 3 }} />
            <TextFieldCustom label='Tên sản phẩm' value='' onChange={() => {}} size={{ xs: 6, sm: 3 }} />
            <TextFieldCustom label='Mã code' value='' onChange={() => {}} size={{ xs: 6, sm: 3 }} />
            <SelectCustom size={{ xs: 6, sm: 3 }} />

            {/* Sizes */}
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                {sizes.map((item, index) => (
                  <Grid item sm={24} key={index} display={{ xs: 'block', sm: 'flex' }} gap={2} pb={2}>
                    <TextFieldCustom
                      label='Size'
                      value={item.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      size={{ xs: 6, sm: 6 }}
                    />
                    <TextFieldCustom
                      label='Giá tiền'
                      value={item.price}
                      onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                      size={{ xs: 6, sm: 6 }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                <Button
                  variant='outlined'
                  onClick={handleAddSize}
                  sx={{ borderColor: 'black', p: '0px 0px', textTransform: 'none' }}
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>

            {/* Image Uploads */}
            <Grid item xs={12} sm={6} direction={'column'} sx={{ display: 'flex' }} gap={1}>
              <Grid item xs={12} sm={6} display='flex' alignItems={'center'} gap={2} sx={{ maxHeight: '50px' }}>
                <Typography>Ảnh chính sản phẩm:</Typography>
                <Button
                  variant='outlined'
                  component='label'
                  startIcon={<Image />}
                  sx={{ textTransform: 'none', backgroundColor: `${color.deepBlue}`, color: 'white' }}
                >
                  Chọn ảnh
                  <input hidden type='file' accept='image/*' onChange={handleMainImageUpload} />
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} display='flex' alignItems={'center'} gap={2} sx={{ maxHeight: '50px' }}>
                <Typography>Ảnh chi tiết sản phẩm:</Typography>
                <Button
                  variant='outlined'
                  component='label'
                  startIcon={<Image />}
                  sx={{ textTransform: 'none', backgroundColor: `${color.deepBlue}`, color: 'white' }}
                >
                  Chọn ảnh
                  <input hidden type='file' accept='image/*' onChange={handleMainImageUpload} />
                </Button>
              </Grid>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography>Mô tả sản phẩm:</Typography>

              <TextFieldCustom
                multiline
                rows={4}
                placeholder='Nhập mô tả sản phẩm...'
                size={{ xs: 12, sm: 24 }}
                sx={{
                  backgroundColor: 'white'
                }}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} display='flex' justifyContent='center' gap={2} mt={2}>
              <Button variant='contained' color='success'>
                Lưu
              </Button>
              <Button variant='contained' color='error'>
                Hủy
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ProductManagementLayout>
  )
}
