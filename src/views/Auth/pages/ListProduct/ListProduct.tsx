import { Container, Card, Typography, List, ListItem } from '@mui/material'
import './ListProduct.css'

const categories = ['Bánh sinh nhật', 'Bánh mặn', 'Bánh ngọt', 'Mini cakes ']

function ListProduct() {
  return (
    <Container maxWidth="xs">
      <Card className="category-card">
        <div className="category-header">
          <span className="icon-list"></span>
          <Typography variant="h6" className="category-title">
            Danh mục <br /> sản phẩm
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
    </Container>
  )
}

export default ListProduct
