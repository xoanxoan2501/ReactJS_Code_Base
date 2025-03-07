import { editAddressSchema, EditAddressSchemaType } from '@/utils/validationSchemas'
import { LayoutBox } from '@/views/Profile/components/LayoutBox'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import './EditAddress.css'
import CustomBreadcrumbs from '@/shared/components/custom-breadcrumbs/CustomBreadcrumbs'
import { routerAddress } from '@/views/AccountUser/Address/router'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Checkbox, FormControlLabel } from '@mui/material'
import { CustomButton } from '@/layout/header'
import { useAppDispatch, useAppSelector } from '@/shared/hook/reduxHooks'
import { useNavigate, useParams } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { updateProfileAPI } from '@/apis/auth'
import Swal from 'sweetalert2'

const EditAddress: FC = () => {
  const [districts, setDistricts] = useState<string[]>([])
  const addresses = useAppSelector((state) => state.profile.user?.addresses)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { index: addresIndex } = useParams()

  const formik = useFormik({
    initialValues: {
      fullname: '',
      phoneNumber: '',
      district: '',
      address: '',
      isDefault: false,
      province: 'Thành phố Hồ Chí Minh'
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Vui lòng nhập họ tên'),
      phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
      district: Yup.string().required('Vui lòng chọn quận/huyện'),
      address: Yup.string().required('Vui lòng nhập địa chỉ')
    }),
    onSubmit: (values) => {
      if (addresIndex) {
        if (!addresses) return

        const addressesToUpdate = cloneDeep(addresses)

        if (values.isDefault) {
          addressesToUpdate.forEach((address) => {
            address.isDefault = false
          })
        }

        addressesToUpdate[parseInt(addresIndex)] = values
        dispatch(updateProfileAPI({ addresses: addressesToUpdate }))
        Swal.fire('Đã cập nhật!', 'Đã cập nhật địa chỉ!', 'success')
        const path = routerAddress.generatePath?.()
        if (path) {
          navigate(path)
        }
      } else {
        const addressesToUpdate = cloneDeep(addresses)
        if (values.isDefault) {
          addressesToUpdate?.forEach((address) => {
            address.isDefault = false
          })
        }

        addressesToUpdate?.push(values)

        dispatch(updateProfileAPI({ addresses: addressesToUpdate }))
        Swal.fire('Đã thêm!', 'Đã thêm địa chỉ mới!', 'success')
        const path = routerAddress.generatePath?.()
        if (path) {
          navigate(path)
        }
      }
    }
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

  console.log('formik:', formik)

  useEffect(() => {
    if (addresses && addresIndex) {
      const address = addresses[parseInt(addresIndex)]
      formik.setValues({
        fullname: address.fullname,
        phoneNumber: address.phoneNumber,
        district: address.district,
        address: address.address,
        isDefault: address.isDefault,
        province: 'Thành phố Hồ Chí Minh'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresIndex, addresses])

  return (
    <LayoutBox>
      <Box>
        <CustomBreadcrumbs
          breadcrumbItems={[
            {
              label: 'Thông tin địa chỉ giao hàng',
              href: routerAddress.generatePath?.()
            },
            {
              label: addresIndex ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ'
            }
          ]}
          sx={{ padding: '10px' }}
        />
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ width: '60%', margin: '0 auto', height: '100%' }}
            spacing={2}
            px={2}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  placeholder='Họ và tên'
                  className='input_textField'
                  id='fullname'
                  type='text'
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                  <FormHelperText>
                    <Typography
                      sx={{
                        color: '#D32F2F'
                      }}
                      variant='subtitle1'
                    >
                      {formik.errors.fullname}
                    </Typography>
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder='Số điện thoại'
                  className='input_textField'
                  id='phoneNumber'
                  type='text'
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <FormHelperText>
                    <Typography
                      sx={{
                        color: '#D32F2F'
                      }}
                      variant='subtitle1'
                    >
                      {formik.errors.phoneNumber}
                    </Typography>
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className='input_textField'
                  InputProps={{ readOnly: true }}
                  variant='outlined'
                  value='Thành phố Hồ Chí Minh'
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={formik.touched.district && Boolean(formik.errors.district)}>
                  <Select
                    name='district'
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    displayEmpty
                    className='input_textField'
                  >
                    <MenuItem value='' disabled>
                      Chọn quận/huyện
                    </MenuItem>
                    {districts.map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.district && formik.errors.district && (
                    <FormHelperText>
                      <Typography variant='subtitle1'>{formik.errors.district}</Typography>
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder='Địa chỉ'
                  className='input_textField'
                  id='address'
                  type='text'
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                />
                {formik.touched.address && formik.errors.address && (
                  <FormHelperText>
                    <Typography
                      sx={{
                        color: '#D32F2F'
                      }}
                      variant='subtitle1'
                    >
                      {formik.errors.address}
                    </Typography>
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id='isDefault'
                      name='isDefault'
                      checked={formik.values.isDefault}
                      onChange={formik.handleChange}
                    />
                  }
                  label='Đặt làm địa chỉ mặc định'
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <CustomButton type='submit' variant='outlined' className='btn_submit'>
                  Lưu
                </CustomButton>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Box>
    </LayoutBox>
  )
}

export default EditAddress
