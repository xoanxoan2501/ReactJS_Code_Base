import { useState } from 'react'
import { Button, Container } from '@mui/material'
import CartProductDetail from '../../component/CartProductDetail/CartProductDetail'
import './ProductDetails.css'
import CardProduct from '../Product/cardProduct'
import { useProducts } from '@/shared/hook/useProducts'

function ProductDetails() {
  const [activeTab, setActiveTab] = useState('description')
  const { data, isLoading, isError } = useProducts({ limit: 4 })

  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error ...</p>

  const products = data?.data || []

  return (
    <Container maxWidth="lg" disableGutters>
      <CartProductDetail />
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
        {activeTab === 'description' && (
          <div>
            <h3>Thành phần chính:</h3>
            <ul>
              <li>Gato</li>
              <li>Kem tươi vị rượu rum</li>
              <li>Hoa quả</li>
              <li>Dừa khô</li>
            </ul>
            <p>
              Bánh làm từ 3 lớp gato trắng xen giữa 3 lớp kem tươi vị rượu rum
              (nho). Trên mặt bánh được trang trí bằng hoa quả với dừa khô kết
              xung quanh.
            </p>
          </div>
        )}
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
