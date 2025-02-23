import { useState } from 'react'
import { Button, Container } from '@mui/material'
import CartProductDetail from '../../component/CartProductDetail/CartProductDetail'
import './ProductDetails.css'
import CardProduct from '../Product/cardProduct'
import { useProduct, useProducts } from '@/shared/hook/useProducts'
import { useParams } from 'react-router-dom'

function ProductDetails() {
  const [activeTab, setActiveTab] = useState('description')
  const { data, isLoading, isError } = useProducts({ limit: 4 })

  const { id } = useParams()
  const { data: product, isLoading: isLoadingProduct, error } = useProduct(id!)

  const products = data?.data || []

  if (isLoading || isLoadingProduct) return <p>Loading ...</p>
  if (isError || error) return <p>Error ...</p>

  return (
    <Container maxWidth="lg" disableGutters key={id}>
      <CartProductDetail product={product} style={{ height: '500px' }} />
      <div className="tabs-container">
        <div className="tabs">
          <Button
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Mô tả chung
          </Button>
          <Button
            className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            Bình luận
          </Button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && <div>{product?.description}</div>}
        {activeTab === 'comments' && (
          <div>
            <h3>Bình luận</h3>
            <p>Hiện chưa có bình luận nào.</p>
          </div>
        )}
      </div>
      <div className="line_home"> </div>
      <h1 style={{ textAlign: 'center' }}>Các sản phẩm bạn có thể thích</h1>
      <div>
        <h3 style={{ textAlign: 'center' }}> Sản phẩm cùng loại</h3>
        <div className="product-grid">
          {products
            ?.slice(0, 4)
            .map((product: any) => (
              <CardProduct key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Container>
  )
}

export default ProductDetails
