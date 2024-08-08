import BestSellingCard from "@/components/card/bestSelling/bestSelling.card";
import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { bestSellingData } from "./data/bestSelling.data";

const BestSellingSlider = () => {
  return (
    <div className="mb-24">
      <h2 className="m-12">Best Selleing Dishes</h2>
      <OverflowSliderWrapper className="best-selling-slider">
        <Swiper
          slidesPerView="auto"
          effect="fade"
        >
          {bestSellingData.map(({ id, name, itemDescription, image, redirect }) => (
            <SwiperSlide key={id}>
              <BestSellingCard
                name={name}
                itemDescription={itemDescription}
                image={image}
                redirect={redirect}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </OverflowSliderWrapper>
    </div>
  );
};
export default BestSellingSlider;
