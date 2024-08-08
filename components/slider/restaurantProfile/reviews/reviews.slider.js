import OverflowSliderWrapper from '@/components/wrapper/overflowSlider/overflowSlider.wrapper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewSliderItem from './component/reviewSliderItem.component';
//tr
import { useTranslation } from "next-i18next";


const ReviewsSlider = () => {
  // tr
  const { t } = useTranslation("common");
  return (
    <div className="mb-24">
      <h2 className="mb-12">{t("reviews")}</h2>
      <OverflowSliderWrapper>
        <Swiper slidesPerView="auto">
          <SwiperSlide>
            <ReviewSliderItem />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSliderItem />
          </SwiperSlide>

          <SwiperSlide>
            <ReviewSliderItem />
          </SwiperSlide>

          <SwiperSlide>
            <ReviewSliderItem />
          </SwiperSlide>
        </Swiper>
      </OverflowSliderWrapper>
    </div>
  );
};

export default ReviewsSlider;
