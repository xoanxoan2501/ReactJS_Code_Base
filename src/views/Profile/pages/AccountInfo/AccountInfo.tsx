import { useAppSelector } from '@/shared/hook/reduxHooks'
import { LayoutBox } from '@/views/Profile/components/LayoutBox'
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import iconFB from '@/assets/icons/iconFB.png'
import iconGoogle from '@/assets/icons/iconGoogle.png'
import { useNavigate } from 'react-router-dom'
import { routerChangePhoneNumber } from '@/views/Profile/pages/ChangePhoneNumber/router'
import { routerChangePassword } from '@/views/Profile/pages/ChangePassword/router'
import { toast } from 'react-toastify'
import './AccountInfo.css'
import profileStore, { updateProfileAPI } from '@/apis/auth'
import UserEntity from '@/modules/user/entity'
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { changeInfomationAPI } from '@/apis/auth/api'
import { useDispatch } from 'react-redux'
const AccountInfo = () => {
  const dispatch = useDispatch()
  const userLogin = useAppSelector((state) => state.profile.user)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    userLogin?.dateOfBirth ? dayjs(userLogin.dateOfBirth) : dayjs()
  )
  const [fullname, setFullname] = useState(userLogin?.fullname)
  const [gender, setGender] = useState("male")
  const navigate = useNavigate()

  const handleDateChange = async (newValue: dayjs.Dayjs | null) => {
    await setSelectedDate(newValue ?? dayjs())
  }

  const handleChangeInfo = async () => {
    if (!fullname || fullname.trim() === '') {
      toast.error('Không được để trống họ tên')
      return
    }

    const formattedDateOfBirth = selectedDate ? selectedDate.valueOf() : Date.now()

    const updatedData = {
      fullname,
      dateOfBirth: formattedDateOfBirth,
      updatedAt: dayjs(),
      createdAt: userLogin?.createdAt
    }

    try {
      if (updatedData) {
        await changeInfomationAPI(updatedData.fullname || ' ', updatedData.dateOfBirth)

        dispatch(profileStore.actions.updateUser({ fullname: updatedData.fullname, dateOfBirth: updatedData.dateOfBirth }))

        toast.success('Cập nhật thông tin thành công')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật thông tin')
    }
  }

  return (
    <LayoutBox>
      <Stack direction={'row'} sx={{ padding: '2rem' }}>
        <Stack sx={{ flex: 1 }} direction={'column'} alignItems={'center'}>
          <Avatar
            sx={{ width: 100, height: 100, border: '2px solid black' }}
            alt='tddev'
            src={userLogin?.avatar || ''}
          />
        </Stack>
        <Stack sx={{ flex: 2 }} direction={'column'} spacing={2.5}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6'>Họ và tên:</Typography>
            <TextField className='input_textField' id='full-name' type='text' onChange={(e) => setFullname(e.target.value)} value={fullname} />
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6'>Ngày sinh:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  className='input_textField'
                  value={selectedDate}
                  format='DD/MM/YYYY'
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6'>Giới tính:</Typography>
            <FormControl sx={{ width: '70%', marginLeft: '1rem !important' }}>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={gender || "male"}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value='male'
                  control={<Radio className='radio' />}
                  label='Male'
                  sx={{ marginLeft: '1.5rem' }}
                />
                <FormControlLabel
                  value='female'
                  control={<Radio className='radio' />}
                  label='Female'
                  sx={{ marginLeft: '1.5rem' }}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              position: 'relative'
            }}
          >
            <Button
              sx={{
                backgroundColor: '#DC567A',
                position: 'absolute',
                transform: 'translate(-50%, 50%)',
                '&:hover': {
                  color: 'black'
                }
              }}
              variant='contained'
              type='button'
              onClick={handleChangeInfo}
            >
              Chỉnh sửa
            </Button>
          </Stack>
        </Stack>
        <Stack sx={{ flex: 2.2, width: '100%' }} direction={'column'} spacing={2.5}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6'>Số điện thoại:</Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                className='input_disabled'
                id='full-name'
                type='text'
                sx={{ width: '75%', backgroundColor: 'white' }}
                value={userLogin?.phoneNumber}
                disabled={true}
              />
              <Typography
                variant='h6'
                className='typography_hover'
                onClick={() => navigate(routerChangePhoneNumber.path)}
              >
                Cập nhật
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6'>Email:</Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                className='input_disabled'
                fullWidth
                id='full-name'
                type='email'
                sx={{ width: '75%', backgroundColor: 'white' }}
                value={userLogin?.email}
                disabled={true}
              />
            </Stack>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6'>Mật khẩu:</Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                fullWidth
                className='input_disabled'
                id='full-name'
                type='password'
                value={'******'}
                sx={{ width: '75%', backgroundColor: 'white' }}
                disabled={true}
              />
              <Typography variant='h6' className='typography_hover' onClick={() => navigate(routerChangePassword.path)}>
                Cập nhật
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'column'} spacing={2}>
            <Typography variant='h6'>Liên kết mạng xã hội:</Typography>
            <Stack direction={'row'} alignItems={'center'}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <img
                  src={iconFB}
                  alt='FaceBook'
                  className='icon_hover'
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid black'
                  }}
                />
                <Typography variant='h6'>Facebook</Typography>
              </Stack>
              <Typography
                sx={{
                  marginLeft: 'auto',
                  marginRight: '5rem'
                }}
                variant='h6'
              >
                Liên kết
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <img
                  src={iconGoogle}
                  alt='Google'
                  className='icon_hover'
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid black'
                  }}
                />
                <Typography variant='h6'>Google</Typography>
              </Stack>
              <Typography
                sx={{
                  marginLeft: 'auto',
                  marginRight: '5rem'
                }}
                variant='h6'
              >
                Liên kết
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </LayoutBox>
  )
}

export default AccountInfo

