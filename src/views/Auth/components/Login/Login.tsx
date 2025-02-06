import { Box, Button, TextField, Typography } from '@mui/material'
import './Login.scss'

type FieldType = {
  username: string
  password: string
  remember?: string
}

const Login = () => {

  return (
    <Box sx={{
      padding: '2rem 0'
	 }}>
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
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ width: '500px' }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ width: '500px' }}
        />
        <Button
          sx={{
            backgroundColor: '#F2C2CF80'
          }}
          variant="contained"
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
    </Box>
  )
}

export default Login
