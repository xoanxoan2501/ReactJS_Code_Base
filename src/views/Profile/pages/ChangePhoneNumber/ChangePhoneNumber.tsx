import { LayoutBox } from '@/views/Profile/components/LayoutBox'
import { Button, Stack, TextField, Typography } from '@mui/material'
import iconBack from '@/assets/icons/iconBack.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ChangePhoneNumber = () => {
  const navigate = useNavigate()
  const [issentOTP, setIssentOTP] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (issentOTP && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setIssentOTP(false)
    }
    return () => clearTimeout(timer)
  }, [issentOTP, countdown])

  return (
    <LayoutBox>
      <Stack direction={'column'} sx={{ padding: '2rem' }}>
        <img
          src={iconBack}
          alt="FaceBook"
          className="icon_hover"
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
          sx={{ marginTop: '5rem' }}
        >
          <Stack
            direction={'row'}
            spacing={4}
            alignItems={'center'}
            sx={{ width: '60%' }}
          >
            <Typography sx={{ width: '24%' }} variant="h6">
              Số điện thoại:
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
              id="phone-number"
              type="tel"
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              value={newPhoneNumber}
            />
          </Stack>
          <Stack
            direction={'row'}
            spacing={4}
            alignItems={'center'}
            sx={{ width: '60%' }}
          >
            <Typography sx={{ width: '24%' }} variant="h6">
              Mã OTP:
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
              id="otp"
              type="text"
              disabled={!issentOTP}
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle1">
              {issentOTP
                ? `Mã OTP đã được gửi, có thể gửi lại sau ${countdown}s`
                : ''}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2} justifyContent={'center'}>
            <Button
              sx={{
                backgroundColor: '#DC567A',
                '&:hover': {
                  color: 'black'
                }
              }}
              variant="contained"
              type="button"
              onClick={() => {
                if (!newPhoneNumber) {
                  toast.error('Vui lòng nhập số điện thoại')
                  return
                }
                setIssentOTP(true)
                setCountdown(10)
              }}
              disabled={issentOTP}
            >
              Gửi mã
            </Button>
            <Button
              sx={{
                backgroundColor: '#DC567A',
                '&:hover': {
                  color: 'black'
                }
              }}
              variant="contained"
              type="button"
              disabled={!issentOTP}
              onClick={() => {
                if (!otp) {
                  toast.error('Vui lòng nhập mã OTP')
                  return
                }
                toast.success('Thay đổi số điện thoại thành công')
              }}
            >
              Xác nhận
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutBox>
  )
}

export default ChangePhoneNumber
