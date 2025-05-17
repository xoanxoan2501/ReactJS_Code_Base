import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { headerConfigs } from './headerConfigs'
import { DEFAULT_LIMIT_PER_PAGE, ORDER_SIZES, vietnameseLocaleText } from '@/utils/constants'
import { useCallback, useMemo, useState } from 'react'
import ModalCustom from './ModalCustom'
import { formatNumber, formatDateTimeStamp } from '@/utils/formatter'
import { useFetchUsers } from '@/shared/hook/useFetchUsers'
import UserEntity from '@/modules/user/entity'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import { useOrders } from '@/shared/hook/useOrders'

const CustomerTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_LIMIT_PER_PAGE,
    page: 0
  })

  const { data, isLoading, isError } = useFetchUsers({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    isKeepPreviousData: true
  })

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders
  } = useOrders({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    isKeepPreviousData: true
  })

  const rows = useMemo(() => {
    const orderStats = new Map()
    if (dataOrders) {
      dataOrders?.data.forEach((order) => {
        const userId = order.userId
        if (!orderStats.has(userId)) {
          orderStats.set(userId, { count: 0, total: 0 })
        }
        const stats = orderStats.get(userId)
        stats.count += 1
        stats.total += order.total || 0
      })
    }
    const result =
      data?.users.map((item: UserEntity) => {
        const stats = orderStats.get(item._id) || { count: 0, total: 0 }
        return {
          ...item,
          id: item._id,
          ordersNumber: stats.count,
          ordersTotal: stats.total
        }
      }) || []
    return result
  }, [data, dataOrders])

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

  // const handleOnRowSelectionModelChange = useCallback(
  //   (selectedIds: GridRowSelectionModel) => {
  //     if (selectedIds.length === rows.length) {
  //       // console.log('Tất cả hàng đã được chọn:', selectedIds)
  //     } else {
  //       console.log('Các hàng được chọn:', selectedIds)
  //     }
  //   },
  //   [rows.length]
  // )

  if (isLoading) return <div></div>

  return (
    <>
      <DataGridTable
        columns={headerConfigs}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        rows={rows || []}
        rowCount={data?.total || 0} /* eslint-disable no-console */
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

export default CustomerTable
