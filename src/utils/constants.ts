import CONFIG from '@/config'

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'customer'
}

export const ORDER_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT_PER_PAGE = 10

let apiRoot = ''
if (import.meta.env.DEV) {
  apiRoot = CONFIG.API_BASE_URL
}
if (import.meta.env.PROD) {
  apiRoot = CONFIG.API_SERVER_URL
}

export const API_ROOT = apiRoot

export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARE: 'prepare',
  SHIPPING: 'shipping',
  COMPLETED: 'completed',
  REFUND: 'refund',
  CANCEL: 'cancel'
}

export const vietnameseLocaleText = {
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
