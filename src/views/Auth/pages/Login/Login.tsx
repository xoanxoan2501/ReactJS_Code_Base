import { Box, Button, TextField, Typography } from '@mui/material'
import './Login.scss'
import { useForm } from 'react-hook-form'
import {
  loginSchema,
  LoginSchemaType
} from '@/modules/authentication/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { loginAPI } from '@/apis/auth'
import { useNavigate } from 'react-router-dom'
import { routerHome } from '@/views/home/router'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin = (data: LoginSchemaType) => {
    dispatch(loginAPI(data))
      .unwrap()
      .then(() => navigate(routerHome.path))
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
        Đăng nhập vào tài khoản
      </Typography>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Box
          className="form_login"
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
              id="outlined-basic"
              label="Email"
              variant="outlined"
              error={errors.email ? true : false}
              {...register('email')}
              sx={{ width: '500px' }}
            />
            {errors.email && (
              <Typography sx={{ marginTop: '4px', color: 'red' }}>
                {errors.email.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              variant="outlined"
              error={errors.password ? true : false}
              {...register('password')}
              autoComplete="current-password"
              sx={{ width: '500px' }}
            />
            {errors.password && (
              <Typography sx={{ marginTop: '4px', color: 'red' }}>
                {errors.password.message}
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
            Đăng nhập
          </Button>
          <Box
            sx={{
              width: '500px',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.75rem'
            }}
          >
            <Typography
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
              variant="subtitle1"
            >
              Bạn không có tài khoản? Đăng ký
            </Typography>
            <Typography
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
              variant="subtitle1"
            >
              Quên mật khẩu?
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default Login
