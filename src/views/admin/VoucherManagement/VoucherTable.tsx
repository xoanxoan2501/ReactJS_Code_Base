import { IProduct } from '@/apis/product'
import { IVoucher } from '@/apis/voucher'
import { useProducts } from '@/shared/hook/useProducts'
import { useVouchers } from '@/shared/hook/useVouchers'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { headerConfigs } from './headerConfigs'
import { DEFAULT_LIMIT_PER_PAGE, ORDER_SIZES, vietnameseLocaleText } from '@/utils/constants'
import { useCallback, useMemo, useState } from 'react'
import ModalCustom from './ModalCustom'
import { formatNumber } from '@/utils/formatter'

const VoucherTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_LIMIT_PER_PAGE,
    page: 0
  })

  const { data, isLoading } = useVouchers({
    page: paginationModel.page + 1, // Chuyển thành one-based index
    limit: paginationModel.pageSize,
    isKeepPreviousData: true
  })

  const rows = useMemo(
    () =>
      data?.map((item: IVoucher) => ({
        id: item._id,
        code: item.code,
        discountType: item.discountType,
        discountValue: item.discountValue,
        expirationDate: item.expirationDate,
        usageCount: item.usageCount,
        minOrderValue: item.minOrderValue,
        isActive: item.isActive
      })) || [],
    [data]
  )

  const handleOnRowSelectionModelChange = useCallback(
    (selectedIds: GridRowSelectionModel) => {
      if (selectedIds.length === rows.length) {
        // console.log('Tất cả hàng đã được chọn:', selectedIds)
      } else {
        // console.log('Các hàng được chọn:', selectedIds)
      }
    },
    [rows.length]
  )

  if (isLoading) return <div></div>

  return (
    <>
      <DataGrid
        rows={rows}
        columns={headerConfigs}
        rowCount={data?.length || 0} // Tổng số hàng thực tế
        paginationModel={paginationModel}
        pageSizeOptions={[5, 10, 20]}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        onRowSelectionModelChange={(selectedIds) => handleOnRowSelectionModelChange(selectedIds)}
        checkboxSelection
        disableAutosize
        disableColumnResize
        paginationMode='server'
        localeText={vietnameseLocaleText}
        getRowHeight={(params) => {
          if (params.model.image) {
            return 80
          }
          return 'auto'
        }}
        slotProps={{
          baseCheckbox: {
            icon: <BoxIcon />,
            checkedIcon: <CheckBoxIcon />
          }
        }}
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
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
          },
          '& .MuiDataGrid-footerContainer': {
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            margin: 0,
            alignSelf: 'center'
          },
          backgroundColor: 'white',
          minHeight: 550,
          maxHeight: 550,
          overflowY: 'auto'
        }}
      />
      <ModalCustom />
    </>
  )
}

export default VoucherTable

const BoxIcon = () => (
  <span
    style={{
      width: 24,
      height: 24,
      border: '1px solid #0d47a1',
      borderRadius: 4,
      display: 'flex'
    }}
  />
)

const CheckBoxIcon = () => (
  <span
    style={{
      width: 24,
      height: 24,
      border: '1px solid #0d47a1',
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <svg style={{ width: 16, height: 16, fill: '#0d47a1' }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
    </svg>
  </span>
)
