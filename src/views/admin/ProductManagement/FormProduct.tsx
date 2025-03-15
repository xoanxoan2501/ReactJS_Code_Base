import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Typography, Grid, Stack } from '@mui/material'
import { Skeleton } from 'antd'
import { Delete, Image } from '@mui/icons-material'
import ProductManagementLayout from './layout'
import TextFieldCustom from './TextFieldCustom'
import SelectCustom from './SelectCustom'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { routerAddProduct, routerProductManagement } from './router'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Product, ProductSchema } from './FormZod'
import { useCategoryInfo } from '@/apis/category/use-category-info'
import { useAddProduct } from '@/apis/product/use-add-product'
import { toast } from 'react-toastify'
import { useUpdateProduct } from '@/apis/product/use-update-product'
import { useGetAllProducts } from '@/apis/product/use-get-all-product'

export const color = {
  deepBlue: '#086191'
}

export default function FormProduct() {
  const [sizes, setSizes] = useState([{ size: '', price: '' }])
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { data: categories } = useCategoryInfo()
  const { mutateAsync: AddProduct, isPending: isPendingAdd, error: errorAdd } = useAddProduct()
  const { mutateAsync: UpdateProduct, isPending: isPendingUpdate, error: errorUpdate } = useUpdateProduct()
  const location = useLocation()
  const isAddPage = location.pathname.includes(routerAddProduct.path)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { data: productsData } = useGetAllProducts()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    mode: 'onBlur'
  })

  useEffect(() => {
    if (!isAddPage && productsData) {
      const productInfo = productsData?.data.find((product) => product._id === id)
      if (productInfo) {
        setSizes(
          productInfo.sizes?.map((size) => ({
            ...size,
            price: size.price?.toString() || ''
          })) || [{ size: '', price: '' }]
        )

        reset({
          title: productInfo.title,
          code: productInfo.code,
          categoryId: productInfo.categoryId,
          description: productInfo.description,
          thumbnail: productInfo.thumbnail,
          images: productInfo.images,
          sizes: productInfo.sizes?.map((size) => ({
            ...size,
            price: size.price,
            stock: size.stock
          })) || [{ size: '', price: 0, stock: 0 }]
        })
      }
    }
  }, [isAddPage, id, productsData, reset, setValue])

  useEffect(() => {
    const thumbnail = watch('thumbnail')

    if (typeof thumbnail === 'string') {
      setPreviewThumbnail(thumbnail)
    } else if (thumbnail instanceof Uint8Array) {
      // Nếu là Uint8Array, convert thành URL để hiển thị ảnh preview
      const blob = new Blob([thumbnail], { type: 'image/png' })
      const objectUrl = URL.createObjectURL(blob)
      setPreviewThumbnail(objectUrl)

      // Cleanup URL khi component unmount hoặc giá trị thay đổi
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [watch])

  // Nếu images chứa link ảnh, giữ nguyên khi hiển thị
  useEffect(() => {
    const currentImages = watch('images')
    if (Array.isArray(currentImages)) {
      setPreviewImages(
        currentImages.map((img) => (typeof img === 'string' ? img : URL.createObjectURL(new Blob([img]))))
      )
    }
  }, [watch])

  useEffect(() => {
    return () => {
      if (previewThumbnail) URL.revokeObjectURL(previewThumbnail)
      previewImages.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewThumbnail, previewImages])

  const handleThumbnailChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const thumbnail = e.target.files?.[0]
      if (!thumbnail) return

      setPreviewThumbnail(URL.createObjectURL(thumbnail))

      const arrayBuffer = await thumbnail.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      setValue('thumbnail', uint8Array)
    },
    [setValue]
  )

  const handleImagesChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const images = e.target.files
      if (!images) return

      // Tạo URL hiển thị ảnh
      const previewUrls = Array.from(images).map((image) => URL.createObjectURL(image))
      setPreviewImages((prev) => [...prev, ...previewUrls])

      // Chuyển hình ảnh thành Uint8Array
      const buffers = await Promise.all(
        Array.from(images).map(async (image) => {
          const arrayBuffer = await image.arrayBuffer()
          return new Uint8Array(arrayBuffer)
        })
      )

      // Cập nhật vào form
      const updatedImages = [...(watch('images') || []), ...buffers]
      setValue('images', updatedImages)
    },
    [setValue, watch]
  )

  const handleRemoveThumbnail = useCallback(() => {
    setPreviewThumbnail(null)
    setValue('thumbnail', new Uint8Array())
  }, [setValue])

  const handleRemoveImages = useCallback(
    (index: number) => {
      setPreviewImages((prev) => {
        const newImages = prev.filter((_, i) => i !== index)
        return newImages
      })
      setValue(
        'images',
        previewImages.filter((_, i) => i !== index)
      )
    },
    [setValue, previewImages]
  )

  const handleRemoveAllImages = useCallback(() => {
    setPreviewImages([])
    setValue('images', [])
  }, [setValue])

  useEffect(() => {
    setFocus('title')
  }, [setFocus])

  const handleAddSize = useCallback(() => {
    setSizes([...sizes, { size: '', price: '' }])
  }, [sizes])

  const createFormData = useCallback(
    (data: Product) => {
      const formData = new FormData()
      const images: string[] = []

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'thumbnail' && value instanceof Uint8Array) {
          formData.append('thumbnail', new Blob([value], { type: 'image/png' }), 'thumbnail.png')
        } else if (key === 'images' && Array.isArray(value)) {
          value.forEach((image, index) => {
            if (image instanceof Uint8Array) {
              // Nếu là Uint8Array, append như file ảnh
              formData.append('images', new Blob([image], { type: 'image/png' }), `image_${index}.png`)
            } else if (typeof image === 'string' && image.startsWith('http')) {
              // Nếu là URL, thêm vào mảng JSON
              images.push(image)
            }
          })
          // Nếu có URL, thêm vào FormData dưới dạng JSON string
          if (images.length > 0 && !isAddPage) {
            formData.append('imagesURL', JSON.stringify(images))
          }
        } else if (key === 'sizes' && Array.isArray(value)) {
          formData.append('sizes', JSON.stringify(data.sizes))
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      return formData
    },
    [isAddPage]
  )

  const onSubmit: SubmitHandler<Product> = useCallback(
    (data: Product) => {
      const formData = createFormData(data)
      if (isAddPage) {
        AddProduct(formData).then((res) => {
          toast.success('Thêm sản phẩm thành công')
          setPreviewImages([])
          setPreviewThumbnail(null)
          reset()
          reset({
            title: res.title,
            code: res.code,
            categoryId: res.categoryId,
            description: res.description,
            thumbnail: res.thumbnail,
            images: res.images,
            sizes: res.sizes?.map((size) => ({
              ...size,
              price: size.price,
              stock: size.stock
            })) || [{ size: '', price: 0, stock: 0 }]
          })
          navigate(routerProductManagement.path)
        })
      } else {
        UpdateProduct({ body: formData, id: id || '' }).then((res) => {
          toast.success('Cập nhật sản phẩm thành công')
          reset({
            title: res.product.title,
            code: res.product.code,
            categoryId: res.product.categoryId,
            description: res.product.description,
            thumbnail: res.product.thumbnail,
            images: res.product.images,
            sizes: res.product.sizes?.map((size) => ({
              ...size,
              price: size.price,
              stock: size.stock
            })) || [{ size: '', price: 0, stock: 0 }]
          })
          setPreviewThumbnail(res.product.thumbnail || null)
          setPreviewImages(res.product.images || [])
        })
      }
    },
    [AddProduct, UpdateProduct, createFormData, id, isAddPage, navigate, reset]
  )

  const onError = (errors: unknown) => {
    console.error(errors)
  }

  if (isPendingAdd || isPendingUpdate) return <Skeleton active />
  if (errorAdd || errorUpdate) {
    if (errorUpdate) toast.error(errorUpdate.message)
    if (errorAdd) toast.error(errorAdd.message)
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
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {' '}
          {/* Thêm handleSubmit */}
          <Box mt={2} p={3} borderRadius={2}>
            {' '}
            <Grid container spacing={2}>
              {/* Base Infor */}
              {/* <TextFieldCustom label='Mã sản phẩm' size={{ xs: 6, sm: 3 }} name='_id' control={control} /> */}
              <TextFieldCustom label='Tên sản phẩm' size={{ xs: 6, sm: 3 }} name='title' control={control} />
              <TextFieldCustom label='Mã code' size={{ xs: 6, sm: 3 }} name='code' control={control} />

              <SelectCustom
                name='categoryId'
                control={control}
                size={{ xs: 6, sm: 3 }}
                options={
                  categories
                    ? categories.map((category) => ({ value: category._id, label: category.name }))
                    : [{ value: '', label: '' }]
                }
              />

              {/* Sizes */}
              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  {sizes.map((item, index) => (
                    <Grid item sm={24} key={index} display={{ xs: 'block', sm: 'flex' }} gap={2} pb={2}>
                      <TextFieldCustom
                        label='Size'
                        size={{ xs: 6, sm: 6 }}
                        name={`sizes.${index}.size`}
                        control={control}
                      />
                      <TextFieldCustom
                        label='Giá tiền'
                        size={{ xs: 6, sm: 6 }}
                        name={`sizes.${index}.price`}
                        control={control}
                      />
                      <TextFieldCustom
                        label='Số lượng'
                        size={{ xs: 6, sm: 6 }}
                        name={`sizes.${index}.stock`}
                        control={control}
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
              <Grid item xs={12} sm={6} direction='column' sx={{ display: 'flex' }} gap={1}>
                {/* Ảnh chính */}
                <Grid item xs={12} sm={6} display='flex' alignItems='center' gap={2} sx={{ maxHeight: '100px' }}>
                  <Typography>Ảnh chính sản phẩm:</Typography>
                  {!previewThumbnail && (
                    <Button
                      variant='outlined'
                      component='label'
                      startIcon={<Image />}
                      sx={{ textTransform: 'none', backgroundColor: '#1976d2', color: 'white' }}
                    >
                      Chọn ảnh
                      <input type='file' onChange={handleThumbnailChange} hidden />
                    </Button>
                  )}
                  {previewThumbnail && (
                    <>
                      <img
                        src={
                          typeof previewThumbnail === 'string'
                            ? previewThumbnail
                            : URL.createObjectURL(new Blob([previewThumbnail]))
                        }
                        alt='Ảnh chính sản phẩm'
                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <Button variant='outlined' color='error' onClick={handleRemoveThumbnail}>
                        Xóa
                      </Button>
                    </>
                  )}
                </Grid>

                {/* Ảnh chi tiết */}
                <Grid item xs={12} sm={6} display='flex' alignItems='center' gap={2} sx={{ maxHeight: '50px' }}>
                  <Typography>Ảnh chi tiết sản phẩm:</Typography>
                  {previewImages.length === 0 ? (
                    <Button
                      variant='outlined'
                      component='label'
                      startIcon={<Image />}
                      sx={{ textTransform: 'none', backgroundColor: '#1976d2', color: 'white' }}
                    >
                      Chọn ảnh
                      <input type='file' multiple onChange={handleImagesChange} hidden />
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      component='label'
                      startIcon={<Image />}
                      sx={{ textTransform: 'none', backgroundColor: '#1976d2', color: 'white' }}
                    >
                      Thêm ảnh
                      <input type='file' multiple onChange={handleImagesChange} hidden />
                    </Button>
                  )}
                </Grid>

                {errors.images && <p>{errors.images.message}</p>}

                {/* Hiển thị ảnh chi tiết */}
                <Grid item xs={12} sm={6} display='flex' flexDirection='column' gap={2}>
                  <Grid container spacing={2}>
                    {previewImages.map((url, index) => (
                      <Grid item key={url}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <img
                            src={typeof url === 'string' ? url : URL.createObjectURL(new Blob([url]))}
                            alt={`Ảnh chi tiết ${index + 1}`}
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <Button
                            size='small'
                            variant='contained'
                            color='error'
                            onClick={() => handleRemoveImages(index)}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              minWidth: '24px',
                              height: '24px',
                              padding: 0,
                              fontSize: '10px'
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                  {previewImages.length > 0 && (
                    <Button
                      startIcon={<Delete color='error' />}
                      variant='outlined'
                      color='error'
                      onClick={handleRemoveAllImages}
                      sx={{
                        width: 'auto', // ✅ Không chiếm 100% chiều rộng
                        maxWidth: '170px', // (tuỳ chỉnh nếu cần)
                        display: 'inline-flex' // ✅ Giữ kích thước tự nhiên
                      }}
                    >
                      Xóa tất cả ảnh
                    </Button>
                  )}
                </Grid>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Typography>Mô tả sản phẩm:</Typography>

                <TextFieldCustom
                  multiline
                  rows={4}
                  placeholder='Nhập mô tả sản phẩm...'
                  sx={{
                    backgroundColor: 'white'
                  }}
                  size={{ xs: 6, sm: 12 }}
                  name={'description'}
                  control={control}
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} display='flex' justifyContent='center' gap={2} mt={2}>
                <Button type='submit' variant='contained' color='success' onClick={() => {}}>
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    navigate(-1)
                  }}
                  variant='contained'
                  color='error'
                >
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </ProductManagementLayout>
  )
}
