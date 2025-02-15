import { Card, Typography, List, ListItem } from '@mui/material'
import './ListProduct.css'
import SortIcon from '@mui/icons-material/Sort'
import { useProducts } from '@/shared/hook/useProducts'
import CardProduct from '../Product/cardProduct'

const categories = ['Bánh sinh nhật', 'Bánh mặn', 'Bánh ngọt', 'Mini cakes']

function ListProduct() {
  const { data: products, isLoading, isError } = useProducts()

  if (isLoading) return <p>Đang tải...</p>
  if (isError) return <p>Lỗi khi tải dữ liệu</p>
  return (
    <div className="container_ctg">
      {/* Danh mục sản phẩm */}
      <Card className="category-card">
        <div className="category-header">
          <SortIcon className="icon_category" />
          <Typography variant="h6" className="category-title">
            Danh mục sản phẩm
          </Typography>
        </div>
        <List>
          {categories.map((category, index) => (
            <ListItem key={index} className="category-item">
              <span className="product-name">{category}</span>
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        {products?.map((product: any) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ListProduct
