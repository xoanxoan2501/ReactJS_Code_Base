// import { blueGrey, cyan, grey, teal } from '@mui/material/colors'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light', // Đặt chế độ light mode
    primary: {
      main: '#1976d2' // Màu chính
    },
    secondary: {
      main: '#dc004e' // Màu phụ
    },
    background: {
      default: '#ffffff', // Màu nền mặc định
      paper: '#f5f5f5' // Màu nền cho các thành phần như Card, Paper
    },
    text: {
      primary: '#000000', // Màu chữ chính
      secondary: '#757575' // Màu chữ phụ
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#2c3e50'
          },
          fontFamily: 'Itim, sans-serif'
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          color: 'black',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
            // borderColor: '#dc567a',
            // color: '#dc567a'
          }
        }
      }
    },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: ({ theme }) => ({
    //       color: theme.palette.customText.primary,
    //       fontSize: '0.875rem'
    //     })
    //   }
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: () => ({
          // color: theme.palette.customText.primary,
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            // borderColor: theme.palette.customText.primary
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              // borderColor: theme.palette.customText.primary,
              borderWidth: '2px'
            }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              // borderColor: theme.palette.customText.primary
            }
          }
        })
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '0.875rem',
          '&.Mui-focused': {}
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#dc567a',
              color: '#dc567a'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#dc567a',
              color: '#dc567a'
            }
          },
          '& label.Mui-focused': {
            color: '#dc567a'
          },
          '&:hover label': {
            color: '#dc567a'
          }
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        disableScrollLock: true
      }
    }
  },
  typography: {
    fontFamily: 'Itim, sans-serif'
  }
})

export default theme
