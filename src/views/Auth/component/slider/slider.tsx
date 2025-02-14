import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import './slider.css' // Import file CSS

function MySlider() {
  return (
    <Swiper
      className="my-slider"
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <img src="./img/baner.png" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./img/baner1.png" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./img/baner2.png" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  )
}

export default MySlider
