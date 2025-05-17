import { Grid, MenuItem, Select, FormHelperText, FormControl } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { Customer } from './FormZod'

interface SelectCustomProps {
  name: `sizes.${number}.price` | `sizes.${number}.size` | keyof Customer // ✅ Hỗ trợ cho mảng
  control: Control<Customer>
  size?: Size
  options: Array<{ value: string; label: string }>
}

interface Size {
  xs: number
  sm: number
}

const SelectCustom = ({ name, control, options, size = { xs: 6, sm: 3 } }: SelectCustomProps) => {
  return (
    <Grid item xs={size.xs} sm={size.sm}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <Select
              {...field}
              fullWidth
              value={field.value || ''}
              displayEmpty
              sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' }
                },
                '& .MuiSelect-select': { outline: 'none' },
                '& .MuiOutlinedInput-notchedOutline': { display: 'none' }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: '4px',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '& .MuiMenuItem-root': {
                      borderRadius: '10px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { backgroundColor: '#f5f5f5', borderRadius: '10px' }
                    }
                  }
                }
              }}
            >
              <MenuItem value='' disabled>
                Danh mục sản phẩm
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Grid>
  )
}

export default SelectCustom
