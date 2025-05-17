import { Card, Typography, List, ListItem } from '@mui/material'
import './ListProduct.css'
import SortIcon from '@mui/icons-material/Sort'
import { useProducts } from '@/shared/hook/useProducts'
import CardProduct from '../Auth/pages/Product/cardProduct'
import { IProduct } from '@/apis/product'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import CustomDialogShowProduct from '@/shared/components/custom-dialog-show-product/CustomDialog'

const categories = ['Bánh sinh nhật', 'Bánh mặn', 'Bánh ngọt', 'Mini cakes']

function ListProduct() {
  const { data, isLoading, isError } = useProducts({})
  const { productDetail, isShowProductDetail } = useAppSelector((state) => state.prduct)

  if (isLoading) return <p>Đang tải...</p>
  if (isError) return <p>Lỗi khi tải dữ liệu</p>
  const products: IProduct[] = data?.data || []
  return (
    <div className='container_ctg'>
      {/* Danh mục sản phẩm */}
      <Card className='category-card'>
        <div className='category-header'>
          <SortIcon className='icon_category' />
          <Typography variant='h6' className='category-title'>
            Danh mục sản phẩm
          </Typography>
        </div>
        <List>
          {categories.map((category, index) => (
            <ListItem key={index} className='category-item'>
              <span className='product-name'>{category}</span>
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Danh sách sản phẩm */}
      <div className='product-list'>
        {products.map((product) => (
          <CardProduct key={product._id} product={product} /> // ✅ Đã sửa lỗi kiểu dữ liệu
        ))}
      </div>

      {productDetail && <CustomDialogShowProduct product={productDetail} open={isShowProductDetail} />}
    </div>
  )
}

export default ListProduct
