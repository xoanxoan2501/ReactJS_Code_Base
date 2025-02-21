import { Grid, TextField, TextFieldProps } from '@mui/material'

interface TextFieldCustomProps extends Omit<TextFieldProps, 'size'> {
  label?: string
  size?: Size
}

interface Size {
  xs: number
  sm: number
}

const TextFieldCustom = ({ label, size = { xs: 6, sm: 3 }, ...rest }: TextFieldCustomProps) => {
  return (
    <Grid item xs={size.xs} sm={size.sm}>
      <TextField
        fullWidth
        label={label}
        {...rest}
        sx={{
          backgroundColor: 'white',
          outlineColor: 'gray',
          '& .MuiTextField-root': { color: 'gray' },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'gray'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none'
            },
            '&.Mui-focused fieldset': {
              border: 'none'
            }
          },
          borderRadius: '20px',
          ...rest.sx
        }}
      />
    </Grid>
  )
}
export default TextFieldCustom
