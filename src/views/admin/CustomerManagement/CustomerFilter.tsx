import { Typography, Select, Stack, FormControl, MenuItem, TextField, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

const CustomerFilter = () => {
  const [selection, setSelection] = useState('all')
  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value)
  }
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        borderBottom: '2px solid #086191',
        padding: '0px 20px 12px 20px'
      }}
    >
      <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
        <Typography variant='subtitle1'>Danh mục</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={selection}
            sx={{
              backgroundColor: 'white'
            }}
            onChange={handleChange}
          >
            <MenuItem value={'all'}>Chọn tất cả</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <TextField
        placeholder='Tìm kiếm khách hàng'
        sx={{
          width: '20%',
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
        id='full-name'
        type='search'
      />
    </Stack>
  )
}

export default CustomerFilter
