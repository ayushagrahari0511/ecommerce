import { useRef } from 'react'
import { sliderItems } from '../data'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import styles from '../styles/Slider.module.css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper'
import ArrowLeftOutlined from '@mui/icons-material/ArrowLeftOutlined'
import ArrowRightOutlined from '@mui/icons-material/ArrowRightOutlined'
import Image from 'next/image'

const Slider = () => {
    const swiperRef = useRef(null);
    return (
        <div className={styles.container}>
            <Swiper
                ref={swiperRef}
                slidesPerView={1}
                modules={[Navigation]}
                className={styles.swiper}
            >
                {sliderItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div 
                        style={{ background: `#${item.bg}`}}
                        className={styles.featureWraper}
                        >
                        <div className={styles.featureImg}>
                            <img className={styles.Image} src={item.img}/>
                        </div>
                        <div className={styles.infoContainer}>
                            <h1 className={styles.title}>{item.title}</h1>
                            <p className={styles.desc}>{item.desc}</p>
                            <button className={styles.button}>SHOW NOW</button>
                        </div>
                        <div className={styles.navigation}>
                        <div id="previousButton" onClick={() => swiperRef.current.swiper.slidePrev()}>
                            <ArrowLeftOutlined className={styles.navigate}/>
                            {/* Left */}
                            </div>
                        <div id="nextButton"  onClick={() => swiperRef.current.swiper.slideNext()}>
                            <ArrowRightOutlined className={styles.navigate}/>
                            {/* Right */}
                            </div>
                        </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider
