import { IProduct } from '@/apis/product'
import { useProducts } from '@/shared/hook/useProducts'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { headerConfigs } from './headerConfigs'
import { DEFAULT_LIMIT_PER_PAGE, ORDER_SIZES } from '@/utils/constants'
import { useCallback, useMemo, useState } from 'react'
import ModalCustom from './ModalCustom'
import { formatNumber } from '@/utils/formatter'

const ProductTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_LIMIT_PER_PAGE,
    page: 0
  })

  const { data, isLoading } = useProducts({
    page: paginationModel.page + 1, // Chuyển thành one-based index
    limit: paginationModel.pageSize,
    isKeepPreviousData: true
  })
  const choosePriceProduct = (product: IProduct) => {
    product?.sizes?.sort((a, b) => ORDER_SIZES.indexOf(a.size) - ORDER_SIZES.indexOf(b.size))

    return product?.sizes?.[0]?.price
  }

  const rows = useMemo(
    () =>
      data?.data?.map((item: IProduct) => ({
        id: item._id,
        productName: item.title,
        quantity: item?.sizes?.reduce((total, size) => total + size.stock, 0),
        image: item.thumbnail,
        price: `${formatNumber(choosePriceProduct(item) || 0)}₫`,
        category: item?.category?.[0]?.name || 'Unknown',
        status: item.status
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
        rowCount={data?.total || rows.length} // Tổng số hàng thực tế
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

export default ProductTable

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

const vietnameseLocaleText = {
  noRowsLabel: 'Không có dữ liệu',
  noResultsOverlayLabel: 'Không tìm thấy kết quả',
  toolbarDensity: 'Mật độ',
  toolbarDensityLabel: 'Mật độ hiển thị',
  toolbarDensityCompact: 'Dày đặc',
  toolbarDensityStandard: 'Tiêu chuẩn',
  toolbarDensityComfortable: 'Thoải mái',
  toolbarColumns: 'Cột',
  toolbarColumnsLabel: 'Chọn cột',
  toolbarFilters: 'Bộ lọc',
  toolbarFiltersLabel: 'Hiển thị bộ lọc',
  toolbarFiltersTooltipHide: 'Ẩn bộ lọc',
  toolbarFiltersTooltipShow: 'Hiển thị bộ lọc',
  toolbarFiltersTooltipActive: (count: number) => `${count} bộ lọc đang hoạt động`,
  toolbarQuickFilterPlaceholder: 'Tìm kiếm...',
  toolbarQuickFilterLabel: 'Tìm kiếm',
  toolbarQuickFilterDeleteIconLabel: 'Xóa',
  toolbarExport: 'Xuất',
  toolbarExportLabel: 'Xuất dữ liệu',
  toolbarExportCSV: 'Xuất ra CSV',
  toolbarExportPrint: 'In',
  toolbarExportExcel: 'Xuất ra Excel',
  columnsManagementSearchTitle: 'Tìm kiếm cột',
  columnsManagementNoColumns: 'Không có cột nào',
  columnsManagementShowHideAllText: 'Hiển thị/Ẩn tất cả',
  columnsManagementReset: 'Đặt lại',
  columnsManagementDeleteIconLabel: 'Xóa',
  filterPanelAddFilter: 'Thêm bộ lọc',
  filterPanelRemoveAll: 'Xóa tất cả',
  filterPanelDeleteIconLabel: 'Xóa',
  filterPanelLogicOperator: 'Toán tử logic',
  filterPanelOperator: 'Toán tử',
  filterPanelOperatorAnd: 'Và',
  filterPanelOperatorOr: 'Hoặc',
  filterPanelColumns: 'Cột',
  filterPanelInputLabel: 'Giá trị',
  filterPanelInputPlaceholder: 'Nhập giá trị...',
  filterOperatorContains: 'Chứa',
  filterOperatorDoesNotContain: 'Không chứa',
  filterOperatorEquals: 'Bằng',
  filterOperatorDoesNotEqual: 'Không bằng',
  filterOperatorStartsWith: 'Bắt đầu bằng',
  filterOperatorEndsWith: 'Kết thúc bằng',
  filterOperatorIs: 'Là',
  filterOperatorNot: 'Không là',
  filterOperatorAfter: 'Sau',
  filterOperatorOnOrAfter: 'Bằng hoặc sau',
  filterOperatorBefore: 'Trước',
  filterOperatorOnOrBefore: 'Bằng hoặc trước',
  filterOperatorIsEmpty: 'Trống',
  filterOperatorIsNotEmpty: 'Không trống',
  filterOperatorIsAnyOf: 'Là bất kỳ',
  'filterOperator=': 'Bằng',
  'filterOperator!=': 'Không bằng',
  'filterOperator>': 'Lớn hơn',
  'filterOperator>=': 'Lớn hơn hoặc bằng',
  'filterOperator<': 'Nhỏ hơn',
  'filterOperator<=': 'Nhỏ hơn hoặc bằng',
  headerFilterOperatorContains: 'Chứa',
  headerFilterOperatorDoesNotContain: 'Không chứa',
  headerFilterOperatorEquals: 'Bằng',
  headerFilterOperatorDoesNotEqual: 'Không bằng',
  headerFilterOperatorStartsWith: 'Bắt đầu bằng',
  headerFilterOperatorEndsWith: 'Kết thúc bằng',
  headerFilterOperatorIs: 'Là',
  headerFilterOperatorNot: 'Không là',
  headerFilterOperatorAfter: 'Sau',
  headerFilterOperatorOnOrAfter: 'Bằng hoặc sau',
  headerFilterOperatorBefore: 'Trước',
  headerFilterOperatorOnOrBefore: 'Bằng hoặc trước',
  headerFilterOperatorIsEmpty: 'Trống',
  headerFilterOperatorIsNotEmpty: 'Không trống',
  headerFilterOperatorIsAnyOf: 'Là bất kỳ',
  'headerFilterOperator=': 'Bằng',
  'headerFilterOperator!=': 'Không bằng',
  'headerFilterOperator>': 'Lớn hơn',
  'headerFilterOperator>=': 'Lớn hơn hoặc bằng',
  'headerFilterOperator<': 'Nhỏ hơn',
  'headerFilterOperator<=': 'Nhỏ hơn hoặc bằng',
  filterValueAny: 'Bất kỳ',
  filterValueTrue: 'Đúng',
  filterValueFalse: 'Sai',
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Hiển thị cột',
  columnMenuManageColumns: 'Quản lý cột',
  columnMenuFilter: 'Bộ lọc',
  columnMenuHideColumn: 'Ẩn cột',
  columnMenuUnsort: 'Hủy sắp xếp',
  columnMenuSortAsc: 'Sắp xếp tăng dần',
  columnMenuSortDesc: 'Sắp xếp giảm dần',
  columnHeaderFiltersTooltipActive: (count: number) => `${count} bộ lọc đang hoạt động`,
  columnHeaderFiltersLabel: 'Hiển thị bộ lọc',
  columnHeaderSortIconLabel: 'Sắp xếp',
  footerRowSelected: (count: number) => `${count} hàng được chọn`,
  footerTotalRows: 'Tổng số hàng:',
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) => `${visibleCount} trong tổng ${totalCount}`,
  checkboxSelectionHeaderName: 'Chọn',
  checkboxSelectionSelectAllRows: 'Chọn tất cả hàng',
  checkboxSelectionUnselectAllRows: 'Bỏ chọn tất cả hàng',
  checkboxSelectionSelectRow: 'Chọn hàng',
  checkboxSelectionUnselectRow: 'Bỏ chọn hàng',
  booleanCellTrueLabel: 'Đúng',
  booleanCellFalseLabel: 'Sai',
  actionsCellMore: 'Thêm',
  pinToLeft: 'Ghim sang trái',
  pinToRight: 'Ghim sang phải',
  unpin: 'Bỏ ghim',
  treeDataGroupingHeaderName: 'Nhóm',
  treeDataExpand: 'Mở rộng',
  treeDataCollapse: 'Thu gọn',
  groupingColumnHeaderName: 'Nhóm',
  groupColumn: (name: string) => `Nhóm theo ${name}`,
  unGroupColumn: (name: string) => `Bỏ nhóm ${name}`,
  detailPanelToggle: 'Chi tiết',
  expandDetailPanel: 'Mở rộng',
  collapseDetailPanel: 'Thu gọn',
  rowReorderingHeaderName: 'Sắp xếp lại hàng',
  aggregationMenuItemHeader: 'Tính toán',
  aggregationFunctionLabelSum: 'Tổng',
  aggregationFunctionLabelAvg: 'Trung bình',
  aggregationFunctionLabelMin: 'Nhỏ nhất',
  aggregationFunctionLabelMax: 'Lớn nhất',
  aggregationFunctionLabelSize: 'Kích thước',
  MuiTablePagination: {
    labelRowsPerPage: 'Số hàng mỗi trang:',
    labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
      `${from}–${to} trong tổng ${count !== -1 ? count : `nhiều hơn ${to}`}`
  }
}
