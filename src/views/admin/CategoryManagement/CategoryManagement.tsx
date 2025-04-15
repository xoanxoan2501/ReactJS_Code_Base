import { useState, useMemo } from 'react'
import { Button, Stack, TextField, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import CategoryManagementLayout from '@/views/admin/CategoryManagement/layout'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import { DEFAULT_LIMIT_PER_PAGE } from '@/utils/constants'
import { useFetchCategories } from '@/shared/hook/useCategory'
import { headerConfigs } from '@/views/admin/CategoryManagement/headerConfigs'
import iconPrint from '@/assets/icons/ProductManagement/iconPrint.png'
import iconPDF from '@/assets/icons/ProductManagement/iconPDF.png'
import iconExcel from '@/assets/icons/ProductManagement/iconExcel.png'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { ICategory } from '@/apis/category'

const CategoryManagement = () => {
  const [selection, setSelection] = useState('all')
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: DEFAULT_LIMIT_PER_PAGE,
    page: 1
  })

  const { data, isLoading, isError } = useFetchCategories({
    page: paginationModel.page,
    limit: paginationModel.pageSize
  })

  console.log('data', data)

  const rows = useMemo(() => {
    return data?.data?.map((category: ICategory) => {
      return {
        ...category,
        id: category._id
      }
    })
  }, [data])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelection(event.target.value as string)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  return (
    <CategoryManagementLayout>
      <Stack direction='column' spacing={2}>
        {/* Button hành động */}
        <Stack direction='row' spacing={1.5} sx={{ padding: '10px 0', borderBottom: '2px solid #086191' }}>
          <Button
            sx={{
              backgroundColor: '#1AFB9A',
              borderRadius: '15px',
              '&:hover': {
                color: 'inherit'
              }
            }}
            variant='contained'
            type='button'
          >
            + Tạo mới danh mục
          </Button>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#7CCCF8', borderRadius: '15px' }}
            startIcon={<img src={iconPrint} alt='Print' />}
          >
            In dữ liệu
          </Button>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#FF6F91', borderRadius: '15px' }}
            startIcon={<img src={iconPDF} alt='PDF' />}
          >
            Xuất file PDF
          </Button>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#0EDA81', borderRadius: '15px' }}
            startIcon={<img src={iconExcel} alt='Excel' />}
          >
            Xuất file Excel
          </Button>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#FF070780', borderRadius: '15px' }}
            startIcon={<img src={iconDelete} alt='Delete' />}
          >
            Xóa
          </Button>
        </Stack>

        {/* Lọc dữ liệu và tìm kiếm */}
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ padding: '0px 20px 12px 20px', borderBottom: '2px solid #086191' }}
        >
          <FormControl size='small' sx={{ minWidth: 150 }}>
            <Select value={selection} sx={{ backgroundColor: 'white', borderRadius: '4px' }}>
              <MenuItem value='all'>Tất cả danh mục</MenuItem>
              <MenuItem value='active'>Danh mục đang hoạt động</MenuItem>
              <MenuItem value='inactive'>Danh mục không hoạt động</MenuItem>
            </Select>
          </FormControl>
          <TextField
            placeholder='Tìm kiếm danh mục'
            size='small'
            sx={{
              width: '30%',
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                borderRadius: '5px'
              }
            }}
          />
        </Stack>

        {/* Bảng dữ liệu */}
        <DataGridTable
          columns={headerConfigs}
          rows={rows || []}
          paginationModel={paginationModel}
          rowCount={data?.total}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5'
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#d3d6d8 !important',
              borderBottom: '1px solid #ccc'
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
    </CategoryManagementLayout>
  )
}

export default CategoryManagement
