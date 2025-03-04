import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import { useState, useEffect } from 'react'
import 'swiper/swiper-bundle.css'
import './CartProductDetail.css'
import { Button, TextField } from '@mui/material'

import { IProduct } from '@/apis/product'
import { addCartApi } from '@/apis/cart/api'
import { toast } from 'react-toastify'

function CartProductDetail({
  product,
  style
}: {
  product: IProduct | undefined
  style?: React.CSSProperties | undefined
}) {
  console.log('Product data:', product)
  const [quantity, setQuantity] = useState<number>(1)
  useEffect(() => {
    console.log('Số lượng đã thay đổi: ', quantity)
  }, [quantity])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<{
    size: string
    price: number
    stock: number
  } | null>(null)
  const hanlderAddCart = () => {
    addCartApi({
      productId: product?._id || '',
      quantity: quantity,
      size: selectedSize?.size || '',
      title: product?.title || '',
      thumbnail: product?.thumbnail || '',
      price: selectedSize?.price || 0
    })
      .then(() => {
        toast.success('Thêm vào giỏ hàng thành công')
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại!')
      })
  }

  // Chọn size đầu tiên nếu có dữ liệu
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize({
        size: product.sizes[0].size,
        price: product.sizes[0].price,
        stock: product.sizes[0].stock
      })
    }
  }, [product])

  // if (isLoading) return <div>Đang tải...</div>
  if (!product) return <div>Không tìm thấy sản phẩm</div>

  const mainImage = product.images?.length ? product.images[0] : product.thumbnail || './img/banh_mau_hong.jpg'
  const images = product.images?.length ? product.images : [mainImage]

  return (
    <div className='cart-product-detail' style={style}>
      {/* Slider chính */}
      <div className='slider'>
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className='main-slider'
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Product Image ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider nhỏ */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          className='thumbs-slider'
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Product Image ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thông tin sản phẩm */}
      <div className='information' style={style}>
        <h1>{product.title}</h1>
        <h2>Mã sản phẩm: {product.code}</h2>
        <div className='line'></div>

        <div className='price'>
          <span style={{ fontSize: '30px' }}>Giá:</span>{' '}
          <span className='price-value'>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(selectedSize?.price || 0)}
          </span>
        </div>

        {product.sizes && product.sizes.length > 0 && (
          <div className='size-selection'>
            <h3>Kích thước:</h3>
            <div className='sizes'>
              {product.sizes.map((item) => (
                <button
                  key={item.size}
                  className={item.size === selectedSize?.size ? 'size-btn active' : 'size-btn'}
                  onClick={() =>
                    setSelectedSize({
                      size: item.size,
                      price: item.price,
                      stock: item.stock
                    })
                  }
                >
                  {item.size}
                </button>
              ))}
            </div>
            <div className='number_customer'>
              <h5> Số lượng : </h5>
              <TextField
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                inputProps={{ min: '1' }}
              ></TextField>
            </div>
            <div>
              <h5> Số lượng tồn kho : {selectedSize?.stock}</h5>
            </div>
          </div>
        )}

        <div className='buttons'>
          <Button className='add-to-cart' onClick={hanlderAddCart}>
            Thêm vào giỏ hàng
          </Button>
          <Button className='buy-now'>Mua ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default CartProductDetail
