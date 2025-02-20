import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import imageLogin from '@/assets/images/imageLogin.png'
import {
  loginSchema,
  LoginSchemaType
} from '@/modules/authentication/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { routerAdminDashboard } from '@/admin/views/Dashboard.tsx/router'
import { loginAPI } from '@/apis/auth'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
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
      .then(() => navigate(routerAdminDashboard.path))
  }

  return (
    <Stack direction={'row'} spacing={2}>
      <Stack sx={{ flex: 1 }}>
        <img
          style={{
            maxHeight: '100vh'
          }}
          src={imageLogin}
          alt="Login"
        />
      </Stack>
      <Stack
        sx={{ flex: 1 }}
        direction={'column'}
        justifyContent={'center'}
        spacing={8}
      >
        <Typography
          variant="h2"
          sx={{
            color: '#086191',
            marginBottom: '3rem',
            fontFamily: 'Jaini',
            fontWeight: '400'
          }}
        >
          WELLCOME!!!
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack direction={'column'} spacing={2}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                error={errors.email ? true : false}
                {...register('email')}
                sx={{
                  width: '500px',
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#086191',
                      color: '#086191'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#086191',
                      color: '#086191'
                    }
                  },
                  '& label.Mui-focused': {
                    color: '#086191'
                  },
                  '&:hover label': {
                    color: '#086191'
                  }
                }}
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
                sx={{
                  width: '500px',
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#086191',
                      color: '#086191'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#086191',
                      color: '#086191'
                    }
                  },
                  '& label.Mui-focused': {
                    color: '#086191'
                  },
                  '&:hover label': {
                    color: '#086191'
                  }
                }}
              />
              {errors.password && (
                <Typography sx={{ marginTop: '4px', color: 'red' }}>
                  {errors.password.message}
                </Typography>
              )}
            </Box>
            <Stack
              direction={'column'}
              alignItems={'center'}
              sx={{
                width: '500px',

                marginTop: '0.75rem'
              }}
              spacing={2}
            >
              <Button
                sx={{
                  backgroundColor: '#08619140',
                  border: '1px solid #086191'
                }}
                variant="contained"
                type="submit"
              >
                Đăng nhập
              </Button>
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
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}

export default AdminLogin
