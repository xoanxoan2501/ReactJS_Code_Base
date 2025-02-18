import ProductManagementLayout from '@/admin/views/ProductManagement.tsx/layout'
import { Button, Stack, TextField, Typography } from '@mui/material'
import iconImport from '@/assets/icons/ProductManagement/iconImport.png'
import iconPrint from '@/assets/icons/ProductManagement/iconPrint.png'
import iconPDF from '@/assets/icons/ProductManagement/iconPDF.png'
import iconExcel from '@/assets/icons/ProductManagement/iconExcel.png'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import { useProducts } from '@/shared/hook/useProducts'

const ProductManagement = () => {
  const [selection, setSelection] = useState('all')

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value)
  }

  const { data } = useProducts({})

  console.log(data)

  return (
    <ProductManagementLayout>
      <Stack direction={'column'} spacing={2}>
        <Stack
          direction={'row'}
          spacing={1.5}
          sx={{
            padding: '10px 0',
            borderBottom: '2px solid #086191'
          }}
        >
          <Button
            sx={{
              backgroundColor: '#1AFB9A',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant="contained"
            type="button"
          >
            + Tạo mới sản phẩm
          </Button>
          <Button
            sx={{
              backgroundColor: '#F9ED69',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant="contained"
            type="button"
          >
            <img
              style={{ marginRight: '8px' }}
              src={iconImport}
              alt="logo"
              className="icon_hover"
            />
            Tải từ file
          </Button>
          <Button
            sx={{
              backgroundColor: '#7CCCF8',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant="contained"
            type="button"
          >
            <img
              style={{ marginRight: '8px' }}
              src={iconPrint}
              alt="logo"
              className="icon_hover"
            />
            In dữ liệu
          </Button>
          <Button
            sx={{
              backgroundColor: '#FF6F91',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant="contained"
            type="button"
          >
            <img
              style={{ marginRight: '8px' }}
              src={iconPDF}
              alt="logo"
              className="icon_hover"
            />
            Xuất file PDF
          </Button>
          <Button
            sx={{
              backgroundColor: '#0EDA81',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant="contained"
            type="button"
          >
            <img
              style={{ marginRight: '8px' }}
              src={iconExcel}
              alt="logo"
              className="icon_hover"
            />
            Xuất file Excel
          </Button>
          <Button
            sx={{
              backgroundColor: '#FF070780',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant="contained"
            type="button"
          >
            <img
              style={{ marginRight: '8px' }}
              src={iconDelete}
              alt="logo"
              className="icon_hover"
            />
            Xóa
          </Button>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          sx={{
            borderBottom: '2px solid #086191',
            padding: '0px 20px 12px 20px'
          }}
        >
          <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
            <Typography variant="subtitle1">Danh mục</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
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
            placeholder="Tìm kiếm sản phẩm"
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
            id="full-name"
            type="search"
          />
        </Stack>
        <Stack></Stack>
      </Stack>
    </ProductManagementLayout>
  )
}

export default ProductManagement
