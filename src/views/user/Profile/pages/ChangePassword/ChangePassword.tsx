import { LayoutBox } from '@/views/user/Profile/components/LayoutBox'
import { Button, Stack, TextField, Typography } from '@mui/material'
import iconBack from '@/assets/icons/iconBack.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { set } from 'lodash'
import { toast } from 'react-toastify'
import { changePasswordAPI } from '@/apis/auth/api'

// useState, useEffect

const ChangePassword = () => {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp')
    }

    const data = await changePasswordAPI(currentPassword, newPassword, confirmPassword)

    toast.success(data.message)

    navigate(-1)
  }

  return (
    <LayoutBox>
      <Stack direction={'column'} sx={{ padding: '2rem' }}>
        <img
          src={iconBack}
          alt='FaceBook'
          className='icon_hover'
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%'
          }}
          onClick={() => navigate(-1)}
        />
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          spacing={2}
          sx={{ marginTop: '2rem' }}
        >
          <Stack direction={'row'} spacing={4} alignItems={'center'} sx={{ width: '70%' }}>
            <Typography sx={{ width: '28%' }} variant='h6'>
              Mật khẩu hiện tại:
            </Typography>
            <TextField
              sx={{
                width: '70%',
                marginLeft: '1rem !important',
                backgroundColor: 'white',
                '& .MuiInputBase-input': {
                  color: 'black'
                },
                '& .MuiInputLabel-root': {
                  color: 'black'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black'
                  },
                  '&:hover fieldset': {
                    borderColor: 'black'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black'
                  }
                },
                borderColor: 'black',
                borderRadius: '5px'
              }}
              id='current-password'
              type='password'
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
            />
          </Stack>
          <Stack direction={'row'} spacing={4} alignItems={'center'} sx={{ width: '70%' }}>
            <Typography sx={{ width: '28%' }} variant='h6'>
              Mật khẩu mới:
            </Typography>
            <TextField
              sx={{
                width: '70%',
                marginLeft: '1rem !important',
                backgroundColor: 'white',
                '& .MuiInputBase-input': {
                  color: 'black'
                },
                '& .MuiInputLabel-root': {
                  color: 'black'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black'
                  },
                  '&:hover fieldset': {
                    borderColor: 'black'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black'
                  }
                },
                borderColor: 'black',
                borderRadius: '5px'
              }}
              id='new-password'
              type='password'
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </Stack>
          <Stack direction={'row'} spacing={4} alignItems={'center'} sx={{ width: '70%' }}>
            <Typography sx={{ width: '28%' }} variant='h6'>
              Xác nhận mật khẩu:
            </Typography>
            <TextField
              sx={{
                width: '70%',
                marginLeft: '1rem !important',
                backgroundColor: 'white',
                '& .MuiInputBase-input': {
                  color: 'black'
                },
                '& .MuiInputLabel-root': {
                  color: 'black'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black'
                  },
                  '&:hover fieldset': {
                    borderColor: 'black'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black'
                  }
                },
                borderColor: 'black',
                borderRadius: '5px'
              }}
              id='confirm-password'
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Stack>
          <Stack direction={'row'} spacing={2} justifyContent={'center'}>
            <Button
              sx={{
                backgroundColor: '#DC567A',
                '&:hover': {
                  color: 'black'
                }
              }}
              variant='contained'
              type='button'
              onClick={handleChangePassword}
            >
              Tiếp tục
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutBox>
  )
}

export default ChangePassword
