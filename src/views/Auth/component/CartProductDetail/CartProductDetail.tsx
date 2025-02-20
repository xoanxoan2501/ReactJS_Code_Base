import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import { useState } from 'react'
import 'swiper/swiper-bundle.css'

import './CartProductDetail.css'
import { Button } from '@mui/material'

const images = ['./img/banh1.png', '/img/banh2.png', '/img/banh3.jpg']
const sizes = [
  { size: '15 cm', price: 250000 },
  { size: '17 cm', price: 280000 },
  { size: '20 cm', price: 300000 },
  { size: '25 cm', price: 350000 },
]

function CartProductDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState(sizes[2])
  return (
    <div className="cart-product-detail">
      {/* Slider chính */}
      <div className="slider">
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="main-slider"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Cake ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider nhỏ */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          className="thumbs-slider"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Cake Thumb ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="information">
        <h1>FRUIT CAKE</h1>
        <h2>Mã sản phẩm: KT017</h2>
        <div className="line"></div>

        <div className="price">
          <span style={{ fontSize: '30px' }}>Giá:</span>{' '}
          <span className="price-value">
            {selectedSize.price.toLocaleString()} đ
          </span>
        </div>

        <div className="size-selection">
          <h3>Kích thước:</h3>
          <div className="sizes">
            {sizes.map((item) => (
              <button
                key={item.size}
                className={
                  item.size === selectedSize.size
                    ? 'size-btn active'
                    : 'size-btn'
                }
                onClick={() => setSelectedSize(item)}
              >
                {item.size}
              </button>
            ))}
          </div>
        </div>

        <div className="buttons">
          <Button className="add-to-cart">Thêm vào giỏ hàng</Button>
          <Button className="buy-now">Mua ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default CartProductDetail
