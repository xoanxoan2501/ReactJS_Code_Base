// import { blueGrey, cyan, grey, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
      }
    },
    dark: {
      palette: {
      }
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
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          color: 'black'
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
    }
  }
})

export default theme
