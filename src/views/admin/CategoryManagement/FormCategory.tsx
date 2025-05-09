import { Button, TextField } from '@mui/material'
import CategoryManagementLayout from './layout'
import { Delete, Edit } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

type FormMode = 'create' | 'edit' | 'view'

interface FormCategoryProps {
  mode: FormMode
}

interface Category {
  code: string
  name: string
  description: string
  categoryName: string
}

function FormCategory({ mode }: FormCategoryProps) {
  const { id } = useParams<{ id: string }>()
  const isView = mode === 'view'
  const isEdit = mode === 'edit'
  const [categoryData, setCategoryData] = useState<Category | null>(null)

  return (
    <CategoryManagementLayout>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '30%' }}>
          <TextField
            label='Mã danh mục'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
            disabled={isView}
            value={categoryData?.code || ''}
          />
          <TextField
            label='Tên danh mục'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
            disabled={isView}
            value={categoryData?.name || ''}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <TextField
            label='Mô tả danh mục'
            variant='outlined'
            multiline
            rows={5}
            sx={{ backgroundColor: 'white' }}
            disabled={isView}
            value={categoryData?.description || ''}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ margin: 10 }}>Danh sách sản phẩm có trong danh mục:</h3>
          <h3 style={{ margin: 0, color: 'red' }}>{categoryData?.categoryName || ''}</h3>
        </div>
        {!isView && (
          <Button
            sx={{
              width: '150px',
              backgroundColor: '#0EDA81',
              color: 'white',
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: '#087F58',
                color: '#fff'
              }
            }}
          >
            THÊM LIÊN KẾT VÀO DANH MỤC
          </Button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {!isView && (
          <>
            {isEdit && (
              <Button
                sx={{
                  backgroundColor: 'rgba(249, 237, 105, 0.5)',
                  borderRadius: '15px',
                  color: 'black',
                  width: '150px',
                  marginTop: '20px',
                  gap: '8px'
                }}
                startIcon={<Edit sx={{ color: '#F29D38' }} />}
              >
                CHỈNH SỬA
              </Button>
            )}
            <Button
              sx={{
                backgroundColor: 'rgba(255, 7, 7, 0.5)',
                borderRadius: '15px',
                color: 'black',
                width: '150px',
                marginTop: '20px',
                gap: '8px'
              }}
              startIcon={<Delete sx={{ color: '#FF0707' }} />}
            >
              XOÁ
            </Button>
          </>
        )}
      </div>
    </CategoryManagementLayout>
  )
}

export default FormCategory
