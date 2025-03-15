import ProductManagementLayout from '@/views/admin/ProductManagement/layout'
import { Stack } from '@mui/material'
import ProductTable from './ProductTable'
import ProductActions from './ProductActions'
import ProductFilter from './ProductFilter'

const ProductManagement = () => {
  return (
    <ProductManagementLayout>
      <Stack direction={'column'} spacing={2}>
        <ProductActions />
        <ProductFilter />
        <ProductTable />
      </Stack>
    </ProductManagementLayout>
  )
}

export default ProductManagement
