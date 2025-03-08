import { Grid, TextField, TextFieldProps } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { Product } from './FormZod'

interface TextFieldCustomProps extends Omit<TextFieldProps, 'size'> {
  label?: string
  size?: Size
  control: Control<Product>
  name: keyof Product | `sizes.${number}.price` | `sizes.${number}.size` | `sizes.${number}.stock`
}

interface Size {
  xs: number
  sm: number
}

const TextFieldCustom: React.FC<TextFieldCustomProps> = ({
  label,
  size = { xs: 6, sm: 3 },
  control,
  name,
  sx,
  ...rest
}) => {
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
            onChange={(e) => field.onChange(e.target.value)} // Đảm bảo giá trị cập nhật đúng
            onBlur={field.onBlur}
            value={field.value || ''} // Tránh undefined gây lỗi label
            helperText={fieldState.error?.message || ''}
            InputLabelProps={{ shrink: !!field.value }} // Giữ label khi có giá trị
            sx={{
              backgroundColor: 'white',
              outlineColor: 'gray',
              '& .MuiInputLabel-root': {
                color: 'gray'
              },
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
              ...sx // Giữ sx tùy chỉnh
            }}
            {...rest}
          />
        )}
      />
    </Grid>
  )
}

export default TextFieldCustom
