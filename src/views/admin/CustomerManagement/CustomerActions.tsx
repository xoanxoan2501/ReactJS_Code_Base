import { Stack, Button } from '@mui/material'
import { routerAddCustomer } from './router'
import iconImport from '@/assets/icons/ProductManagement/iconImport.png'
import iconPrint from '@/assets/icons/ProductManagement/iconPrint.png'
import iconPDF from '@/assets/icons/ProductManagement/iconPDF.png'
import iconExcel from '@/assets/icons/ProductManagement/iconExcel.png'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import { useNavigate } from 'react-router-dom'

const CustomerActions = () => {
  const navigate = useNavigate()

  return (
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
          backgroundColor: '#7CCCF8',
          borderRadius: '15px',
          '&:hover': {
            color: 'inherit'
          }
        }}
        variant='contained'
        type='button'
      >
        <img style={{ marginRight: '8px' }} src={iconPrint} alt='logo' className='icon_hover' />
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
        variant='contained'
        type='button'
      >
        <img style={{ marginRight: '8px' }} src={iconPDF} alt='logo' className='icon_hover' />
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
        variant='contained'
        type='button'
      >
        <img style={{ marginRight: '8px' }} src={iconExcel} alt='logo' className='icon_hover' />
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
        variant='contained'
        type='button'
      >
        <img style={{ marginRight: '8px' }} src={iconDelete} alt='logo' className='icon_hover' />
        Xóa
      </Button>
    </Stack>
  )
}

export default CustomerActions
