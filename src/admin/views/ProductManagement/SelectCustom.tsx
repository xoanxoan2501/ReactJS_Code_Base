import { Grid, MenuItem, Select } from '@mui/material'

interface SelectCustomProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  size?: Size
}

interface Size {
  xs: number
  sm: number
}

const SelectCustom = ({ value, onChange, size = { xs: 6, sm: 3 } }: SelectCustomProps) => {
  console.log(value)
  return (
    <Grid item xs={size.xs} sm={size.sm}>
      <Select
        fullWidth
        sx={{
          backgroundColor: 'white',
          borderRadius: '20px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none' // Loại bỏ viền mặc định
            },
            '&:hover fieldset': {
              border: 'none' // Loại bỏ viền khi hover
            },
            '&.Mui-focused fieldset': {
              border: 'none' // Loại bỏ viền khi focus
            }
          },
          '& .MuiSelect-select': {
            outline: 'none' // Loại bỏ outline của select
          },
          '& .MuiOutlinedInput-notchedOutline': {
            display: 'none' // Ẩn hoàn toàn phần tử fieldset
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: '4px', // Khoảng cách giữa `Select` và `Menu`
              borderRadius: '15px', // Bo góc cho popup khi xổ xuống
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Thêm shadow nếu muốn
              '& .MuiMenuItem-root': {
                borderRadius: '10px', // Bo góc cho từng `MenuItem`
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f5f5f5', // Thay đổi màu nền khi hover
                  borderRadius: '10px' // Bo góc khi hover
                }
              }
            }
          }
        }}
      >
        <MenuItem value=''>Chọn danh mục</MenuItem>
        <MenuItem value='1'>Danh mục 1</MenuItem>
        <MenuItem value='2'>Danh mục 2</MenuItem>
      </Select>
    </Grid>
  )
}
export default SelectCustom
