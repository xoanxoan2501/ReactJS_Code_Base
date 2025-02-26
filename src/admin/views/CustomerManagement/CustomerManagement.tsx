import CustomerManagementLayout from '@/admin/views/CustomerManagement/layout'
import { Button, Stack, TextField, Typography } from '@mui/material'
import iconPrint from '@/assets/icons/ProductManagement/iconPrint.png'
import iconPDF from '@/assets/icons/ProductManagement/iconPDF.png'
import iconExcel from '@/assets/icons/ProductManagement/iconExcel.png'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useMemo, useState } from 'react'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import { headerConfigs } from '@/admin/views/CustomerManagement/headerConfigs'
import { useFetchUsers } from '@/shared/hook/useFetchUsers'
import { GridPaginationModel } from '@mui/x-data-grid'
import { DEFAULT_LIMIT_PER_PAGE } from '@/utils/constants'

const CustomerManagement = () => {
  const [selection, setSelection] = useState('all')
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: DEFAULT_LIMIT_PER_PAGE,
    page: 1
  })

  const { data, isLoading, isError } = useFetchUsers({ page: paginationModel.page, limit: paginationModel.pageSize })

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value)
  }

  const rows = useMemo(() => {
    return data?.users?.map((item) => ({
      ...item,
      id: item._id
    }))
  }, [data?.users])

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        Loading...
      </div>
    )

  if (isError) return <div>Error...</div>

  return (
    <CustomerManagementLayout>
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
        <DataGridTable
          columns={headerConfigs}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          rows={rows || []}
          onRowSelectionModelChange={(selectedIds) => console.log(selectedIds)}
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5'
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#d3d6d8 !important',
              borderBottom: '1px   solid #ccc'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold'
            },
            '& .MuiDataGrid-cell': {
              borderRight: '1px solid #ccc'
            }
          }}
        />
      </Stack>
    </CustomerManagementLayout>
  )
}

export default CustomerManagement
