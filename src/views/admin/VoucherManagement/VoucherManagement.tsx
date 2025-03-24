import VoucherManagementLayout from "./layout"
import { Stack } from "@mui/material"
import VoucherTable from "./VoucherTable"
import VoucherActions from "./VoucherActions"
import VoucherFilter from "./VoucherFilter"
import ProductActions from "../ProductManagement/ProductActions"

const VoucherManagement = () => {
  return (
    <VoucherManagementLayout>
      <Stack direction={'column'} spacing={2}>
        <VoucherActions/>
        <VoucherFilter/>
        <VoucherTable/>
      </Stack>
    </VoucherManagementLayout>
  )
}

export default VoucherManagement
