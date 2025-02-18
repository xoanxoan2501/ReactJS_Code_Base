import { useAppSelector } from '@/shared/hook/reduxHooks'
import { LayoutBox } from '@/views/Profile/components/LayoutBox'
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
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

const AccountInfo = () => {
  const userLogin = useAppSelector((state) => state.profile.user)
  const [selectedDate, setSelectedDate] = useState(dayjs('2003-01-25'))

  const navigate = useNavigate()

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setSelectedDate(newValue)
    }
  }

  return (
    <LayoutBox>
      <Stack direction={'row'} sx={{ padding: '2rem' }}>
        <Stack sx={{ flex: 1 }} direction={'column'} alignItems={'center'}>
          <Avatar
            sx={{ width: 100, height: 100, border: '2px solid black' }}
            alt="tddev"
            src={userLogin?.avatar || ''}
          />
        </Stack>
        <Stack sx={{ flex: 2 }} direction={'column'} spacing={2.5}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h6">Họ và tên:</Typography>
            <TextField
              sx={{
                width: '70%',
                marginLeft: '1rem !important',
                borderRadius: '5px',
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
                borderColor: 'black'
              }}
              id="full-name"
              type="text"
              value={userLogin?.fullname}
            />
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h6">Ngày sinh:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{
                    width: '70%',
                    marginLeft: '1rem !important',
                    borderRadius: '5px',
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
                    }
                  }}
                  value={dayjs(selectedDate, 'DD/MM/YYYY')}
                  format="DD/MM/YYYY"
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h6">Giới tính:</Typography>
            <FormControl sx={{ width: '70%', marginLeft: '1rem !important' }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={userLogin?.gender || 'male'}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: 'black',
                        '&.Mui-checked': {
                          color: 'black'
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 30
                        }
                      }}
                    />
                  }
                  label="Male"
                  sx={{ marginLeft: '1.5rem' }}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: 'black',
                        '&.Mui-checked': {
                          color: 'black'
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 30
                        }
                      }}
                    />
                  }
                  label="Female"
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
              variant="contained"
              type="button"
            >
              Chỉnh sửa
            </Button>
          </Stack>
        </Stack>
        <Stack sx={{ flex: 2.2 }} direction={'column'} spacing={2.5}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h6">Số điện thoại:</Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                sx={{
                  width: '70%',
                  marginLeft: '1rem !important',
                  borderRadius: '5px',
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
                  borderColor: 'black'
                }}
                id="full-name"
                type="text"
                value={userLogin?.phoneNumber}
                disabled={true}
              />
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    color: '#DC567A',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate(routerChangePhoneNumber.path)}
              >
                Cập nhật
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h6">Email:</Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                sx={{
                  width: '70%',
                  marginLeft: '1rem !important',
                  borderRadius: '5px',
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
                  borderColor: 'black'
                }}
                id="full-name"
                type="email"
                value={userLogin?.email}
                disabled={true}
              />
              {/* <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    color: '#DC567A',
                    cursor: 'pointer'
                  }
                }}
              >
                Cập nhật
              </Typography> */}
            </Stack>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h6">Mật khẩu:</Typography>
            <Stack direction={'row'} spacing={1}>
              <TextField
                sx={{
                  width: '70%',
                  marginLeft: '1rem !important',
                  backgroundColor: 'white',
                  borderRadius: '5px',
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
                  borderColor: 'black'
                }}
                id="full-name"
                type="password"
                value={'******'}
                disabled={true}
              />
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    color: '#DC567A',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate(routerChangePassword.path)}
              >
                Cập nhật
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'column'} spacing={2}>
            <Typography variant="h6">Liên kết mạng xã hội:</Typography>
            <Stack direction={'row'} alignItems={'center'}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <img
                  src={iconFB}
                  alt="FaceBook"
                  className="icon_hover"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid black'
                  }}
                />
                <Typography variant="h6">Facebook</Typography>
              </Stack>
              <Typography
                sx={{
                  marginLeft: 'auto',
                  marginRight: '5rem'
                }}
                variant="h6"
              >
                Liên kết
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <img
                  src={iconGoogle}
                  alt="Google"
                  className="icon_hover"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid black'
                  }}
                />
                <Typography variant="h6">Google</Typography>
              </Stack>
              <Typography
                sx={{
                  marginLeft: 'auto',
                  marginRight: '5rem'
                }}
                variant="h6"
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
