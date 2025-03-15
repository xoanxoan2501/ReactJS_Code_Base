import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { forgotPasswordSchema, ForgotPasswordSchemaType, OTPSchema, OTPSchemaType } from '@/utils/validationSchemas'
import { forgotPasswordAPI, verifyOTPAPI } from '@/apis/auth/api'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { routerResetPassword } from '@/views/user/Auth/pages/ResetPassword/router'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP }
  } = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema)
  })

  const handleContinue = (data: ForgotPasswordSchemaType) => {
    forgotPasswordAPI(data.email)
      .then((res) => {
        if (res.isSendOTP) {
          setUserId(res.userId)
          reset()
          toast.success(res.message)
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  const handleValidateOTP = (data: OTPSchemaType) => {
    verifyOTPAPI(userId, data.otp)
      .then((res: { isCorrect: boolean; message: string; verifyToken: string }) => {
        if (res.isCorrect) {
          reset()
          toast.success(res.message)
          navigate(routerResetPassword.path, {
            state: { userId, verifyToken: res.verifyToken }
          })
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  if (userId) {
    return (
      <Box
        sx={{
          padding: '2rem 0'
        }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '2.5rem'
          }}
          variant='h5'
        >
          Quên mật khẩu
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '1.5rem'
          }}
          variant='subtitle1'
        >
          Vui lòng nhập mã otp đã được gửi đến email của bạn!
        </Typography>
        <form onSubmit={handleSubmitOTP(handleValidateOTP)}>
          <Box
            className='form_otp'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '2rem'
            }}
          >
            <Box>
              <TextField
                id='outlined-otp'
                label='OTP'
                variant='outlined'
                error={errorsOTP.otp ? true : false}
                {...registerOTP('otp')}
                sx={{ width: '500px' }}
              />
              {errorsOTP.otp && (
                <Typography sx={{ marginTop: '4px', color: 'red' }}>{errorsOTP.otp.message}</Typography>
              )}
            </Box>
            <Button
              sx={{
                backgroundColor: '#F2C2CF80'
              }}
              variant='contained'
              type='submit'
            >
              Tiếp tục
            </Button>
          </Box>
        </form>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        padding: '2rem 0'
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '2.5rem'
        }}
        variant='h5'
      >
        Quên mật khẩu
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '1.5rem'
        }}
        variant='subtitle1'
      >
        Vui lòng nhập email, chúng tôi sẽ gửi mã otp đến email của bạn!
      </Typography>
      <form onSubmit={handleSubmit(handleContinue)}>
        <Box
          className='form_forgot_password'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem'
          }}
        >
          <Box>
            <TextField
              id='outlined-email'
              label='Email'
              variant='outlined'
              error={errors.email ? true : false}
              {...register('email')}
              sx={{ width: '500px' }}
            />
            {errors.email && <Typography sx={{ marginTop: '4px', color: 'red' }}>{errors.email.message}</Typography>}
          </Box>
          <Button
            sx={{
              backgroundColor: '#F2C2CF80'
            }}
            variant='contained'
            type='submit'
          >
            Tiếp tục
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default ForgotPassword
