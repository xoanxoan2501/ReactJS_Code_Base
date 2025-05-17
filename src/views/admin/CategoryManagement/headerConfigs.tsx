import { openModal } from '@/apis/product-management-redux'
import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import iconDelete from '@/assets/icons/ProductManagement/iconDelete.png'
import iconEdit from '@/assets/icons/ProductManagement/iconEdit.png'
interface ActionIcon {
  icon: string
  title: string
  backgroundColor: string
  handle?: () => void
}

const ActionIcon = ({ icon, title, backgroundColor, handle }: ActionIcon) => {
  return (
    <img
      src={icon}
      alt={title}
      style={{
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        borderRadius: '40px',
        backgroundColor: backgroundColor,
        padding: '3px'
      }}
      onClick={(event) => {
        event.stopPropagation()
        if (handle) {
          handle()
        }
      }}
    />
  )
}
export const RenderAction = (params: GridRenderCellParams) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Stack sx={{ height: '100%' }} direction='row' spacing={2} alignItems='center'>
      <ActionIcon
        key={`${params.row.id}-delete`}
        icon={iconDelete}
        title={'Xoá sản phẩm'}
        backgroundColor={'#FF070780'}
        handle={() => {
          dispatch(openModal({ id: params.row.id, name: params.row.productName }))
        }}
      />
      <ActionIcon key={`${params.row.id}-edit`} icon={iconEdit} title={'Chỉnh sửa sản phẩm'} backgroundColor={'#F9ED6980'} />
    </Stack>
  )
}
const renderCategoryType = (params: GridRenderCellParams) => {
  return (
    <Typography
      sx={{
        backgroundColor: params.value === 'available' ? '#1AFB9A' : '#1AFB9A',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        display: 'inline-block'
      }}
    ></Typography>
  )
}

export const headerConfigs: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Tên danh mục',
    flex: 1,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'discount',
    headerName: 'Số lượng sản phẩm',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    resizable: false
  },
  {
    field: 'action',
    headerName: 'Hành động',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: RenderAction
  }
]
