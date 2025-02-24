import { Grid, TextField, TextFieldProps } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { Product } from './FormZod'

interface TextFieldCustomProps extends Omit<TextFieldProps, 'size'> {
  label?: string
  size?: Size
  control: Control<Product>
  name: keyof Product | `sizes.${number}.price` | `sizes.${number}.size` | `sizes.${number}.stock` // ✅ Hỗ trợ cho mảng
}

interface Size {
  xs: number
  sm: number
}

const TextFieldCustom = ({ label, size = { xs: 6, sm: 3 }, control, name, ...rest }: TextFieldCustomProps) => {
  return (
    <Grid item xs={size.xs} sm={size.sm}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            error={!!fieldState.error}
            onBlur={field.onBlur}
            helperText={
              fieldState.error
                ? fieldState.error.message // ✅ Hiển thị lỗi cụ thể từ React Hook Form
                : ''
            }
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
        )}
      />
    </Grid>
  )
}
export default TextFieldCustom
