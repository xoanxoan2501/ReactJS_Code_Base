import { useState } from 'react'
import { Button, Container } from '@mui/material'
import CartProductDetail from '../../component/CartProductDetail/CartProductDetail'
import './ProductDetails.css'

function ProductDetails() {
  const [activeTab, setActiveTab] = useState('description')

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
    </Container>
  )
}

export default ProductDetails
