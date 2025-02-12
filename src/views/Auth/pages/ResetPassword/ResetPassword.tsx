import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  resetPasswordSchema,
  ResetPasswordSchemaType
} from '@/utils/validationSchemas'
import { toast } from 'react-toastify'
import { resetPasswordAPI } from '@/apis/auth/api'
import { routerLogin } from '@/views/Auth/pages/Login/router'

const ResetPassword = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const userId = location.state?.userId

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const handleChangePassword = (data: ResetPasswordSchemaType) => {
    resetPasswordAPI(userId, data.password, data.confirmPassword)
      .then((res) => {
        if (res.isResetPassword) {
          navigate(routerLogin.path, { replace: true })
          toast.success(res.message)
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
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
        variant="h5"
      >
        Tạo mật khẩu mới
      </Typography>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <Box
          className="form_forgot_password"
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
              id="outlined-password"
              label="Mật khẩu"
              variant="outlined"
              error={errors.password ? true : false}
              {...register('password')}
              sx={{ width: '500px' }}
            />
            {errors.password && (
              <Typography sx={{ marginTop: '4px', color: 'red' }}>
                {errors.password.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              id="outlined-confirm-password"
              label="Xác nhận mật khẩu"
              variant="outlined"
              error={errors.confirmPassword ? true : false}
              {...register('confirmPassword')}
              sx={{ width: '500px' }}
            />
            {errors.confirmPassword && (
              <Typography sx={{ marginTop: '4px', color: 'red' }}>
                {errors.confirmPassword.message}
              </Typography>
            )}
          </Box>
          <Button
            sx={{
              backgroundColor: '#F2C2CF80'
            }}
            variant="contained"
            type="submit"
          >
            Tiếp tục
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default ResetPassword
